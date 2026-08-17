/**
 * TEMPORARY test-content seeder for The Little Hood.
 *
 * Seeds a few Hero Slides (reusing existing local product images) and attaches
 * a short sample video to one product, so the new Sanity-driven features can be
 * tested end-to-end. Everything it creates is tracked in scripts/.seed-state.json
 * so it can be fully removed again.
 *
 *   Seed:   node scripts/seed-test-content.mjs
 *   Clean:  node scripts/seed-test-content.mjs --clean
 *   Logo:   node scripts/seed-test-content.mjs --logo   (uploads public/assets/logo.jpg
 *                                                        to siteSettings; kept by --clean)
 *
 * Requires SANITY_API_TOKEN in .env (same token used by migrate-to-sanity.mjs).
 * Optional: set SAMPLE_VIDEO to a local .mp4 path to skip the download, e.g.
 *   $env:SAMPLE_VIDEO="C:\\path\\to\\clip.mp4"; node scripts/seed-test-content.mjs
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync, writeFileSync, unlinkSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, basename } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PUBLIC_DIR = join(ROOT, 'public')
const STATE_FILE = join(__dirname, '.seed-state.json')

// ── Minimal .env loader (no extra dependency) ─────────────────────────────
function loadEnv() {
  const envPath = join(ROOT, '.env')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/)
    if (!m) continue
    if (process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}
loadEnv()

const token = process.env.SANITY_API_TOKEN
const projectId = process.env.SANITY_PROJECT_ID || '8a36ilal'
const dataset = process.env.SANITY_DATASET || 'production'

if (!token) {
  console.error('\n✗ Missing SANITY_API_TOKEN in .env (needs Editor permission).\n')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

// Hero slides use existing local product images (cropped to 16:9 by the site).
const HERO_SEEDS = [
  { id: 'test-hero-1', image: 'assets/products/hobbit-lamp/1.jpg', title: 'Light Up Your Space', subtitle: 'Handcrafted 3D Printed Lamps', ctaLabel: 'Shop Lamps', ctaLink: '#cat-lamps' },
  { id: 'test-hero-2', image: 'assets/products/wall-art-one-piece/1.webp', title: 'Art Meets Fandom', subtitle: 'Layered Wall Art & Home Decor', ctaLabel: 'Explore', ctaLink: '#new-arrivals' },
  { id: 'test-hero-3', image: 'assets/products/demon-slayer-rengoku/1.png', title: 'Crafted with Precision', subtitle: 'Anime Figures & Collectibles', ctaLabel: 'Shop Now', ctaLink: '#best-sellers' },
]

// Public sample clips, tried in order. A local override wins (SAMPLE_VIDEO).
const VIDEO_URLS = [
  process.env.SAMPLE_VIDEO_URL,
  'https://download.samplelib.com/mp4/sample-5s.mp4',
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
].filter(Boolean)

const VIDEO_FILENAME = 'little-hood-TEST-sample.mp4'

async function uploadLocalImage(rel) {
  const filePath = join(PUBLIC_DIR, rel)
  if (!existsSync(filePath)) {
    console.warn('   ⚠ missing image, skipped:', rel)
    return null
  }
  const asset = await client.assets.upload('image', readFileSync(filePath), { filename: basename(filePath) })
  return asset._id
}

async function obtainVideo() {
  // Local override first.
  if (process.env.SAMPLE_VIDEO && existsSync(process.env.SAMPLE_VIDEO)) {
    console.log('   … using local video:', process.env.SAMPLE_VIDEO)
    return readFileSync(process.env.SAMPLE_VIDEO)
  }
  for (const url of VIDEO_URLS) {
    try {
      console.log('   … downloading sample video:', url)
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      // Sanity-check: real MP4s have an 'ftyp' box near the start.
      if (buf.length > 10000 && buf.includes(Buffer.from('ftyp'))) return buf
      throw new Error('response was not a valid mp4')
    } catch (e) {
      console.warn(`   ⚠ failed (${e.message}), trying next…`)
    }
  }
  return null
}

async function seed() {
  console.log(`\n→ Seeding TEST content to "${projectId}" (${dataset})\n`)
  const state = { heroIds: [], productId: null, videoAssetId: null }

  // 1) Hero slides
  console.log('Hero slides:')
  for (const [i, h] of HERO_SEEDS.entries()) {
    const imageId = await uploadLocalImage(h.image)
    if (!imageId) continue
    await client.createOrReplace({
      _id: h.id,
      _type: 'heroSlide',
      title: h.title,
      subtitle: h.subtitle,
      ctaLabel: h.ctaLabel,
      ctaLink: h.ctaLink,
      order: i,
      active: true,
      image: { _type: 'image', asset: { _type: 'reference', _ref: imageId } },
    })
    state.heroIds.push(h.id)
    console.log('  ✓', h.title)
  }

  // 2) Product video
  console.log('\nProduct video:')
  const preferred = await client.fetch(
    `*[_type=="product" && !(_id in path("drafts.**")) && slug.current=="demon-slayer-rengoku"][0]{_id,name}`,
  )
  const target =
    preferred || (await client.fetch(`*[_type=="product" && !(_id in path("drafts.**"))][0]{_id,name}`))
  if (!target) {
    console.warn('  ⚠ No products found in Sanity — skipping video. (Run npm run migrate:sanity first.)')
  } else {
    const videoBuf = await obtainVideo()
    if (!videoBuf) {
      console.warn('  ⚠ Could not obtain a sample video (no network / all sources failed).')
      console.warn('    Re-run with a local file:')
      console.warn('      $env:SAMPLE_VIDEO="C:\\path\\to\\clip.mp4"; node scripts/seed-test-content.mjs')
    } else {
      const asset = await client.assets.upload('file', videoBuf, {
        filename: VIDEO_FILENAME,
        contentType: 'video/mp4',
      })
      await client
        .patch(target._id)
        .set({ video: { _type: 'file', asset: { _type: 'reference', _ref: asset._id } } })
        .commit()
      state.productId = target._id
      state.videoAssetId = asset._id
      console.log(`  ✓ Attached video to "${target.name}" (${(videoBuf.length / 1024 / 1024).toFixed(2)} MB)`)
    }
  }

  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2))
  console.log('\n✅ Done. The script writes published documents, so no manual publish is needed.')
  console.log('   The site reads via CDN, so changes appear within ~60s (hard-refresh to be sure).')
  console.log('   To remove everything this created:  node scripts/seed-test-content.mjs --clean\n')
}

async function seedLogo() {
  console.log('\n→ Uploading site logo to siteSettings…\n')
  const filePath = join(PUBLIC_DIR, 'assets/logo.jpg')
  if (!existsSync(filePath)) {
    console.error('  ✗ Missing public/assets/logo.jpg — nothing to upload.')
    process.exit(1)
  }
  const asset = await client.assets.upload('image', readFileSync(filePath), { filename: 'logo.jpg' })
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'Site Settings',
    logo: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
  })
  console.log('  ✓ Uploaded logo and set siteSettings.logo')
  console.log('    This is real site config — `--clean` will NOT remove it.')
  console.log('    Change it anytime in the Studio under "Site Settings".\n')
}

async function clean() {
  console.log('\n→ Removing TEST content…\n')
  let state = { heroIds: [], productId: null, videoAssetId: null }
  if (existsSync(STATE_FILE)) state = JSON.parse(readFileSync(STATE_FILE, 'utf8'))

  const heroIds = state.heroIds && state.heroIds.length ? state.heroIds : ['test-hero-1', 'test-hero-2', 'test-hero-3']
  for (const id of heroIds) {
    try {
      await client.delete(id)
      console.log('  ✓ deleted hero slide', id)
    } catch (e) {
      console.warn('  ⚠ could not delete', id, '—', e.message)
    }
  }

  if (state.productId) {
    try {
      await client.patch(state.productId).unset(['video']).commit()
      console.log('  ✓ removed video from product', state.productId)
    } catch (e) {
      console.warn('  ⚠ could not unset video —', e.message)
    }
  }
  if (state.videoAssetId) {
    try {
      await client.delete(state.videoAssetId)
      console.log('  ✓ deleted video asset')
    } catch (e) {
      console.warn('  ⚠ could not delete video asset (may still be referenced) —', e.message)
    }
  }

  if (existsSync(STATE_FILE)) unlinkSync(STATE_FILE)
  console.log('\n✅ Clean-up complete.\n')
}

const run = process.argv.includes('--clean')
  ? clean
  : process.argv.includes('--logo')
    ? seedLogo
    : seed
run().catch((err) => {
  console.error('\n✗ Failed:', err.message || err)
  process.exit(1)
})
