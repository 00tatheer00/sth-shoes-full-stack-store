import { z } from 'zod';

// Category Validation Schema
export const CategorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lower-case alphanumeric with hyphens'),
  description: z.string().optional(),
  image_url: z.string().url('Must be a valid image URL').optional().or(z.literal('')),
  display_order: z.number().int().default(0),
});

// Product Variant Validation Schema
export const ProductVariantSchema = z.object({
  size: z.number().int().min(35, 'Size must be at least 35').max(50, 'Size must be at most 50'),
  color_name: z.string().min(2, 'Color name is required'),
  color_hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid HEX color code'),
  sku: z.string().min(3, 'SKU is required'),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  active: z.boolean().default(true),
});

// Product Validation Schema
export const ProductSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lower-case alphanumeric with hyphens'),
  category_id: z.string().uuid('Invalid Category ID'),
  price: z.number().positive('Price must be greater than 0'),
  discount_price: z.number().positive('Discount price must be positive').optional().nullable(),
  short_description: z.string().min(10, 'Short description must be at least 10 characters'),
  description: z.string().min(20, 'Full description must be at least 20 characters'),
  sole_type: z.string().default('Double Tire Rubber Sole'),
  leather_type: z.string().default('Full-Grain Cowhide'),
  featured: z.boolean().default(false),
  bestseller: z.boolean().default(false),
  active: z.boolean().default(true),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
});

// Address Validation Schema
export const AddressSchema = z.object({
  title: z.string().min(2, 'Title is required (e.g. Home, Office)'),
  full_name: z.string().min(3, 'Full name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  address_line: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  province: z.string().min(2, 'Province is required'),
  postal_code: z.string().optional(),
  is_default: z.boolean().default(false),
});

// Review Validation Schema
export const ReviewSchema = z.object({
  product_id: z.string().uuid('Invalid Product ID'),
  rating: z.number().int().min(1, 'Rating must be between 1 and 5').max(5, 'Rating must be between 1 and 5'),
  title: z.string().min(3, 'Review title is required'),
  comment: z.string().min(10, 'Review comment must be at least 10 characters'),
  author_name: z.string().min(2, 'Author name is required'),
  location: z.string().default('Peshawar, Pakistan'),
});

// User Register & Login Auth Schemas
export const UserRegisterSchema = z.object({
  full_name: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const UserLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type CategoryInput = z.infer<typeof CategorySchema>;
export type ProductInput = z.infer<typeof ProductSchema>;
export type ProductVariantInput = z.infer<typeof ProductVariantSchema>;
export type AddressInput = z.infer<typeof AddressSchema>;
export type ReviewInput = z.infer<typeof ReviewSchema>;
export type UserRegisterInput = z.infer<typeof UserRegisterSchema>;
export type UserLoginInput = z.infer<typeof UserLoginSchema>;
