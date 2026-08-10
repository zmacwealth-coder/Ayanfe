import {
  pgTable,
  text,
  integer,
  timestamp,
  decimal,
  uuid,
  boolean,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ─── Enums ────────────────────────────────────────────────────────────────────
export const userRoleEnum = pgEnum('user_role', ['user', 'admin']);
export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
]);
export const monogramStatusEnum = pgEnum('monogram_status', [
  'pending',
  'reviewing',
  'approved',
  'in_production',
  'completed',
  'cancelled',
]);
export const bookingStatusEnum = pgEnum('booking_status', [
  'pending',
  'confirmed',
  'completed',
  'cancelled',
]);

// ─── Users ────────────────────────────────────────────────────────────────────
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash'),
  role: userRoleEnum('role').default('user').notNull(),
  avatar: text('avatar'),
  phone: text('phone'),
  emailVerified: timestamp('email_verified'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Accounts (NextAuth OAuth) ────────────────────────────────────────────────
export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at'),
  tokenType: text('token_type'),
  scope: text('scope'),
  idToken: text('id_token'),
  sessionState: text('session_state'),
});

// ─── Sessions (NextAuth) ──────────────────────────────────────────────────────
export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionToken: text('session_token').notNull().unique(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
});

// ─── Categories ───────────────────────────────────────────────────────────────
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  imageUrl: text('image_url'),
  displayOrder: integer('display_order').default(0),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Products ─────────────────────────────────────────────────────────────────
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  shortDescription: text('short_description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  comparePrice: decimal('compare_price', { precision: 10, scale: 2 }),
  categoryId: uuid('category_id')
    .notNull()
    .references(() => categories.id),
  images: jsonb('images').$type<string[]>().default([]),
  tags: jsonb('tags').$type<string[]>().default([]),
  materials: jsonb('materials').$type<string[]>().default([]),
  availableSizes: jsonb('available_sizes').$type<string[]>().default([]),
  availableColors: jsonb('available_colors')
    .$type<{ name: string; hex: string }[]>()
    .default([]),
  stock: integer('stock').default(0).notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  isNew: boolean('is_new').default(false).notNull(),
  isBespoke: boolean('is_bespoke').default(false).notNull(),
  leadTimeDays: integer('lead_time_days').default(14),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Cart Items ───────────────────────────────────────────────────────────────
export const cartItems = pgTable('cart_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  sessionId: text('session_id'), // For guest users
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').default(1).notNull(),
  selectedSize: text('selected_size'),
  selectedColor: text('selected_color'),
  customizations: jsonb('customizations').$type<Record<string, string>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Wishlist Items ───────────────────────────────────────────────────────────
export const wishlistItems = pgTable('wishlist_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  addedAt: timestamp('added_at').defaultNow().notNull(),
});

// ─── Addresses ────────────────────────────────────────────────────────────────
export const addresses = pgTable('addresses', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  addressLine1: text('address_line1').notNull(),
  addressLine2: text('address_line2'),
  city: text('city').notNull(),
  state: text('state').notNull(),
  country: text('country').default('Nigeria').notNull(),
  isDefault: boolean('is_default').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Orders ───────────────────────────────────────────────────────────────────
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderNumber: text('order_number').notNull().unique(),
  userId: uuid('user_id').references(() => users.id),
  guestEmail: text('guest_email'),
  status: orderStatusEnum('status').default('pending').notNull(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  discount: decimal('discount', { precision: 10, scale: 2 }).default('0'),
  shippingCost: decimal('shipping_cost', { precision: 10, scale: 2 }).default('0'),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  shippingAddress: jsonb('shipping_address').$type<{
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
  }>(),
  paymentMethod: text('payment_method'),
  paymentReference: text('payment_reference'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Order Items ──────────────────────────────────────────────────────────────
export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id),
  productName: text('product_name').notNull(),
  productImage: text('product_image'),
  quantity: integer('quantity').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  selectedSize: text('selected_size'),
  selectedColor: text('selected_color'),
  customizations: jsonb('customizations').$type<Record<string, string>>(),
});

// ─── Monogram Requests ────────────────────────────────────────────────────────
export const monogramRequests = pgTable('monogram_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  guestEmail: text('guest_email'),
  guestName: text('guest_name'),
  guestPhone: text('guest_phone'),
  initials: text('initials').notNull(), // e.g. "A.O.L"
  fullName: text('full_name').notNull(),
  garmentType: text('garment_type').notNull(), // shirt, kaftan, agbada, etc.
  fabric: text('fabric'),
  primaryColor: text('primary_color'),
  secondaryColor: text('secondary_color'),
  fontSize: text('font_size').default('medium'),
  fontStyle: text('font_style').default('classic'),
  placement: text('placement').default('chest'), // chest, cuff, collar
  specialNotes: text('special_notes'),
  status: monogramStatusEnum('status').default('pending').notNull(),
  estimatedPrice: decimal('estimated_price', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── Wedding Packages ─────────────────────────────────────────────────────────
export const weddingPackages = pgTable('wedding_packages', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  comparePrice: decimal('compare_price', { precision: 10, scale: 2 }),
  includes: jsonb('includes').$type<string[]>().default([]),
  imageUrl: text('image_url'),
  isPopular: boolean('is_popular').default(false),
  displayOrder: integer('display_order').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Consultation Bookings ────────────────────────────────────────────────────
export const consultationBookings = pgTable('consultation_bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  guestEmail: text('guest_email'),
  guestName: text('guest_name').notNull(),
  guestPhone: text('guest_phone').notNull(),
  serviceType: text('service_type').notNull(), // bespoke, wedding, monogram, general
  preferredDate: text('preferred_date'),
  preferredTime: text('preferred_time'),
  message: text('message'),
  status: bookingStatusEnum('status').default('pending').notNull(),
  packageId: uuid('package_id').references(() => weddingPackages.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── Verification Tokens (NextAuth) ───────────────────────────────────────────
export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull().unique(),
  expires: timestamp('expires').notNull(),
});

// ─── Relations ────────────────────────────────────────────────────────────────
export const usersRelations = relations(users, ({ many }) => ({
  cartItems: many(cartItems),
  wishlistItems: many(wishlistItems),
  orders: many(orders),
  monogramRequests: many(monogramRequests),
  addresses: many(addresses),
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  cartItems: many(cartItems),
  wishlistItems: many(wishlistItems),
  orderItems: many(orderItems),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
}));
