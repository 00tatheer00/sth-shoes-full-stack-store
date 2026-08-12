import { supabase } from '@/lib/supabase/client';

export const storageService = {
  // Get public URL for storage assets
  getPublicUrl(bucket: 'product-images' | 'category-images' | 'brand-assets', path: string): string {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return `/images/${path}`;
    }
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  // Upload file to Supabase Storage
  async uploadFile(
    bucket: 'product-images' | 'category-images' | 'brand-assets',
    file: File,
    path: string
  ): Promise<string> {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return `/images/${file.name}`;
    }

    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      upsert: true,
    });

    if (error) throw new Error(error.message);

    return this.getPublicUrl(bucket, data.path);
  },
};
