/**
 * One-time migration: copy the built-in catalog (src/config/catalog.js) into
 * Sanity — creating Category + Product documents and uploading every local
 * product image as a Sanity asset.
 *
 * Run from the project root:
 *   1. Copy .env.example to .env and paste your Sanity write token.
 *   2. npm run migrate:sanity
 *
 * The script is idempotent for documents (uses fixed _ids + createOrReplace).
 * Re-running re-uploads images, so only run it again if you intend to.
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, basename } from 'node:path'
import { fallbackProducts, fallbackCategories } from '../src/config/catalog.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PUBLIC_DIR = join(ROOT, 'public')

// ── Minimal .env loader (no extra dependency) ─────────────────────────────
function loadEnv() {
  const envPath = join(ROOT, '.env')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/)
    if (!match) continue
    const key = match[1]
    const val = match[2].replace(/^["']|["']$/g, '')
    if (process.env[key] === undefined) process.env[key] = val
  }
}
loadEnv()

const token = process.env.SANITY_API_TOKEN
const projectId = process.env.SANITY_PROJECT_ID || '8a36ilal'
const dataset = process.env.SANITY_DATASET || 'production'

if (!token) {
  console.error(
    '\n✗ Missing SANITY_API_TOKEN.\n' +
      '  Create a token at sanity.io/manage → API → Tokens (Editor),\n' +
      '  then copy .env.example to .env and paste it there.\n',
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const randomKey = () => Math.random().toString(36).slice(2, 12)

async function uploadImage(webPath) {
  // webPath looks like /assets/products/<slug>/<file>
  const rel = webPath.replace(/^\//, '')
  const filePath = join(PUBLIC_DIR, rel)
  if (!existsSync(filePath)) {
    console.warn('   ⚠ missing image, skipped:', rel)
    return null
  }
  const asset = await client.assets.upload('image', readFileSync(filePath), {
    filename: basename(filePath),
  })
  return {
    _type: 'image',
    _key: randomKey(),
    asset: { _type: 'reference', _ref: asset._id },
  }
}

async function run() {
  console.log(`\n→ Migrating to Sanity project "${projectId}" (dataset: ${dataset})\n`)

  // 1) Categories
  console.log('Categories:')
  for (const [i, c] of fallbackCategories.entries()) {
    await client.createOrReplace({
      _id: `category-${c.id}`,
      _type: 'category',
      title: c.name,
      slug: { _type: 'slug', current: c.id },
      order: i,
    })
    console.log('  ✓', c.name)
  }

  // 2) Products (+ image uploads)
  console.log('\nProducts:')
  let ok = 0
  for (const [i, p] of fallbackProducts.entries()) {
    const images = []
    for (const webPath of p.images) {
      const img = await uploadImage(webPath)
      if (img) images.push(img)
    }
    await client.createOrReplace({
      _id: `product-${p.id}`,
      _type: 'product',
      name: p.name,
      slug: { _type: 'slug', current: p.id },
      category: { _type: 'reference', _ref: `category-${p.category}` },
      price: p.price ?? null,
      description: p.description,
      images,
      order: i,
      active: true,
    })
    ok++
    console.log(`  ✓ ${p.name}  (${images.length} image${images.length === 1 ? '' : 's'})`)
  }

  console.log(
    `\n✅ Done. ${fallbackCategories.length} categories and ${ok} products migrated to Sanity.\n`,
  )
}

run().catch((err) => {
  console.error('\n✗ Migration failed:', err.message || err)
  process.exit(1)
})
