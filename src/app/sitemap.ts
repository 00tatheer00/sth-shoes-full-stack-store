import { MetadataRoute } from 'next';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/data/mockData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tatheerchappalz.com';

  // Static Marketing Pages
  const staticPages = [
    '',
    '/shop',
    '/craft',
    '/about',
    '/contact',
    '/size-guide',
    '/faq',
    '/shipping',
    '/returns',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Product Pages
  const productPages = MOCK_PRODUCTS.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Dynamic Category Pages
  const categoryPages = MOCK_CATEGORIES.map((c) => ({
    url: `${baseUrl}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages, ...categoryPages];
}
