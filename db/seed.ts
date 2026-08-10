import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log('🌱 Seeding AYANFE CLOTHIERS database...');

  // ─── Categories ──────────────────────────────────────────────────────────────
  console.log('📂 Creating categories...');
  const insertedCategories = await db
    .insert(schema.categories)
    .values([
      {
        name: 'Bespoke Suits',
        slug: 'bespoke-suits',
        description:
          'Handcrafted suits tailored to your exact measurements, crafted from the finest fabrics by our master tailors.',
        imageUrl: '/images/categories/bespoke-suits.jpg',
        displayOrder: 1,
      },
      {
        name: 'Kaftans',
        slug: 'kaftans',
        description:
          'Luxurious kaftans blending traditional craftsmanship with contemporary elegance for every occasion.',
        imageUrl: '/images/categories/kaftans.jpg',
        displayOrder: 2,
      },
      {
        name: 'Agbada',
        slug: 'agbada',
        description:
          'Majestic Agbada collections that celebrate African royalty with rich embroidery and premium fabrics.',
        imageUrl: '/images/categories/agbada.jpg',
        displayOrder: 3,
      },
      {
        name: 'Wedding Attires',
        slug: 'wedding-attires',
        description:
          'Complete wedding attire packages for the bride, groom, and entire wedding party.',
        imageUrl: '/images/categories/wedding.jpg',
        displayOrder: 4,
      },
      {
        name: 'Monogram Service',
        slug: 'monogram',
        description:
          'Personalize your garments with bespoke monograms — your initials, artfully embroidered.',
        imageUrl: '/images/categories/monogram.jpg',
        displayOrder: 5,
      },
    ])
    .returning();

  const catMap = Object.fromEntries(insertedCategories.map((c) => [c.slug, c.id]));

  // ─── Products — Bespoke Suits ─────────────────────────────────────────────
  console.log('👔 Creating bespoke suit products...');
  await db.insert(schema.products).values([
    {
      name: 'The Royal Onyx Suit',
      slug: 'royal-onyx-suit',
      shortDescription: 'Midnight black wool suit with satin lapels. A statement of power.',
      description:
        'The Royal Onyx is our flagship bespoke suit — constructed from 180-thread-count Super 150s wool sourced from Italy. Features hand-stitched satin peak lapels, a surgically precise cut, and your choice of monogram. Delivery in 21 days from your fitting appointment.',
      price: '285000',
      comparePrice: '350000',
      categoryId: catMap['bespoke-suits'],
      images: ['/images/products/royal-onyx-1.jpg', '/images/products/royal-onyx-2.jpg'],
      tags: ['suit', 'bespoke', 'formal', 'black', 'wool'],
      materials: ['Super 150s Italian Wool', 'Silk lining', 'Mother-of-pearl buttons'],
      availableSizes: ['36', '38', '40', '42', '44', '46', '48'],
      availableColors: [
        { name: 'Midnight Black', hex: '#0a0a0a' },
        { name: 'Charcoal Grey', hex: '#36454f' },
        { name: 'Navy Blue', hex: '#1b2a4a' },
      ],
      stock: 20,
      isFeatured: true,
      isNew: true,
      isBespoke: true,
      leadTimeDays: 21,
    },
    {
      name: 'The Ivory Senator Suit',
      slug: 'ivory-senator-suit',
      shortDescription: 'Crisp ivory linen blend — effortlessly commanding.',
      description:
        'Born for summer ceremonies and state events, The Ivory Senator is crafted from a premium Irish linen blend that breathes beautifully in Nigerian heat. Features contrast stitching and your choice of pocket square fabric.',
      price: '195000',
      comparePrice: '240000',
      categoryId: catMap['bespoke-suits'],
      images: ['/images/products/ivory-senator-1.jpg'],
      tags: ['suit', 'bespoke', 'formal', 'ivory', 'linen'],
      materials: ['Irish Linen Blend', 'Cotton lining', 'Brass buttons'],
      availableSizes: ['36', '38', '40', '42', '44', '46'],
      availableColors: [
        { name: 'Ivory White', hex: '#fffff0' },
        { name: 'Champagne', hex: '#f7e7ce' },
        { name: 'Cream', hex: '#faf0e6' },
      ],
      stock: 15,
      isFeatured: true,
      isBespoke: true,
      leadTimeDays: 18,
    },
    {
      name: 'The Cobalt Peak Suit',
      slug: 'cobalt-peak-suit',
      shortDescription: 'Bold cobalt blue with gold buttons. Make your entrance.',
      description:
        'The Cobalt Peak breaks convention. Crafted from premium gabardine with hand-sewn peak lapels in a striking cobalt blue. Gold-toned buttons and a crimson silk lining make this a suit for those who refuse to go unnoticed.',
      price: '220000',
      categoryId: catMap['bespoke-suits'],
      images: ['/images/products/cobalt-peak-1.jpg'],
      tags: ['suit', 'bespoke', 'formal', 'blue', 'gabardine'],
      materials: ['Italian Gabardine', 'Crimson silk lining', 'Gold buttons'],
      availableSizes: ['36', '38', '40', '42', '44'],
      availableColors: [
        { name: 'Cobalt Blue', hex: '#0047ab' },
        { name: 'Royal Purple', hex: '#7b1fa2' },
        { name: 'Bottle Green', hex: '#006a4e' },
      ],
      stock: 12,
      isFeatured: false,
      isBespoke: true,
      leadTimeDays: 21,
    },
  ]);

  // ─── Products — Kaftans ───────────────────────────────────────────────────
  console.log('👘 Creating kaftan products...');
  await db.insert(schema.products).values([
    {
      name: 'The Sovereign Silk Kaftan',
      slug: 'sovereign-silk-kaftan',
      shortDescription: 'Floor-length silk kaftan with hand-embroidered neckline.',
      description:
        'Draped in pure silk with intricate hand-embroidered patterns at the neckline and cuffs, The Sovereign Kaftan commands every room it enters. Available in our signature royal purple and a curated selection of jewel tones.',
      price: '85000',
      comparePrice: '110000',
      categoryId: catMap['kaftans'],
      images: ['/images/products/sovereign-kaftan-1.jpg', '/images/products/sovereign-kaftan-2.jpg'],
      tags: ['kaftan', 'silk', 'embroidered', 'premium'],
      materials: ['Pure Silk', 'Gold thread embroidery'],
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      availableColors: [
        { name: 'Royal Purple', hex: '#7b1fa2' },
        { name: 'Deep Emerald', hex: '#1b4332' },
        { name: 'Midnight Navy', hex: '#1b2a4a' },
        { name: 'Burnt Gold', hex: '#c9a84c' },
      ],
      stock: 30,
      isFeatured: true,
      isNew: true,
      leadTimeDays: 10,
    },
    {
      name: 'The Ankara Heritage Kaftan',
      slug: 'ankara-heritage-kaftan',
      shortDescription: 'Bold Ankara print kaftan — tradition meets contemporary.',
      description:
        'Woven from authentic Ankara fabric sourced directly from West African mills, this kaftan celebrates our cultural heritage. Each piece is unique — the print pattern varies slightly, making yours truly one-of-a-kind.',
      price: '45000',
      comparePrice: '60000',
      categoryId: catMap['kaftans'],
      images: ['/images/products/ankara-kaftan-1.jpg'],
      tags: ['kaftan', 'ankara', 'cultural', 'print'],
      materials: ['Authentic Ankara Cotton', 'Satin trim'],
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      availableColors: [
        { name: 'Multi-Print Classic', hex: '#c9a84c' },
        { name: 'Blue Wax Print', hex: '#1b2a4a' },
        { name: 'Red Earth Print', hex: '#8b2500' },
      ],
      stock: 50,
      isFeatured: true,
      leadTimeDays: 7,
    },
    {
      name: 'The Linen Breeze Kaftan',
      slug: 'linen-breeze-kaftan',
      shortDescription: 'Relaxed linen kaftan — effortless everyday luxury.',
      description:
        'Perfect for casual elegance, The Linen Breeze Kaftan is crafted from premium stonewashed linen. Lightweight, breathable, and infinitely stylish — transition from daytime to evening with ease.',
      price: '35000',
      categoryId: catMap['kaftans'],
      images: ['/images/products/linen-kaftan-1.jpg'],
      tags: ['kaftan', 'linen', 'casual', 'everyday'],
      materials: ['Stonewashed Premium Linen', 'Cotton lining'],
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      availableColors: [
        { name: 'Natural Cream', hex: '#faf8f5' },
        { name: 'Sand Beige', hex: '#c2b280' },
        { name: 'Sage Green', hex: '#87a96b' },
        { name: 'Sky Blue', hex: '#87ceeb' },
      ],
      stock: 60,
      isFeatured: false,
      isNew: true,
      leadTimeDays: 7,
    },
  ]);

  // ─── Products — Agbada ────────────────────────────────────────────────────
  console.log('🌟 Creating Agbada products...');
  await db.insert(schema.products).values([
    {
      name: 'The Imperial Gold Agbada',
      slug: 'imperial-gold-agbada',
      shortDescription: 'Three-piece Agbada with extensive gold embroidery. Royalty personified.',
      description:
        'The Imperial Gold Agbada is our most revered piece — a full three-piece set (grand flowing robe, inner shirt, trousers) adorned with intricate gold aso-oke weaving and machine-embroidered royal patterns. Designed for weddings, coronations, and milestone celebrations.',
      price: '350000',
      comparePrice: '450000',
      categoryId: catMap['agbada'],
      images: ['/images/products/imperial-agbada-1.jpg', '/images/products/imperial-agbada-2.jpg'],
      tags: ['agbada', 'embroidered', 'gold', 'three-piece', 'royal'],
      materials: ['Aso-oke fabric', 'Gold thread embroidery', 'Premium inner linen'],
      availableSizes: ['M', 'L', 'XL', 'XXL', 'XXXL'],
      availableColors: [
        { name: 'Gold & Ivory', hex: '#c9a84c' },
        { name: 'Purple & Gold', hex: '#7b1fa2' },
        { name: 'White & Gold', hex: '#faf8f5' },
        { name: 'Navy & Silver', hex: '#1b2a4a' },
      ],
      stock: 15,
      isFeatured: true,
      isNew: false,
      isBespoke: true,
      leadTimeDays: 30,
    },
    {
      name: 'The Senate Agbada',
      slug: 'senate-agbada',
      shortDescription: 'Classic two-piece Agbada with hand-stitched embroidery.',
      description:
        'Commanding and dignified, The Senate Agbada features meticulous hand-stitched embroidery along the neckline and sleeves. A two-piece set crafted from premium damask fabric — perfect for high-society events.',
      price: '175000',
      comparePrice: '210000',
      categoryId: catMap['agbada'],
      images: ['/images/products/senate-agbada-1.jpg'],
      tags: ['agbada', 'damask', 'embroidered', 'two-piece'],
      materials: ['Premium Damask', 'Cotton inner', 'Metallic thread'],
      availableSizes: ['M', 'L', 'XL', 'XXL', 'XXXL'],
      availableColors: [
        { name: 'Royal Blue', hex: '#2166ac' },
        { name: 'Forest Green', hex: '#1b4332' },
        { name: 'Maroon', hex: '#6d0000' },
        { name: 'Charcoal', hex: '#36454f' },
      ],
      stock: 20,
      isFeatured: true,
      isBespoke: true,
      leadTimeDays: 21,
    },
    {
      name: 'The Festive Brocade Agbada',
      slug: 'festive-brocade-agbada',
      shortDescription: 'Vibrant brocade Agbada for festive celebrations.',
      description:
        'Woven in rich brocade fabric with self-embossed patterns, The Festive Brocade Agbada brings color and celebration to any gathering. A full three-piece set that photographs beautifully.',
      price: '145000',
      categoryId: catMap['agbada'],
      images: ['/images/products/brocade-agbada-1.jpg'],
      tags: ['agbada', 'brocade', 'festive', 'colorful'],
      materials: ['Premium Brocade', 'Satin inner', 'Gold trim'],
      availableSizes: ['M', 'L', 'XL', 'XXL'],
      availableColors: [
        { name: 'Crimson & Gold', hex: '#dc143c' },
        { name: 'Violet & Silver', hex: '#7b1fa2' },
        { name: 'Emerald & Gold', hex: '#1b4332' },
      ],
      stock: 18,
      isFeatured: false,
      isNew: true,
      leadTimeDays: 21,
    },
  ]);

  // ─── Wedding Packages ─────────────────────────────────────────────────────
  console.log('💍 Creating wedding packages...');
  await db.insert(schema.weddingPackages).values([
    {
      name: 'The Intimate Package',
      slug: 'intimate-package',
      description: 'Perfect for intimate ceremonies up to 20 guests.',
      price: '450000',
      comparePrice: '600000',
      includes: [
        "Groom's bespoke 3-piece suit",
        "Bride's custom gown consultation",
        '2 groomsmen matching agbada',
        '2 bridesmaids matching kaftan',
        'Monogram service for groom',
        'Fitting appointments (3 sessions)',
        'Alterations included',
      ],
      imageUrl: '/images/wedding/intimate-package.jpg',
      isPopular: false,
      displayOrder: 1,
    },
    {
      name: 'The Grand Package',
      slug: 'grand-package',
      description: 'The complete experience for a grand celebration.',
      price: '850000',
      comparePrice: '1200000',
      includes: [
        "Groom's bespoke 3-piece suit",
        "Bride's custom gown consultation & creation",
        '4 groomsmen matching agbada or suits',
        '4 bridesmaids matching kaftan or dresses',
        'Full wedding party coordination',
        'Monogram service for groom & bride',
        'Fitting appointments (unlimited)',
        'Emergency alteration on wedding day',
        'Personal stylist consultation',
      ],
      imageUrl: '/images/wedding/grand-package.jpg',
      isPopular: true,
      displayOrder: 2,
    },
    {
      name: 'The Royal Package',
      slug: 'royal-package',
      description: 'For the wedding that demands nothing less than legendary.',
      price: '1500000',
      comparePrice: '2000000',
      includes: [
        'Everything in The Grand Package',
        'Traditional engagement ceremony attires',
        'Wedding reception change outfits',
        'Customized family asoebi coordination',
        'Up to 10 groomsmen & 10 bridesmaids',
        'Dedicated personal stylist for 3 months',
        'Monogram service for entire wedding party',
        'Post-wedding preservation service',
        'VIP fitting suite access',
      ],
      imageUrl: '/images/wedding/royal-package.jpg',
      isPopular: false,
      displayOrder: 3,
    },
  ]);

  // ─── Products — Wedding Attires (individual) ──────────────────────────────
  console.log('👗 Creating wedding attire products...');
  await db.insert(schema.products).values([
    {
      name: 'The Bridal Ivory Gown',
      slug: 'bridal-ivory-gown',
      shortDescription: 'Hand-beaded ivory gown — your perfect wedding moment.',
      description:
        'An heirloom-quality bridal gown hand-beaded by our master artisans. Features a cathedral train, sweetheart neckline, and over 2,000 individually placed Swarovski crystals. Each gown requires 4 fitting appointments and 6 weeks to complete.',
      price: '450000',
      comparePrice: '600000',
      categoryId: catMap['wedding-attires'],
      images: ['/images/products/bridal-gown-1.jpg', '/images/products/bridal-gown-2.jpg'],
      tags: ['wedding', 'bride', 'gown', 'beaded', 'formal'],
      materials: ['French lace', 'Satin underlining', 'Swarovski crystals', 'Cathedral train fabric'],
      availableSizes: ['2', '4', '6', '8', '10', '12', '14', '16'],
      availableColors: [
        { name: 'Ivory', hex: '#fffff0' },
        { name: 'Champagne', hex: '#f7e7ce' },
        { name: 'Blush Pink', hex: '#ffb6c1' },
      ],
      stock: 5,
      isFeatured: true,
      isBespoke: true,
      leadTimeDays: 42,
    },
    {
      name: "The Groom's Ceremonial Suit",
      slug: 'grooms-ceremonial-suit',
      shortDescription: 'Bespoke groom suit with custom lining and monogram.',
      description:
        "Built for the most important day of your life. The Groom's Ceremonial Suit is crafted from finest wool-silk blend, featuring a custom hand-stitched monogram inside the breast pocket and a lining selected to match your wedding color palette.",
      price: '320000',
      comparePrice: '400000',
      categoryId: catMap['wedding-attires'],
      images: ['/images/products/groom-suit-1.jpg'],
      tags: ['wedding', 'groom', 'suit', 'bespoke'],
      materials: ['Wool-silk blend', 'Custom lining', 'Horn buttons'],
      availableSizes: ['36', '38', '40', '42', '44', '46', '48'],
      availableColors: [
        { name: 'Ivory White', hex: '#fffff0' },
        { name: 'Charcoal Grey', hex: '#36454f' },
        { name: 'Midnight Navy', hex: '#1b2a4a' },
        { name: 'Royal Purple', hex: '#7b1fa2' },
      ],
      stock: 10,
      isFeatured: true,
      isBespoke: true,
      leadTimeDays: 28,
    },
    {
      name: 'The Asoebi Ensemble',
      slug: 'asoebi-ensemble',
      shortDescription: 'Coordinated asoebi for wedding party — minimum 4 sets.',
      description:
        'Coordinate your entire wedding party in matching asoebi. Choose from our curated fabric collections, and we will cut, stitch, and deliver perfectly matched attires for all your bridesmaids, groomsmen, and family members.',
      price: '65000',
      categoryId: catMap['wedding-attires'],
      images: ['/images/products/asoebi-1.jpg'],
      tags: ['wedding', 'asoebi', 'group', 'coordination'],
      materials: ['Premium aso-ebi fabric', 'Varied per selection'],
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      availableColors: [
        { name: 'Consult with Stylist', hex: '#c9a84c' },
      ],
      stock: 100,
      isFeatured: false,
      leadTimeDays: 21,
    },
  ]);

  // ─── Products — Monogram ──────────────────────────────────────────────────
  console.log('✏️ Creating monogram service products...');
  await db.insert(schema.products).values([
    {
      name: 'Classic Monogram Service',
      slug: 'classic-monogram-service',
      shortDescription: 'Elegant 3-letter monogram embroidered on your garment.',
      description:
        'Our Classic Monogram Service adds your personal initials to any garment — shirt collar, cuff, chest pocket, or hem. Choose from 12 font styles and a spectrum of thread colors. Perfect as a gift or for elevating your wardrobe.',
      price: '15000',
      comparePrice: '20000',
      categoryId: catMap['monogram'],
      images: ['/images/products/monogram-classic-1.jpg'],
      tags: ['monogram', 'personalization', 'embroidery', 'service'],
      materials: ['Metallic thread', 'Cotton thread', 'Silk thread'],
      availableSizes: ['One Size'],
      availableColors: [
        { name: 'Gold Thread', hex: '#c9a84c' },
        { name: 'Silver Thread', hex: '#c0c0c0' },
        { name: 'White Thread', hex: '#ffffff' },
        { name: 'Navy Thread', hex: '#1b2a4a' },
        { name: 'Black Thread', hex: '#0a0a0a' },
      ],
      stock: 999,
      isFeatured: true,
      isNew: false,
      leadTimeDays: 5,
    },
    {
      name: 'Premium Crest Monogram',
      slug: 'premium-crest-monogram',
      shortDescription: 'Embossed family crest or custom logo on premium garments.',
      description:
        'Elevate any garment with a custom embossed family crest, logo, or elaborate initial design. Our Premium Crest service uses the finest metallic threads with 3D raised embroidery for a truly bespoke, heirloom-quality result.',
      price: '35000',
      comparePrice: '50000',
      categoryId: catMap['monogram'],
      images: ['/images/products/monogram-premium-1.jpg'],
      tags: ['monogram', 'crest', 'premium', 'embroidery', '3D'],
      materials: ['Metallic thread', 'Raised 3D embroidery base'],
      availableSizes: ['One Size'],
      availableColors: [
        { name: 'Gold Metallic', hex: '#c9a84c' },
        { name: 'Platinum Silver', hex: '#e5e4e2' },
        { name: 'Rose Gold', hex: '#b76e79' },
      ],
      stock: 999,
      isFeatured: true,
      isNew: true,
      leadTimeDays: 10,
    },
  ]);

  // ─── Admin User ───────────────────────────────────────────────────────────
  console.log('👑 Creating admin user...');
  const { hash } = await import('bcryptjs');
  const passwordHash = await hash('AyanfeAdmin2024!', 12);

  await db.insert(schema.users).values({
    name: 'Ayanfe Admin',
    email: 'admin@ayanfeclothiers.com',
    passwordHash,
    role: 'admin',
  });

  console.log('✅ Seed complete! AYANFE CLOTHIERS database is ready.');
  console.log('\n🔑 Admin credentials:');
  console.log('   Email: admin@ayanfeclothiers.com');
  console.log('   Password: AyanfeAdmin2024!');

  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
