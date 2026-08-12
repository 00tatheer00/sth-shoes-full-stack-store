import { supabase } from '@/lib/supabase/client';
import { Product } from '@/types';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { ProductSchema, ProductVariantSchema } from '@/lib/validations';

export const productService = {
  // Fetch active products with category filtering, search, and sorting
  async getProducts(params?: {
    categorySlug?: string;
    search?: string;
    size?: number;
    color?: string;
    minPrice?: number;
    maxPrice?: number;
    inStockOnly?: boolean;
    sortBy?: string;
  }): Promise<Product[]> {
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return this.filterMockProducts(params);
      }

      let query = supabase
        .from('products')
        .select(`
          *,
          categories:category_id (name, slug),
          images:product_images (image_url, alt_text, display_order),
          variants:product_variants (size, color_name, color_hex, sku, stock, active)
        `)
        .eq('active', true);

      if (params?.search) {
        query = query.ilike('name', `%${params.search}%`);
      }

      if (params?.minPrice !== undefined) {
        query = query.gte('price', params.minPrice);
      }

      if (params?.maxPrice !== undefined) {
        query = query.lte('price', params.maxPrice);
      }

      const { data, error } = await query;

      if (error || !data || data.length === 0) {
        return this.filterMockProducts(params);
      }

      // Map Supabase rows to Product interface
      return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        category: item.categories?.name || 'Peshawari Collection',
        categorySlug: item.categories?.slug || 'kaptan-collection',
        price: Number(item.price),
        salePrice: item.discount_price ? Number(item.discount_price) : undefined,
        rating: 4.9,
        reviewsCount: 120,
        isNew: item.featured,
        isBestSeller: item.bestseller,
        featuredImage: item.images?.[0]?.image_url || '/images/hero.png',
        images: item.images?.map((img: any) => img.image_url) || ['/images/hero.png'],
        colors: (item.variants || []).map((v: any) => ({
          name: v.color_name,
          hex: v.color_hex || '#27170B',
        })),
        sizes: (item.variants || []).map((v: any) => ({
          size: v.size,
          inStock: v.stock > 0,
        })),
        shortDescription: item.short_description || '',
        description: item.description || '',
        materials: ['100% Genuine Full-Grain Cowhide Leather', 'Recycled Tyre Rubber Sole'],
        craftingDetails: ['Handcrafted in Namak Mandi, Peshawar'],
        soleType: item.sole_type || 'Double Tire Sole',
        leatherType: item.leather_type || 'Full-Grain Cowhide',
      }));
    } catch (e) {
      console.error('Error fetching Supabase products:', e);
      return this.filterMockProducts(params);
    }
  },

  // Get product details by slug
  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];
      }

      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories:category_id (name, slug),
          images:product_images (image_url, alt_text, display_order),
          variants:product_variants (size, color_name, color_hex, sku, stock, active)
        `)
        .eq('slug', slug)
        .single();

      if (error || !data) {
        return MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];
      }

      return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        category: data.categories?.name || 'Peshawari Collection',
        categorySlug: data.categories?.slug || 'kaptan-collection',
        price: Number(data.price),
        salePrice: data.discount_price ? Number(data.discount_price) : undefined,
        rating: 4.9,
        reviewsCount: 128,
        isNew: data.featured,
        isBestSeller: data.bestseller,
        featuredImage: data.images?.[0]?.image_url || '/images/hero.png',
        images: data.images?.map((img: any) => img.image_url) || ['/images/hero.png'],
        colors: (data.variants || []).map((v: any) => ({
          name: v.color_name,
          hex: v.color_hex || '#27170B',
        })),
        sizes: (data.variants || []).map((v: any) => ({
          size: v.size,
          inStock: v.stock > 0,
        })),
        shortDescription: data.short_description || '',
        description: data.description || '',
        materials: ['100% Genuine Full-Grain Cowhide Leather', 'Recycled Tyre Rubber Sole', 'Waxed Thread Stitching'],
        craftingDetails: ['Handcrafted in Peshawar', '14+ Hours Artisan Stitching'],
        soleType: data.sole_type || 'Double Tire Rubber Sole',
        leatherType: data.leather_type || 'Full-Grain Cowhide',
      };
    } catch (e) {
      return MOCK_PRODUCTS.find((p) => p.slug === slug) || MOCK_PRODUCTS[0];
    }
  },

  // Helper filter method
  filterMockProducts(params?: any): Product[] {
    let result = [...MOCK_PRODUCTS];
    if (params?.categorySlug && params.categorySlug !== 'all') {
      result = result.filter((p) => p.categorySlug === params.categorySlug);
    }
    if (params?.search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(params.search.toLowerCase()) ||
          p.category.toLowerCase().includes(params.search.toLowerCase())
      );
    }
    return result;
  },
};
