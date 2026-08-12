import { supabase } from '@/lib/supabase/client';
import { Category } from '@/types';
import { MOCK_CATEGORIES } from '@/data/mockData';

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        return MOCK_CATEGORIES;
      }

      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return MOCK_CATEGORIES;
      }

      return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description || '',
        image: item.image_url || '/images/hero.png',
        itemCount: 12,
      }));
    } catch (e) {
      return MOCK_CATEGORIES;
    }
  },
};
