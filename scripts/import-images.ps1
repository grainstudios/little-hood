# Imports real product images from the customer's littlehood_images folder
# into public/assets/products/<slug>/ with clean, web-safe filenames.
# Only image files are copied (videos/.mov/.mp4 are skipped).

$ErrorActionPreference = 'Stop'
$srcRoot  = 'C:\Users\bchippada\Downloads\littlehood_images\WEB SITE'
$destRoot = Join-Path $PSScriptRoot '..\public\assets\products'

# slug => source folder (relative to $srcRoot)
$map = [ordered]@{
  'iwatch-charging-holder'   = 'Accessories\I watch Charging holder'
  'makeup-organizer'         = 'Accessories\Make Up Organizer'
  'watch-stand'              = 'Accessories\Watch Stand'
  'work-organizer'           = 'Accessories\Work Organizer'

  'demon-slayer-rengoku'     = 'Action Figuers\Anime Figuers\Demon Slayer - Rengoku'
  'dragon-ball-goku'         = 'Action Figuers\Anime Figuers\Dragon Ball'
  'dragon-ball-pokeball'     = 'Action Figuers\Anime Figuers\Dragon ball - poke ball'
  'one-piece-luffy-red'      = 'Action Figuers\Anime Figuers\One peice = Luffy red'
  'one-piece-den-den-mushi'  = 'Action Figuers\Anime Figuers\ONE PIECE - DEN DEN MUSHI'
  'one-piece-luffy'          = 'Action Figuers\Anime Figuers\One Piece - Luffy'
  'one-piece-pokeball'       = 'Action Figuers\Anime Figuers\One piece - Poke ball'
  'one-piece-x-pokeball'     = 'Action Figuers\Anime Figuers\One piece X Pokemon Ball'
  'charmander-chibbi'        = 'Action Figuers\Anime Figuers\POKEMON - Charmander Chibbi'
  'umbreon-chibbi'           = 'Action Figuers\Anime Figuers\POKEMON - UMBERON CHIBBI'
  'umbreon-pokeball'         = 'Action Figuers\Anime Figuers\POKEMON - Pokeball (umberon)'
  'venom-charizard'          = 'Action Figuers\Anime Figuers\Venom Charizard'
  'batman'                   = 'Action Figuers\Batman'
  'skull-hood'               = 'Action Figuers\SkullHood'
  'star-wars-darth-vader'    = 'Action Figuers\Star wars'

  'bathroom-organizer'       = 'Bathroom Organizer\Modren Bath organizers'

  'knitted-fridge-magnet'    = 'Fridge magnets\Knitted fridget manget'
  'one-piece-fridge-magnet'  = 'Fridge magnets\One piece fridge magnet'
  'pikachu-splat-magnet'     = 'Fridge magnets\Pickachu Splat Fridge magnet'
  'viking-axe-magnet'        = 'Fridge magnets\Viking Axe Fridge magnet'

  'cubone-joystick-holder'   = 'Gaming Accessories\Cubone Skull Universal Joystick Controller Holder'
  'mandalorian-controller-holder' = 'Gaming Accessories\Mandalorian Universal Controller Holder'
  'one-piece-law-keycap'     = 'Gaming Accessories\One piece Law Keycap'

  'fence-flower-pot'         = 'Garden Decors\Fence Flower Pot'
  'mini-dino'                = 'Garden Decors\Mini Dino'
  'pokeball-flower-pot'      = 'Garden Decors\POKEMON BALL FLOWER POT'
  'sphere-flower-pot'        = 'Garden Decors\Spehre Flower Pot'

  'monogram-name-creator'    = 'Gifiting\Personalized Monogram Name Creator'

  'bubble-cube-pot'          = 'HOME DECORS\Bubble cube pot'
  'clock-e-mon'              = 'HOME DECORS\CLOCK - E - MON'
  'decor-vase'               = 'HOME DECORS\DECOR VASE'
  'esthetic-flower-pot'      = 'HOME DECORS\Esthetic Flower Pot'
  'hex-shelf'                = 'HOME DECORS\HEX SHELF'
  'incense-holder'           = 'HOME DECORS\Insence holder'
  'neko-holder'              = 'HOME DECORS\NEKO HOLDER'
  'silent-angel-flower-pot'  = 'HOME DECORS\Silent Angel flower pot'
  'wall-art-one-piece'       = 'HOME DECORS\Wall Art\One piece'
  'wall-art-neko'            = 'HOME DECORS\Wall Art\Neko art'
  'wall-art-solo-leveling'   = 'HOME DECORS\Wall Art\Solo Levelling Wall & table art'
  'wall-hand-flower-pot'     = 'HOME DECORS\Wall Hand Flower pot'

  'darth-vader-keychain'     = 'Keychains\Darth Vader _ Star wars keychain'
  'minion-keychain'          = 'Keychains\Minion keychains'
  'one-piece-keychain'       = 'Keychains\One piece kechains'
  'pokemon-keychain'         = 'Keychains\Pokemon Keychains'

  'spice-organizer-360'      = 'Kitchen Accessories\360 Spice Organizer'
  'spice-organizer'          = 'Kitchen Accessories\Spice Organizer'
  'tree-spice-organizer'     = 'Kitchen Accessories\Tree spice organizer'
  'universal-kitchen-organizer' = 'Kitchen Accessories\Universal Kitchen organizer'

  'hobbit-lamp'              = 'LAMPS\Lava lamp'
  'minecraft-lamp'           = 'LAMPS\Minecraft Lmaps'
  'mini-home-lamp'           = 'LAMPS\Mini Home lamps'
  'table-lamp'               = 'LAMPS\Table Lamps'
  'lava-lamp'                = 'HOME DECORS\LAVA LAMP'
}

# Overrides: prefer the dedicated HOME DECORS\HOBBIT LAMP folder for hobbit-lamp
$map['hobbit-lamp'] = 'HOME DECORS\HOBBIT LAMP'

$imgExt = @('.jpg', '.jpeg', '.png', '.webp', '.gif')
$manifest = [ordered]@{}

foreach ($slug in $map.Keys) {
  $src = Join-Path $srcRoot $map[$slug]
  if (-not (Test-Path $src)) { Write-Warning "MISSING: $src"; continue }
  $dest = Join-Path $destRoot $slug
  New-Item -ItemType Directory -Force -Path $dest | Out-Null

  $files = Get-ChildItem -Path $src -File | Where-Object { $imgExt -contains $_.Extension.ToLower() } | Sort-Object Name
  $i = 1
  $names = @()
  foreach ($f in $files) {
    $ext = $f.Extension.ToLower()
    $newName = "$i$ext"
    Copy-Item $f.FullName (Join-Path $dest $newName) -Force
    $names += "assets/products/$slug/$newName"
    $i++
  }
  $manifest[$slug] = $names
}

$manifest | ConvertTo-Json -Depth 5 | Set-Content (Join-Path $PSScriptRoot 'image-manifest.json') -Encoding utf8
Write-Host "Done. Imported $($manifest.Count) product folders."
