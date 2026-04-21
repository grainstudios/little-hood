// Site configuration and product data for The Little Hood

export const WHATSAPP_NUMBER = '919876543210';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const siteConfig = {
  name: 'The Little Hood',
  tagline: 'Precision Engineered',
  email: 'studio@thelittlehood.in',
  phone: '+91 80 4422 1100',
  address: {
    line1: '4th Floor, Precision Heights, Industrial Estate',
    line2: 'Whitefield, Bengaluru, KA 560066, India',
  },
  social: {
    instagram: '#',
    linkedin: '#',
  },
};

export const products = [
  {
    id: 'vortex-lattice-mk2',
    name: 'Vortex Lattice MK II',
    category: 'Industrial',
    material: 'High-Detail Resin',
    dimensions: '180 × 180 × 240mm',
    printTime: '42h 12m',
    price: '₹26,800',
    description: 'A generative geometry engineered for structural resonance and visual depth. Each layer is calibrated for absolute micron-level precision.',
    tags: ['Industrial', 'Lattice', 'Resin'],
    images: [
      'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=80',
      'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    ],
    specs: [
      { label: 'Dimensions', value: '180 × 180 × 240mm' },
      { label: 'Print Time', value: '42h 12m' },
      { label: 'Layer Height', value: '50 Micron' },
      { label: 'Material', value: 'High-Detail Resin' },
    ],
    materials: [
      { name: 'High-Detail Resin', detail: 'Liquid Polymer | 50 Micron Layers', selected: true },
      { name: 'SLS Nylon', detail: 'Powder Fusion | High Durability', selected: false },
      { name: 'Eco PLA+', detail: 'Sustainable Filament | Rapid Prototype', selected: false },
    ],
    serialNo: '882-LHOOD',
  },
  {
    id: 'kinetic-manifold-x1',
    name: 'Kinetic Manifold X-1',
    category: 'Industrial',
    material: 'Nylon PA12',
    dimensions: '200 × 150 × 80mm',
    printTime: '28h 00m',
    price: '₹37,800',
    description: 'Precision-engineered aerodynamic housing with variable wall thickness for extreme performance testing.',
    tags: ['Industrial Prototype', 'Nylon'],
    images: [
      'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80',
      'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80',
      'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=80',
    ],
    specs: [
      { label: 'Dimensions', value: '200 × 150 × 80mm' },
      { label: 'Print Time', value: '28h 00m' },
      { label: 'Material', value: 'Nylon PA12' },
      { label: 'Complexity', value: 'Level 9' },
    ],
    materials: [
      { name: 'Nylon PA12', detail: 'Industrial Grade | High Durability', selected: true },
      { name: 'SLS Nylon', detail: 'Powder Fusion | High Durability', selected: false },
      { name: 'Carbon Fiber Nylon', detail: 'Reinforced | Extreme Strength', selected: false },
    ],
    serialNo: '773-LHOOD',
  },
  {
    id: 'fluidity-vessel-04',
    name: 'Fluidity Vessel No. 04',
    category: 'Art & Decor',
    material: 'SLA Resin',
    dimensions: '120 × 120 × 200mm',
    printTime: '18h 30m',
    price: '₹15,100',
    description: 'Abstract 3D printed sculpture featuring organic, flowing lines inspired by natural forms.',
    tags: ['Art & Decor', 'Sculpture'],
    images: [
      'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&q=80',
      'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=80',
      'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80',
    ],
    specs: [
      { label: 'Dimensions', value: '120 × 120 × 200mm' },
      { label: 'Print Time', value: '18h 30m' },
      { label: 'Material', value: 'SLA Resin' },
      { label: 'Finish', value: 'Hand-Polished' },
    ],
    materials: [
      { name: 'Clear SLA Resin', detail: 'Transparent | High Detail', selected: true },
      { name: 'Matte Resin', detail: 'Opaque | Soft Touch', selected: false },
      { name: 'Flexible Resin', detail: 'Rubber-like | Durable', selected: false },
    ],
    serialNo: '554-LHOOD',
  },
  {
    id: 'urban-nucleus',
    name: 'Urban Nucleus',
    category: 'Architectural',
    material: 'PLA+',
    dimensions: '300 × 300 × 150mm',
    printTime: '36h 00m',
    price: '₹18,500',
    description: 'Architectural model showcasing fine structural details with shadow play on a matte surface.',
    tags: ['Architectural', 'Scale Model'],
    images: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
      'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=80',
      'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80',
    ],
    specs: [
      { label: 'Scale', value: '1:500' },
      { label: 'Print Time', value: '36h 00m' },
      { label: 'Material', value: 'PLA+' },
      { label: 'Finish', value: 'Matte White' },
    ],
    materials: [
      { name: 'PLA+ Matte White', detail: 'Architectural | Clean Finish', selected: true },
      { name: 'PLA+ Concrete Grey', detail: 'Industrial | Raw Look', selected: false },
      { name: 'ABS-Like Resin', detail: 'Smooth | High Detail', selected: false },
    ],
    serialNo: '661-LHOOD',
  },
  {
    id: 'fractal-band',
    name: 'Fractal Band',
    category: 'Custom Jewelry',
    material: 'Castable Wax',
    dimensions: '22mm × 8mm × 3mm',
    printTime: '4h 00m',
    price: '₹7,500',
    description: 'Ultra-detailed 3D printed ring design featuring complex geometric fractals.',
    tags: ['Custom Jewelry', 'Ring'],
    images: [
      'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&q=80',
      'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=80',
      'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80',
    ],
    specs: [
      { label: 'Dimensions', value: '22mm × 8mm × 3mm' },
      { label: 'Print Time', value: '4h 00m' },
      { label: 'Material', value: 'Castable Wax' },
      { label: 'Finish', value: 'Investment Cast' },
    ],
    materials: [
      { name: 'Castable Wax', detail: 'Jewelry | Investment Cast', selected: true },
      { name: 'Food-Safe Resin', detail: 'PLA-like | Skin Safe', selected: false },
      { name: 'Silver Resin', detail: 'Metallic Look | Decorative', selected: false },
    ],
    serialNo: '991-LHOOD',
  },
  {
    id: 'servo-mount-v3',
    name: 'Servo Mount V3',
    category: 'Industrial',
    material: 'Glass Fiber Nylon',
    dimensions: '80 × 60 × 40mm',
    printTime: '6h 00m',
    price: '₹5,500',
    description: '3D printed mechanical assembly with multiple interlocking parts demonstrating high precision fit.',
    tags: ['Industrial', 'Mechanical'],
    images: [
      'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80',
      'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80',
      'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=80',
    ],
    specs: [
      { label: 'Dimensions', value: '80 × 60 × 40mm' },
      { label: 'Print Time', value: '6h 00m' },
      { label: 'Material', value: 'Glass Fiber Nylon' },
      { label: 'Tolerance', value: '±0.05mm' },
    ],
    materials: [
      { name: 'Glass Fiber Nylon', detail: 'High Strength | Industrial', selected: true },
      { name: 'Carbon Fiber Nylon', detail: 'Extreme Strength | Lightweight', selected: false },
      { name: 'ABS', detail: 'Durable | Heat Resistant', selected: false },
    ],
    serialNo: '442-LHOOD',
  },
];

export const galleryProducts = [
  ...products,
  {
    id: 'monolith-case',
    name: 'Monolith Case',
    category: 'Accessories',
    material: 'SLA Resin',
    dimensions: '140 × 70 × 25mm',
    printTime: '8h 00m',
    price: '₹10,400',
    description: 'Matte black 3D printed desktop organizer with organic parametric holes.',
    tags: ['Accessories', 'Desktop'],
    images: [
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80',
      'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&q=80',
    ],
    specs: [
      { label: 'Dimensions', value: '140 × 70 × 25mm' },
      { label: 'Material', value: 'SLA Resin' },
    ],
    materials: [
      { name: 'Matte Black SLA', detail: 'Opaque | Premium Finish', selected: true },
    ],
    serialNo: '334-LHOOD',
  },
  {
    id: 'flow-vessel',
    name: 'Flow Vessel',
    category: 'Art & Decor',
    material: 'Nylon SLS',
    dimensions: '100 × 100 × 180mm',
    printTime: '14h 00m',
    price: '₹7,500',
    description: 'Abstract 3D printed sculptural piece with fluid wave-like forms.',
    tags: ['Art & Decor', 'Sculpture'],
    images: [
      'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&q=80',
      'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=80',
    ],
    specs: [
      { label: 'Dimensions', value: '100 × 100 × 180mm' },
      { label: 'Material', value: 'Nylon SLS' },
    ],
    materials: [
      { name: 'Nylon SLS', detail: 'Durable | Matte', selected: true },
    ],
    serialNo: '225-LHOOD',
  },
  {
    id: 'aero-frame',
    name: 'Aero Frame',
    category: 'Industrial',
    material: 'Carbon PLA',
    dimensions: '200 × 80 × 3mm',
    printTime: '5h 30m',
    price: '₹17,600',
    description: 'Precise 3D printed mechanical keyboard case with honeycomb patterns.',
    tags: ['Industrial', 'Keyboard'],
    images: [
      'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80',
      'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80',
    ],
    specs: [
      { label: 'Dimensions', value: '200 × 80 × 3mm' },
      { label: 'Material', value: 'Carbon PLA' },
    ],
    materials: [
      { name: 'Carbon Fiber PLA', detail: 'Lightweight | Strong', selected: true },
    ],
    serialNo: '116-LHOOD',
  },
];

export const whatsappMsg = (productName) =>
  `Hi, I'm interested in ${productName} from TheLittleHood`;
