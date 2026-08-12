# Tatheer Chappalz (تطہیر چپل) - Premium Peshawari Chappal E-Commerce Platform

> **Handcrafted Heritage Footwear from Namak Mandi, Peshawar, Pakistan.**
> Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, Supabase PostgreSQL, Supabase Auth, Resend HTML Email Dispatcher, and Recharts.

---

## 🌟 Architecture & Key Features

### 🛍️ Customer Storefront & Luxury UI
- **Editorial Homepage**: Hero section with dual CTAs ("Shop Collection" & "Our Craft"), cobbler process breakdown, heritage story, curated collections grid, and bestsellers.
- **Product Catalog & Filters**: Full shop page with category filters, size selector (EU 39–46), color shade picker, price slider, and mobile bottom drawer filter.
- **Product Details**: Multi-angle image zoom modal, size swatches with live stock indicators, quantity counter, size guide modal, verified patron reviews, and related products grid.
- **Shopping Cart & Checkout**: Slide-out cart drawer, server-side stock validation, coupon engine (`PESHAWAR10`, `TATHEER15`), fast mobile-first single-page checkout (`/checkout`), and order receipt page (`/checkout/success/[orderNumber]`).

### 🗄️ Database Architecture & Supabase Integration
- **Relational PostgreSQL DDL (`supabase/schema.sql`)**: 17 PostgreSQL tables (`profiles`, `categories`, `products`, `product_images`, `product_variants`, `reviews`, `addresses`, `wishlists`, `wishlist_items`, `orders`, `order_items`, `coupons`, `coupon_usage`, `inventory_transactions`, `shipping_zones`, `shipping_rates`, `site_settings`).
- **Row Level Security (RLS)**: Public read policies for active products/variants/reviews and strict user ownership policies for profiles, wishlists, addresses, and orders.
- **Database Seed (`supabase/seed.sql`)**: Authentic Peshawari Chappals (Kaptan double sole, Zalmi suede, Norozi maroon, Royal calfskin), size variants, and coupons.

### 💳 Payment Provider Architecture (`src/lib/payments/...`)
- **Unified Interface (`IPaymentProvider`)**:
  - `CashOnDeliveryProvider`: Fully functional Cash on Delivery (COD).
  - `JazzCashProvider`: Signature checksum validation & gateway session.
  - `EasypaisaProvider`: Digital wallet authentication.
  - `StripeProvider`: Session & webhook verification.
- **Trusted Server Webhook**: Located at `/api/payments/webhook`. Payment secrets remain server-side.

### 📧 Resend Email Dispatcher (`src/lib/email/resendService.ts`)
- Automated HTML emails for Order Confirmation, Order Status Update, Shipping & Delivery Notifications, and Admin New Order Alerts (`orders@tatheerchappalz.com`).

### 🖥️ SaaS Admin Dashboard (`/admin`)
- **Server-Side Role Access Control (RBAC)**: Protects administrative routes for `super_admin`, `admin`, and `staff`.
- **Analytics Overview**: Stat cards (Revenue, Today's Sales, Orders, Customers, Low Stock) and Recharts visualizations.
- **Product & Variant CRUD**: Manage SKUs, sizes, colors, stock, pricing, and discounts.
- **Order Management & Printable Invoices**: Change fulfillment status (`Processing` → `Dispatched` → `Delivered`) and print thermal packing slips.
- **Inventory Audit**: Manual stock adjustments with mandatory reason logging in `inventory_transactions`.

---

## 🚀 Step-by-Step Production Deployment Guide

### Step 1: Database Migration on Supabase
1. Create a free or pro project at [Supabase.com](https://supabase.com).
2. Open the **SQL Editor** in the Supabase Dashboard.
3. Paste and run the DDL schema script from [`supabase/schema.sql`](file:///t:/Peshawri%20Chappal%20Store/supabase/schema.sql).
4. Paste and run the seed script from [`supabase/seed.sql`](file:///t:/Peshawri%20Chappal%20Store/supabase/seed.sql).

### Step 2: Configure Supabase Storage Buckets
1. In Supabase Dashboard, navigate to **Storage**.
2. Create 3 public buckets:
   - `product-images`
   - `category-images`
   - `brand-assets`
3. Set public read access policies on all 3 buckets.

### Step 3: Resend Email Setup
1. Create an API key at [Resend.com](https://resend.com).
2. Verify your domain (e.g. `tatheerchappalz.com`) or test using Resend default sender.

### Step 4: Environment Variables Setup
Copy `.env.example` to `.env.local` and populate:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your_key
```

### Step 5: Deploy to Vercel
1. Push this codebase to GitHub.
2. Import the repository in [Vercel.com](https://vercel.com).
3. Add the environment variables from `.env.local` to Vercel Project Settings.
4. Click **Deploy**.

---

## 🧪 Local Development & Verification Commands

```bash
# Install dependencies
npm install

# Run local dev server
npm run dev

# Run production build & TypeScript verification
npm run build
```

© 2026 Tatheer Chappalz. All Rights Reserved. Crafted with pride in Peshawar, Pakistan.
