-- ========================================================
-- TATHEER CHAPPALZ - SEED DATA FOR POSTGRESQL DATABASE
-- Authentic Peshawari Chappal products, categories & variants
-- ========================================================

-- SEED CATEGORIES
INSERT INTO public.categories (id, name, slug, description, image_url, display_order)
VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Kaptan Collection', 'kaptan-collection', 'Iconic shape, sharp front curve, hand-hammered double sole crafted for distinction.', '/images/kaptaan.png', 1),
  ('c2000000-0000-0000-0000-000000000002', 'Zalmi Collection', 'zalmi-collection', 'Contemporary elegance featuring premium suede and sleek leather finish for modern gentleman.', '/images/zalmi.png', 2),
  ('c3000000-0000-0000-0000-000000000003', 'Norozi Heritage', 'norozi-heritage', 'Traditional broad-strap design with hand-crafted rubber tire soles and vintage brass buckles.', '/images/norozi.png', 3),
  ('c4000000-0000-0000-0000-000000000004', 'Premium Calfskin', 'premium-calfskin', 'Luxury imported full-grain calf leather, hand-dyed and supple for maximum comfort.', '/images/hero.png', 4),
  ('c5000000-0000-0000-0000-000000000005', 'Traditional Leather', 'traditional-leather', 'Timeless Peshawari cobbler craft perfected over generations in Namak Mandi.', '/images/craft.png', 5)
ON CONFLICT (slug) DO NOTHING;

-- SEED PRODUCTS
INSERT INTO public.products (id, name, slug, category_id, price, discount_price, short_description, description, sole_type, leather_type, featured, bestseller, active, seo_title, seo_description)
VALUES
  ('p1000000-0000-0000-0000-000000000001', 'Kaptan Double Sole Dark Chocolate', 'kaptan-double-sole-dark-chocolate', 'c1000000-0000-0000-0000-000000000001', 14500.00, 12999.00, 'Handcrafted in Peshawar using full-grain dark chocolate leather with a signature double recycled tire sole.', 'The Kaptan Double Sole is the crowning jewel of Tatheer Chappalz. Master artisans in Peshawar spend over 14 hours hand-cutting, shaping, and stitching each pair.', 'Double Tire Rubber Sole', 'Full-Grain Cowhide', true, true, true, 'Kaptan Double Sole Dark Chocolate - Tatheer Chappalz', 'Buy authentic handmade Kaptan double sole Peshawari chappal in dark chocolate brown leather.'),
  ('p2000000-0000-0000-0000-000000000002', 'Zalmi Velvet-Suede Camel', 'zalmi-velvet-suede-camel', 'c2000000-0000-0000-0000-000000000002', 15800.00, 13999.00, 'Refined suede texture paired with soft leather lining, designed for festive occasions.', 'The Zalmi Suede edition infuses contemporary elegance into traditional Peshawar silhouette. Soft camel suede top with sweat-resistant inner lining.', 'Single Tread Tyre Sole', 'Suede Leather', false, true, true, 'Zalmi Velvet Suede Camel - Tatheer Chappalz', 'Shop luxury camel suede Zalmi Peshawari chappal online.'),
  ('p3000000-0000-0000-0000-000000000003', 'Norozi Heavy Buckle Maroon', 'norozi-heavy-buckle-maroon', 'c3000000-0000-0000-0000-000000000003', 16999.00, 14999.00, 'Authentic Norozi shape with heavy broad strap, antique brass buckle, and hand-braided trim.', 'Commanding respect with every step, the Norozi Heavy Buckle features broad leather straps hand-stitched by senior master cobblers in Peshawar.', 'Heavy Recycled Tyre Sole', 'Buff Leather', true, false, true, 'Norozi Heavy Buckle Maroon - Tatheer Chappalz', 'Authentic deep maroon Norozi Peshawari chappal with brass buckle.'),
  ('p4000000-0000-0000-0000-000000000004', 'Royal Calfskin Atelier Tan', 'royal-calfskin-atelier-tan', 'c4000000-0000-0000-0000-000000000004', 18500.00, 16999.00, 'Ultra-supple full-grain calf leather with gold embroidered inner brand hallmark.', 'Handcrafted exclusively from imported full-grain calfskin, the Royal Atelier edition offers unparalleled softness and elegance.', 'Luxury Moulded Rubber Sole', 'Full-Grain Calfskin', true, true, true, 'Royal Calfskin Atelier Tan - Tatheer Chappalz', 'Premium imported calfskin tan Peshawari footwear.'),
  ('p5000000-0000-0000-0000-000000000005', 'Classic Namak Mandi Black', 'classic-namak-mandi-black', 'c5000000-0000-0000-0000-000000000005', 11999.00, 9999.00, 'The authentic everyday Peshawari Chappal crafted according to 100-year-old traditional patterns.', 'Simple, unyielding, and iconic. The Classic Namak Mandi Black is built for daily wear.', 'Standard Tire Sole', 'Harness Leather', false, true, true, 'Classic Namak Mandi Black - Tatheer Chappalz', 'Classic black leather Peshawari chappal direct from Namak Mandi.')
ON CONFLICT (slug) DO NOTHING;

-- SEED PRODUCT VARIANTS (Size 39 to 46 for Kaptan Double Sole)
INSERT INTO public.product_variants (product_id, size, color_name, color_hex, sku, stock, active)
VALUES
  ('p1000000-0000-0000-0000-000000000001', 39, 'Dark Chocolate', '#27170B', 'TC-KAP-DC-39', 8, true),
  ('p1000000-0000-0000-0000-000000000001', 40, 'Dark Chocolate', '#27170B', 'TC-KAP-DC-40', 12, true),
  ('p1000000-0000-0000-0000-000000000001', 41, 'Dark Chocolate', '#27170B', 'TC-KAP-DC-41', 15, true),
  ('p1000000-0000-0000-0000-000000000001', 42, 'Dark Chocolate', '#27170B', 'TC-KAP-DC-42', 20, true),
  ('p1000000-0000-0000-0000-000000000001', 43, 'Dark Chocolate', '#27170B', 'TC-KAP-DC-43', 18, true),
  ('p1000000-0000-0000-0000-000000000001', 44, 'Dark Chocolate', '#27170B', 'TC-KAP-DC-44', 10, true),
  ('p1000000-0000-0000-0000-000000000001', 45, 'Dark Chocolate', '#27170B', 'TC-KAP-DC-45', 0, true),
  ('p1000000-0000-0000-0000-000000000001', 46, 'Dark Chocolate', '#27170B', 'TC-KAP-DC-46', 6, true)
ON CONFLICT (sku) DO NOTHING;

-- SEED COUPONS
INSERT INTO public.coupons (code, discount_percent, active, valid_until)
VALUES
  ('PESHAWAR10', 10, true, NOW() + INTERVAL '1 year'),
  ('TATHEER15', 15, true, NOW() + INTERVAL '1 year')
ON CONFLICT (code) DO NOTHING;
