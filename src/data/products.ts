import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'nc-001',
    slug: 'axiom-kinetic-trench',
    title: 'Axiom Kinetic Trench',
    subtitle: 'Modular Weather-Resistant Technical Silk Trench',
    price: 34500,
    compareAtPrice: 39000,
    category: 'outerwear',
    collection: 'architectural',
    description: 'An architectural statement piece engineered from double-faced Japanese technical silk twill with water-repellent nanotech coating. Features articulated drop shoulders, a hidden magnetic storm flap, and brushed titanium D-ring belt adjusters.',
    details: [
      'Double-faced Japanese technical silk twill (320 GSM)',
      'Bonded waterproof seam construction with laser-cut edges',
      'Articulated raglan sleeve pattern with storm vents',
      'Matte obsidian magnetic closures & custom titanium hardware',
      'Removable structural storm collar and dual storm lapels'
    ],
    fabricComposition: '68% High-Density Recycled Polyamide, 32% Mulberry Silk',
    careInstructions: 'Specialist dry clean only. Store in provided protective garment sleeve.',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85'
    ],
    has3DModel: true,
    modelType: 'trench',
    featured: true,
    isNewArrival: true,
    releaseYear: 2026,
    variants: [
      { id: 'v1-s-black', size: 'S', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-AXM-S-BLK' },
      { id: 'v1-m-black', size: 'M', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-AXM-M-BLK' },
      { id: 'v1-l-black', size: 'L', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-AXM-L-BLK' },
      { id: 'v1-m-stone', size: 'M', color: 'Muted Stone', colorHex: '#B7B0A5', inStock: true, sku: 'NC-AXM-M-STN' },
      { id: 'v1-l-stone', size: 'L', color: 'Muted Stone', colorHex: '#B7B0A5', inStock: false, sku: 'NC-AXM-L-STN' }
    ]
  },
  {
    id: 'nc-002',
    slug: 'monolith-sculptural-blazer',
    title: 'Monolith Sculptural Blazer',
    subtitle: 'Zero-Lapel Heavyweight Virgin Wool Tailored Jacket',
    price: 28900,
    category: 'tailoring',
    collection: 'monolith',
    description: 'Precision cut with an unbroken architectural front plane. Crafted from fine 180s virgin wool woven in Biella, Italy, finished with sculpted horn buttons hidden under an offset placket and bespoke cupro lining.',
    details: [
      'Super 180s Virgin Wool with natural mechanical stretch',
      'Floating canvas chest piece for anatomical drape',
      'Concealed double-breasted horn buttoning',
      'Architectural shoulder construction with clean drop',
      'Breathable Bemberg cupro lining with interior ticket welt'
    ],
    fabricComposition: '100% Biella Virgin Wool; Lining: 100% Cupro',
    careInstructions: 'Professional dry clean. Light steam only.',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    has3DModel: true,
    modelType: 'jacket',
    featured: true,
    isNewArrival: false,
    releaseYear: 2026,
    variants: [
      { id: 'v2-xs-obsidian', size: 'XS', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-MNL-XS-BLK' },
      { id: 'v2-s-obsidian', size: 'S', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-MNL-S-BLK' },
      { id: 'v2-m-obsidian', size: 'M', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-MNL-M-BLK' },
      { id: 'v2-l-obsidian', size: 'L', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-MNL-L-BLK' }
    ]
  },
  {
    id: 'nc-003',
    slug: 'vesper-asymmetric-drape-coat',
    title: 'Vesper Asymmetric Drape Coat',
    subtitle: 'Double-Faced Cashmere Blend Wrap Coat',
    price: 42000,
    compareAtPrice: 47500,
    category: 'outerwear',
    collection: 'capsule-01',
    description: 'A cocoon-inspired silhouette enveloped in luxurious brushed cashmere and merino fleece. Hand-finished split seams ensure a seamless, featherlight drape that shifts organically with body movement.',
    details: [
      '70% Mongolian Cashmere, 30% Fine Australian Merino Wool',
      'Hand-stitched double-face finishing (zero visible linings)',
      'Generous asymmetrical wrap collar with hidden horn latch',
      'Deep inset storm pockets lined in brushed silk',
      'Floor-grazing architectural length'
    ],
    fabricComposition: '70% Cashmere, 30% Merino Wool',
    careInstructions: 'Dry clean only. Cedar storage recommended.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85'
    ],
    has3DModel: true,
    modelType: 'coat',
    featured: true,
    isNewArrival: true,
    releaseYear: 2026,
    variants: [
      { id: 'v3-s-ivory', size: 'S', color: 'Warm Ivory', colorHex: '#F5F1E9', inStock: true, sku: 'NC-VSP-S-IVR' },
      { id: 'v3-m-ivory', size: 'M', color: 'Warm Ivory', colorHex: '#F5F1E9', inStock: true, sku: 'NC-VSP-M-IVR' },
      { id: 'v3-l-ivory', size: 'L', color: 'Warm Ivory', colorHex: '#F5F1E9', inStock: true, sku: 'NC-VSP-L-IVR' },
      { id: 'v3-m-charcoal', size: 'M', color: 'Deep Charcoal', colorHex: '#252525', inStock: true, sku: 'NC-VSP-M-CHR' }
    ]
  },
  {
    id: 'nc-004',
    slug: 'strata-ribbed-knit-turtleneck',
    title: 'Strata Seamless Knit Turtleneck',
    subtitle: 'Zero-Waste 3D Wholegarment Ultra-Fine Knit',
    price: 16500,
    category: 'knitwear',
    collection: 'hyper-minimal',
    description: 'Engineered using Japanese computerized Wholegarment knitting machinery without a single seam. The ribbed micro-gauge variable density hugs contour lines while providing dynamic thermal ventilation.',
    details: [
      '100% Extra-fine Merino Wool 19.5 Micron',
      '3D seamless circular knit construction',
      'Graduated rib compression at cuffs and waist',
      'High-recovery architectural turtleneck collar'
    ],
    fabricComposition: '100% Zque-Certified Merino Wool',
    careInstructions: 'Hand wash cool with wool detergent, dry flat.',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85'
    ],
    has3DModel: true,
    modelType: 'knit',
    featured: false,
    isNewArrival: true,
    releaseYear: 2026,
    variants: [
      { id: 'v4-xs-black', size: 'XS', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-STR-XS-BLK' },
      { id: 'v4-s-black', size: 'S', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-STR-S-BLK' },
      { id: 'v4-m-black', size: 'M', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-STR-M-BLK' },
      { id: 'v4-l-black', size: 'L', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-STR-L-BLK' }
    ]
  },
  {
    id: 'nc-005',
    slug: 'chassis-wide-leg-trousers',
    title: 'Chassis Architectural Trousers',
    subtitle: 'Deep-Pleat Heavy Twill Wide Silhouette',
    price: 21000,
    category: 'trousers',
    collection: 'architectural',
    description: 'Voluminous wide-leg cut with dual forward knife pleats that maintain an unbroken vertical drape. Cut from crisp Italian wool gabardine with internal waistband curtaining and blind hems.',
    details: [
      'Heavy Italian Wool Gabardine with dense drape',
      'Double forward pleats with razor crease finish',
      'Extended tab closure with horn slider',
      'Viscose curtain waistband for anti-slip shirt retention'
    ],
    fabricComposition: '100% Worsted Wool Gabardine (410 GSM)',
    careInstructions: 'Dry clean only. Steam press along crease.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85'
    ],
    has3DModel: false,
    featured: true,
    isNewArrival: false,
    releaseYear: 2026,
    variants: [
      { id: 'v5-s-stone', size: 'S', color: 'Muted Stone', colorHex: '#B7B0A5', inStock: true, sku: 'NC-CHS-S-STN' },
      { id: 'v5-m-stone', size: 'M', color: 'Muted Stone', colorHex: '#B7B0A5', inStock: true, sku: 'NC-CHS-M-STN' },
      { id: 'v5-l-stone', size: 'L', color: 'Muted Stone', colorHex: '#B7B0A5', inStock: false, sku: 'NC-CHS-L-STN' },
      { id: 'v5-m-obsidian', size: 'M', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-CHS-M-BLK' }
    ]
  },
  {
    id: 'nc-006',
    slug: 'solis-column-bias-dress',
    title: 'Solis Column Bias Dress',
    subtitle: 'Heavyweight Heavy Silk Satin Fluid Evening Dress',
    price: 36000,
    category: 'dresses',
    collection: 'capsule-01',
    description: 'Sculpted on the bias for an effortless liquid contour that cascades gracefully across body lines. Subtle cowl neckline with an open back restrained by architectural silk cords.',
    details: [
      '100% 40 Momme Silk Crepe-backed Satin',
      'True bias cut for natural stretch and contouring',
      'Square back cut with weighted drape anchor',
      'French seam finishing throughout'
    ],
    fabricComposition: '100% Heavy Silk Crepe',
    careInstructions: 'Delicate dry clean only.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85'
    ],
    has3DModel: false,
    featured: true,
    isNewArrival: true,
    releaseYear: 2026,
    variants: [
      { id: 'v6-xs-bone', size: 'XS', color: 'Bone White', colorHex: '#FAFAF8', inStock: true, sku: 'NC-SOL-XS-WHT' },
      { id: 'v6-s-bone', size: 'S', color: 'Bone White', colorHex: '#FAFAF8', inStock: true, sku: 'NC-SOL-S-WHT' },
      { id: 'v6-m-bone', size: 'M', color: 'Bone White', colorHex: '#FAFAF8', inStock: true, sku: 'NC-SOL-M-WHT' },
      { id: 'v6-s-obsidian', size: 'S', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-SOL-S-BLK' }
    ]
  },
  {
    id: 'nc-007',
    slug: 'tectonic-cropped-down-puffer',
    title: 'Tectonic Cropped Modular Puffer',
    subtitle: '800 Fill Power Geocut Ripstop Puffer',
    price: 31500,
    category: 'outerwear',
    collection: 'monolith',
    description: 'An aggressive, cropped silhouette featuring geometric baffle zoning and 800+ fill power traceable goose down. Detachable hood and magnetic inner harness allow hand-free carriage when moving indoors.',
    details: [
      'Micro-ripstop nylon with dry touch matte finish',
      '800+ Fill Power Traceable Polish Goose Down (90/10)',
      'Internal technical shoulder carry strap harness',
      'Fleece-lined ergonomic magnetic welt pockets'
    ],
    fabricComposition: 'Shell: 100% Recycled Nylon; Fill: 90% Goose Down, 10% Feathers',
    careInstructions: 'Machine wash gentle cold with down dryer balls.',
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85'
    ],
    has3DModel: true,
    modelType: 'jacket',
    featured: false,
    isNewArrival: true,
    releaseYear: 2026,
    variants: [
      { id: 'v7-s-black', size: 'S', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-TEC-S-BLK' },
      { id: 'v7-m-black', size: 'M', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-TEC-M-BLK' },
      { id: 'v7-l-black', size: 'L', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-TEC-L-BLK' }
    ]
  },
  {
    id: 'nc-008',
    slug: 'paragon-box-leather-tote',
    title: 'Paragon Sculpted Leather Tote',
    subtitle: 'Full-Grain Box Calfskin Architectural Carryall',
    price: 24000,
    category: 'accessories',
    collection: 'hyper-minimal',
    description: 'Structured rectangular carryall shaped from vegetable-tanned French calfskin. Hand-burnished edges, microfiber suede lining, and a solid brushed brass magnetic clasp.',
    details: [
      'Full-grain French Box Calf leather with natural grain',
      'Matte palladium hardware with laser engraved monogram',
      'Dedicated padded 16-inch laptop chamber',
      'Reinforced base feet with structural edge piping'
    ],
    fabricComposition: '100% French Calfskin; Lining: Japanese Ultrasuede',
    careInstructions: 'Nourish with organic leather balm twice annually.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85'
    ],
    has3DModel: false,
    featured: true,
    isNewArrival: false,
    releaseYear: 2026,
    variants: [
      { id: 'v8-one-black', size: 'M', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-PRG-ONE-BLK' },
      { id: 'v8-one-stone', size: 'M', color: 'Muted Stone', colorHex: '#B7B0A5', inStock: true, sku: 'NC-PRG-ONE-STN' }
    ]
  },
  {
    id: 'nc-009',
    slug: 'prism-oversized-poplin-shirt',
    title: 'Prism Oversized Poplin Shirt',
    subtitle: 'Giza 87 Egyptian Cotton Crisp Architectural Shirt',
    price: 14500,
    category: 'tailoring',
    collection: 'hyper-minimal',
    description: 'An expansive modern poplin tunic with an exaggerated collar stand and dropped back hem. Spun from extra-long staple Egyptian Giza cotton for a crisp parchment hand feel.',
    details: [
      '100% Giza 87 Compact Yarn Cotton Poplin',
      'Mother of pearl buttons with lily-stitch attachment',
      'Double layered angular back yoke with box pleat',
      'Extended 3-button cuffs'
    ],
    fabricComposition: '100% Egyptian Giza Cotton',
    careInstructions: 'Machine wash 30°C delicate, hot iron with steam.',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=1200&q=85'
    ],
    has3DModel: false,
    featured: false,
    isNewArrival: true,
    releaseYear: 2026,
    variants: [
      { id: 'v9-s-bone', size: 'S', color: 'Bone White', colorHex: '#FAFAF8', inStock: true, sku: 'NC-PRM-S-WHT' },
      { id: 'v9-m-bone', size: 'M', color: 'Bone White', colorHex: '#FAFAF8', inStock: true, sku: 'NC-PRM-M-WHT' },
      { id: 'v9-l-bone', size: 'L', color: 'Bone White', colorHex: '#FAFAF8', inStock: true, sku: 'NC-PRM-L-WHT' }
    ]
  },
  {
    id: 'nc-010',
    slug: 'equinox-cashmere-crewneck',
    title: 'Equinox 12-Gauge Cashmere Crew',
    subtitle: 'Grade-A Inner Mongolian Cashmere Essential',
    price: 18900,
    category: 'knitwear',
    collection: 'capsule-01',
    description: 'Understated luxury distilled to purest proportion. Woven from 36mm long fibers of white cashmere, meticulously combed from the underbelly of Alashan goats.',
    details: [
      '100% Grade-A White Mongolian Cashmere (12-Gauge)',
      'Hand-linked neckline and rib borders',
      'Relaxed dropped shoulder silhouette',
      'Anti-pilling dense 2-ply spin'
    ],
    fabricComposition: '100% Mongolian Cashmere',
    careInstructions: 'Hand wash cold or gentle dry clean.',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85'
    ],
    has3DModel: true,
    modelType: 'knit',
    featured: false,
    isNewArrival: false,
    releaseYear: 2026,
    variants: [
      { id: 'v10-s-ivory', size: 'S', color: 'Warm Ivory', colorHex: '#F5F1E9', inStock: true, sku: 'NC-EQX-S-IVR' },
      { id: 'v10-m-ivory', size: 'M', color: 'Warm Ivory', colorHex: '#F5F1E9', inStock: true, sku: 'NC-EQX-M-IVR' },
      { id: 'v10-l-ivory', size: 'L', color: 'Warm Ivory', colorHex: '#F5F1E9', inStock: true, sku: 'NC-EQX-L-IVR' },
      { id: 'v10-m-charcoal', size: 'M', color: 'Deep Charcoal', colorHex: '#252525', inStock: true, sku: 'NC-EQX-M-CHR' }
    ]
  },
  {
    id: 'nc-011',
    slug: 'kinetic-cargo-trouser',
    title: 'Kinetic Bellows Cargo Trouser',
    subtitle: 'Technical Wool & CORDURA Flapped Pant',
    price: 22500,
    category: 'trousers',
    collection: 'architectural',
    description: 'Combining tailoring with utilitarian utility. Featuring origami-folded 3D cargo bellows pockets that expand flat against the thigh when empty, tapered with adjustable ankle cinch cords.',
    details: [
      'Wool & CORDURA Combat Wool Blend (Abrasion resistant)',
      'Articulated knee darts for unrestricted kinetic stride',
      'Concealed waterproof zip compartments inside bellows',
      'German Fidlock magnetic cargo pocket snaps'
    ],
    fabricComposition: '60% Merino Wool, 40% CORDURA Polyamide',
    careInstructions: 'Cold wash gentle cycle, line dry inside out.',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=85'
    ],
    has3DModel: false,
    featured: false,
    isNewArrival: true,
    releaseYear: 2026,
    variants: [
      { id: 'v11-s-black', size: 'S', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-KNC-S-BLK' },
      { id: 'v11-m-black', size: 'M', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-KNC-M-BLK' },
      { id: 'v11-l-black', size: 'L', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-KNC-L-BLK' }
    ]
  },
  {
    id: 'nc-012',
    slug: 'cinder-bonded-shearling-jacket',
    title: 'Cinder Bonded Shearling Jacket',
    subtitle: 'Spanish Merino Shearling Aviator with Obsidian Nappa',
    price: 52000,
    compareAtPrice: 58000,
    category: 'outerwear',
    collection: 'monolith',
    description: 'Handcrafted from dense, heavyweight Spanish merino sheepskin. The outer leather surface is finished with a crackled volcanic obsidian wax coating, contrasted against iron-gray plush natural wool interior.',
    details: [
      '100% Genuine Spanish Merino Shearling',
      'Waxed obsidian matte nappa leather exterior',
      'Dual collar throat latches with custom zinc alloy buckles',
      'Heavy-duty Swiss Raccagni two-way front zipper'
    ],
    fabricComposition: '100% Spanish Lamb Shearling',
    careInstructions: 'Specialized leather & fur care only.',
    images: [
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85'
    ],
    has3DModel: true,
    modelType: 'jacket',
    featured: true,
    isNewArrival: false,
    releaseYear: 2026,
    variants: [
      { id: 'v12-s-black', size: 'S', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-CND-S-BLK' },
      { id: 'v12-m-black', size: 'M', color: 'Obsidian Black', colorHex: '#101010', inStock: true, sku: 'NC-CND-M-BLK' },
      { id: 'v12-l-black', size: 'L', color: 'Obsidian Black', colorHex: '#101010', inStock: false, sku: 'NC-CND-L-BLK' }
    ]
  }
];

export const COLLECTIONS_DATA = [
  {
    slug: 'architectural',
    title: 'Architectural Silhouettes',
    subtitle: 'Precision proportions engineered for aerodynamic modern posture',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
    itemCount: 4,
    description: 'Angular storm flaps, knife-pleats, and bonded Japanese twill designed to build architectural presence.'
  },
  {
    slug: 'monolith',
    title: 'The Monolith Capsule',
    subtitle: 'Brutalist monolith forms in heavyweight wools and volcanic shearling',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    itemCount: 4,
    description: 'Monochromatic obsidian geometries created with zero exterior distractions and structural canvas tailoring.'
  },
  {
    slug: 'capsule-01',
    title: 'Capsule 01: Fluidity',
    subtitle: 'Cashmere wrap cloaks and liquid bias silk evening dresses',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    itemCount: 3,
    description: 'Seamless movement and dynamic drape reflecting natural anatomy and sculptural freedom.'
  },
  {
    slug: 'hyper-minimal',
    title: 'Hyper-Minimal Essentials',
    subtitle: 'Wholegarment seamless knits, crisp Giza poplin, and box calfskin',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85',
    itemCount: 3,
    description: 'Purified foundational pieces engineered with zero-waste machinery and pristine French calfskin.'
  }
];
