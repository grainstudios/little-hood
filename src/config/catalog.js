// Built-in catalog — acts as a safety-net fallback.
//
// The live catalog is managed in Sanity (the admin panel) and fetched at
// runtime. If Sanity is ever empty or unreachable, the site automatically
// falls back to this data so the store never goes blank.
//
// This file is also the single source of truth the one-time migration script
// (scripts/migrate-to-sanity.mjs) reads from to populate Sanity.

// Helper to build absolute public paths for a product image set.
const img = (slug, files) => files.map((f) => `/assets/products/${slug}/${f}`)

// Categories shown in navigation and used to group the catalog.
export const fallbackCategories = [
  { id: 'action-figures', name: 'Action Figures' },
  { id: 'home-decor', name: 'Home Decor' },
  { id: 'lamps', name: 'Lamps' },
  { id: 'keychains', name: 'Keychains' },
  { id: 'fridge-magnets', name: 'Fridge Magnets' },
  { id: 'kitchen', name: 'Kitchen' },
  { id: 'garden-decor', name: 'Garden Decor' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'bathroom', name: 'Bathroom Essentials' },
  { id: 'gifting', name: 'Gifting' },
]

export const fallbackProducts = [
  // ─── Action Figures ───────────────────────────────────────────
  {
    id: 'demon-slayer-rengoku', name: 'Demon Slayer — Rengoku', category: 'action-figures',
    price: 399, description: 'Highly detailed Demon Slayer Rengoku action figure, hand-finished and ready to display. A must-have for any anime collector.',
    images: img('demon-slayer-rengoku', ['1.png', '2.png', '3.png', '4.png', '5.png']),
  },
  {
    id: 'dragon-ball-goku', name: 'Dragon Ball', category: 'action-figures',
    price: 399, description: 'Iconic Dragon Ball figure printed in fine detail and crisp finish. Perfect for desks, shelves and gifting.',
    images: img('dragon-ball-goku', ['2.webp', '3.webp']),
  },
  {
    id: 'dragon-ball-pokeball', name: 'Dragon Ball Poké Ball', category: 'action-figures',
    price: 499, description: 'Dragon Ball themed Poké Ball collectible — a fun crossover piece for fans of both worlds.',
    images: img('dragon-ball-pokeball', ['1.webp', '2.webp']),
  },
  {
    id: 'one-piece-luffy-red', name: 'One Piece — Luffy (Red)', category: 'action-figures',
    price: 399, description: 'One Piece Luffy figure in his bold red outfit. Dynamic pose with sharp, layer-perfect detailing.',
    images: img('one-piece-luffy-red', ['1.png', '2.png', '3.png', '4.png']),
  },
  {
    id: 'one-piece-den-den-mushi', name: 'One Piece — Den Den Mushi', category: 'action-figures',
    price: 1499, description: 'Premium One Piece Den Den Mushi collectible — a large, statement display piece for serious fans.',
    images: img('one-piece-den-den-mushi', ['1.jpg', '2.png', '3.png']),
  },
  {
    id: 'one-piece-luffy', name: 'One Piece — Luffy', category: 'action-figures',
    price: 399, description: 'Classic One Piece Luffy action figure with clean detailing and a stable display base.',
    images: img('one-piece-luffy', ['1.png', '2.png', '3.png', '4.png', '5.png']),
  },
  {
    id: 'one-piece-pokeball', name: 'One Piece Poké Ball', category: 'action-figures',
    price: 599, description: 'One Piece inspired Poké Ball collectible — a playful crossover display piece.',
    images: img('one-piece-pokeball', ['1.png', '2.png', '3.png']),
  },
  {
    id: 'one-piece-x-pokeball', name: 'One Piece × Pokéball Set', category: 'action-figures',
    price: 899, description: 'Collectible set featuring Luffy, Zoro, Sanji and Franky in Poké Ball form. Great value bundle for the Straw Hat crew.',
    images: img('one-piece-x-pokeball', ['1.png', '2.png', '3.png', '4.png']),
  },
  {
    id: 'charmander-chibbi', name: 'Pokémon — Charmander Chibi', category: 'action-figures',
    price: 299, description: 'Adorable chibi-style Charmander figure. Compact, cute and beautifully finished.',
    images: img('charmander-chibbi', ['1.jpg', '2.jpg', '3.png', '4.png', '5.png']),
  },
  {
    id: 'umbreon-chibbi', name: 'Pokémon — Umbreon Chibi', category: 'action-figures',
    price: 399, description: 'Chibi-style Umbreon collectible with crisp detail and a smooth finish.',
    images: img('umbreon-chibbi', ['1.png', '2.png', '3.jpeg', '4.jpg', '5.jpg', '6.jpg']),
  },
  {
    id: 'umbreon-pokeball', name: 'Pokémon — Umbreon Poké Ball', category: 'action-figures',
    price: 499, description: 'Umbreon themed Poké Ball collectible — a standout piece for any Pokémon shelf.',
    images: img('umbreon-pokeball', ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.png']),
  },
  {
    id: 'venom-charizard', name: 'Venom Charizard', category: 'action-figures',
    price: 399, description: 'Bold Venom-styled Charizard mash-up figure with striking detail. A unique conversation piece.',
    images: img('venom-charizard', ['1.webp', '2.webp', '3.webp']),
  },
  {
    id: 'batman', name: 'Batman', category: 'action-figures',
    price: 199, description: 'Compact Batman figure printed with clean detail — an affordable collectible for any fan.',
    images: img('batman', ['front.png', '1.png', '2.png']),
  },
  {
    id: 'skull-hood', name: 'Skull Hood', category: 'action-figures',
    price: 249, description: 'Signature Skull Hood piece with an articulated, eye-catching design.',
    images: img('skull-hood', ['2.webp', '1.gif']),
  },
  {
    id: 'star-wars-darth-vader', name: 'Star Wars — Darth Vader', category: 'action-figures',
    price: 199, description: 'Star Wars Darth Vader figure with detailed cape and helmet. A great desk companion for the dark side.',
    images: img('star-wars-darth-vader', ['1.webp', '2.png']),
  },

  // ─── Home Decor ───────────────────────────────────────────────
  {
    id: 'bubble-cube-pot', name: 'Bubble Cube Pot', category: 'home-decor',
    price: 399, description: 'Modern bubble-textured cube planter that adds a soft, contemporary touch to any space.',
    images: img('bubble-cube-pot', ['1.webp']),
  },
  {
    id: 'clock-e-mon', name: 'Clock-E-Mon', category: 'home-decor',
    price: 999, description: 'Playful Pokémon-inspired desk clock — functional decor that brightens up any room.',
    images: img('clock-e-mon', ['1.jpg', '2.webp', '3.jpg', '4.jpg', '5.png', '6.png', '7.png']),
  },
  {
    id: 'decor-vase', name: 'Decor Vase', category: 'home-decor',
    price: 499, description: 'Sculptural decorative vase with a flowing, organic silhouette. Priced per piece.',
    images: img('decor-vase', ['1.webp', '2.webp', '3.webp', '4.webp']),
  },
  {
    id: 'esthetic-flower-pot', name: 'Aesthetic Flower Pot', category: 'home-decor',
    price: 499, description: 'Minimalist aesthetic flower pot designed to complement modern interiors.',
    images: img('esthetic-flower-pot', ['1.jpg', '2.jpg', '3.jpg', '4.jpg']),
  },
  {
    id: 'hex-shelf', name: 'Hex Shelf', category: 'home-decor',
    price: null, description: 'Modular hexagonal wall shelf — combine multiple units to create your own honeycomb display.',
    images: img('hex-shelf', ['1.webp', '2.jpg']),
  },
  {
    id: 'incense-holder', name: 'Incense Holder', category: 'home-decor',
    price: null, description: 'Elegant incense holder that catches ash neatly while adding a calming accent to your space.',
    images: img('incense-holder', ['1.jpg', '2.jpg', '3.jpg']),
  },
  {
    id: 'neko-holder', name: 'Neko Holder', category: 'home-decor',
    price: null, description: 'Charming cat-themed holder for your everyday small essentials.',
    images: img('neko-holder', ['1.webp', '2.webp']),
  },
  {
    id: 'silent-angel-flower-pot', name: 'Silent Angel Flower Pot', category: 'home-decor',
    price: 599, description: 'Graceful angel-form planter that doubles as a serene decorative sculpture.',
    images: img('silent-angel-flower-pot', ['1.webp', '2.webp', '3.webp']),
  },
  {
    id: 'wall-art-one-piece', name: 'One Piece Wall Art', category: 'home-decor',
    price: 799, description: 'Layered One Piece wall art panel — a bold statement piece for fans.',
    images: img('wall-art-one-piece', ['1.webp', '2.webp', '3.webp', '4.webp']),
  },
  {
    id: 'wall-art-neko', name: 'Neko Wall Art', category: 'home-decor',
    price: null, description: 'Delicate cat-and-butterfly wall art that adds a whimsical touch to any room.',
    images: img('wall-art-neko', ['1.jpg']),
  },
  {
    id: 'wall-art-solo-leveling', name: 'Solo Leveling Wall & Table Art', category: 'home-decor',
    price: null, description: 'Solo Leveling themed art for wall mounting or table display.',
    images: img('wall-art-solo-leveling', ['1.webp', '2.webp']),
  },
  {
    id: 'wall-hand-flower-pot', name: 'Wall Hand Flower Pot', category: 'home-decor',
    price: 899, description: 'Striking hand-shaped wall-mounted planter — a true centrepiece for plant lovers.',
    images: img('wall-hand-flower-pot', ['1.webp', '2.webp', '3.webp']),
  },

  // ─── Lamps ────────────────────────────────────────────────────
  {
    id: 'hobbit-lamp', name: 'Hobbit Lamp', category: 'lamps',
    price: 399, description: 'Cozy hobbit-hole inspired lamp that casts a warm, ambient glow — perfect for bedside tables.',
    images: img('hobbit-lamp', ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.png', '6.png', '7.jpg']),
  },
  {
    id: 'lava-lamp', name: 'Lava Lamp', category: 'lamps',
    price: 399, description: 'Retro-style lava lamp with a soft, mesmerising light. A nostalgic accent for any room.',
    images: img('lava-lamp', ['1.png', '2.jpg', '3.jpg']),
  },
  {
    id: 'minecraft-lamp', name: 'Minecraft Lamp', category: 'lamps',
    price: 399, description: 'Pixel-perfect Minecraft themed lamp that lights up any gamer’s room.',
    images: img('minecraft-lamp', ['1.webp', '2.webp', '3.webp', '4.jpeg', '5.gif']),
  },
  {
    id: 'mini-home-lamp', name: 'Mini Home Lamp', category: 'lamps',
    price: 349, description: 'Compact decorative mini lamp that adds a warm glow to shelves and nightstands.',
    images: img('mini-home-lamp', ['1.png', '2.png', '3.png', '4.png', '5.png']),
  },
  {
    id: 'table-lamp', name: 'Table Lamp', category: 'lamps',
    price: null, description: 'Contemporary 3D printed table lamp with a sculpted shade and warm diffuse light.',
    images: img('table-lamp', ['1.webp', '2.webp', '3.webp', '4.webp']),
  },

  // ─── Keychains ────────────────────────────────────────────────
  {
    id: 'darth-vader-keychain', name: 'Darth Vader Keychain', category: 'keychains',
    price: 299, description: 'Star Wars Darth Vader keychain — durable, detailed and a fan favourite.',
    images: img('darth-vader-keychain', ['1.webp', '2.webp']),
  },
  {
    id: 'minion-keychain', name: 'Minion Keychain', category: 'keychains',
    price: 299, description: 'Cheerful Minion keychain that brings a smile to your keys or bag.',
    images: img('minion-keychain', ['1.webp', '2.webp']),
  },
  {
    id: 'one-piece-keychain', name: 'One Piece Keychain', category: 'keychains',
    price: 299, description: 'One Piece themed keychain printed with crisp detail. Choose your favourite crew member.',
    images: img('one-piece-keychain', ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp']),
  },
  {
    id: 'pokemon-keychain', name: 'Pokémon Keychain', category: 'keychains',
    price: 299, description: 'Collectible Pokémon keychain — a pocket-sized companion for fans.',
    images: img('pokemon-keychain', ['1.webp', '2.webp']),
  },

  // ─── Fridge Magnets ───────────────────────────────────────────
  {
    id: 'knitted-fridge-magnet', name: 'Knitted Fridge Magnet', category: 'fridge-magnets',
    price: 150, description: 'Cute knitted-texture fridge magnet — a charming, affordable accent for your kitchen.',
    images: img('knitted-fridge-magnet', ['1.webp', '2.webp', '3.webp']),
  },
  {
    id: 'one-piece-fridge-magnet', name: 'One Piece Fridge Magnet', category: 'fridge-magnets',
    price: 399, description: 'One Piece themed fridge magnet set with vibrant, fan-favourite designs.',
    images: img('one-piece-fridge-magnet', ['1.png', '2.jpg', '3.jpg', '4.png']),
  },
  {
    id: 'pikachu-splat-magnet', name: 'Pikachu Splat Magnet', category: 'fridge-magnets',
    price: 199, description: 'Fun Pikachu splat fridge magnet that adds a playful pop to any surface.',
    images: img('pikachu-splat-magnet', ['1.webp', '2.png']),
  },
  {
    id: 'viking-axe-magnet', name: 'Viking Axe Fridge Magnet', category: 'fridge-magnets',
    price: 399, description: 'Bold viking axe fridge magnet with a rugged, detailed finish.',
    images: img('viking-axe-magnet', ['1.jpg', '2.png']),
  },

  // ─── Kitchen ──────────────────────────────────────────────────
  {
    id: 'spice-organizer-360', name: '360° Spice Organizer', category: 'kitchen',
    price: 1199, description: 'Rotating 360° spice organizer that keeps every jar within easy reach. A kitchen game-changer.',
    images: img('spice-organizer-360', ['1.webp', '2.webp']),
  },
  {
    id: 'tree-spice-organizer', name: 'Tree Spice Organizer', category: 'kitchen',
    price: 999, description: 'Space-saving tree-style spice rack that displays your spices in a neat vertical tower.',
    images: img('tree-spice-organizer', ['1.webp', '2.png']),
  },
  {
    id: 'spice-organizer', name: 'Spice Organizer Shelf', category: 'kitchen',
    price: null, description: 'Two-tier spice shelf that keeps your seasonings tidy and accessible.',
    images: img('spice-organizer', ['1.png', '2.png']),
  },
  {
    id: 'universal-kitchen-organizer', name: 'Universal Kitchen Organizer', category: 'kitchen',
    price: null, description: 'Versatile kitchen organizer designed to declutter your counters and drawers.',
    images: img('universal-kitchen-organizer', ['1.webp', '2.webp', '3.webp', '4.webp']),
  },

  // ─── Garden Decor ─────────────────────────────────────────────
  {
    id: 'fence-flower-pot', name: 'Fence Flower Pot', category: 'garden-decor',
    price: 499, description: 'Charming fence-style flower pot that brings a cottage-garden feel to your plants.',
    images: img('fence-flower-pot', ['1.png', '2.png']),
  },
  {
    id: 'mini-dino', name: 'Mini Dinos (Set of 10)', category: 'garden-decor',
    price: 250, description: 'Set of 10 mini dinosaurs — perfect for garden accents, terrariums or playful decor.',
    images: img('mini-dino', ['1.jpg', '2.png', '3.png']),
  },
  {
    id: 'pokeball-flower-pot', name: 'Poké Ball Flower Pot', category: 'garden-decor',
    price: 499, description: 'Poké Ball shaped planter that adds a fun, collectible twist to your greenery.',
    images: img('pokeball-flower-pot', ['1.jpeg']),
  },
  {
    id: 'sphere-flower-pot', name: 'Sphere Flower Pot', category: 'garden-decor',
    price: 499, description: 'Sleek spherical flower pot with a clean, modern profile for indoor or outdoor use.',
    images: img('sphere-flower-pot', ['1.jpg', '2.jpg', '3.jpg']),
  },

  // ─── Gaming ───────────────────────────────────────────────────
  {
    id: 'cubone-joystick-holder', name: 'Cubone Skull Joystick Holder', category: 'gaming',
    price: 399, description: 'Cubone skull themed universal controller holder — keep your joystick safe in style.',
    images: img('cubone-joystick-holder', ['1.webp', '2.webp']),
  },
  {
    id: 'mandalorian-controller-holder', name: 'Mandalorian Controller Holder', category: 'gaming',
    price: 399, description: 'Mandalorian themed universal controller stand for your gaming setup.',
    images: img('mandalorian-controller-holder', ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp']),
  },
  {
    id: 'one-piece-law-keycap', name: 'One Piece Law Keycap', category: 'gaming',
    price: null, description: 'Custom One Piece (Law) artisan keycap to personalise your mechanical keyboard.',
    images: img('one-piece-law-keycap', ['1.webp', '2.webp', '3.webp']),
  },

  // ─── Accessories ──────────────────────────────────────────────
  {
    id: 'iwatch-charging-holder', name: 'iWatch Charging Holder', category: 'accessories',
    price: 240, description: 'Neat charging stand for your Apple Watch that keeps cables tidy on your desk or nightstand.',
    images: img('iwatch-charging-holder', ['1.png', '2.png', '3.png']),
  },
  {
    id: 'makeup-organizer', name: 'Makeup Organizer', category: 'accessories',
    price: 999, description: 'Spacious makeup organizer with multiple compartments to keep your essentials sorted.',
    images: img('makeup-organizer', ['1.webp', '2.webp']),
  },
  {
    id: 'watch-stand', name: 'Watch Stand', category: 'accessories',
    price: 450, description: 'Elegant watch display stand that showcases your timepiece beautifully.',
    images: img('watch-stand', ['1.webp', '2.webp', '3.webp']),
  },
  {
    id: 'work-organizer', name: 'Work Desk Organizer', category: 'accessories',
    price: 299, description: 'Compact desk organizer that keeps pens, cards and small items within reach.',
    images: img('work-organizer', ['1.webp', '2.webp', '3.webp']),
  },

  // ─── Bathroom ─────────────────────────────────────────────────
  {
    id: 'bathroom-organizer', name: 'Modern Bathroom Organizer', category: 'bathroom',
    price: 699, description: 'Modern bathroom organizer that keeps your toiletries neat and dry.',
    images: img('bathroom-organizer', ['1.webp', '2.jpeg']),
  },

  // ─── Gifting ──────────────────────────────────────────────────
  {
    id: 'monogram-name-creator', name: 'Personalized Monogram Name Plate', category: 'gifting',
    price: null, description: 'Custom personalised monogram / name plate — a thoughtful, made-to-order gift.',
    images: img('monogram-name-creator', ['1.jpg', '2.webp', '3.webp', '4.webp', '5.webp']),
  },
]
