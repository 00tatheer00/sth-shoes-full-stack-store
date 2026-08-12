import { supabase } from '@/lib/supabase/client';
import { Address } from '@/types';
import { AddressInput, AddressSchema } from '@/lib/validations';

export const addressService = {
  async getAddresses(userId: string): Promise<Address[]> {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return [
        {
          id: 'addr-1',
          title: 'Home Address',
          fullName: 'Shahzaib Khan',
          phone: '+92 300 1234567',
          addressLine: 'House 42, Street 8, Sector F-7/3',
          city: 'Islamabad',
          province: 'ICT',
          postalCode: '44000',
          isDefault: true,
        },
      ];
    }

    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      fullName: item.full_name,
      phone: item.phone,
      addressLine: item.address_line,
      city: item.city,
      province: item.province,
      postalCode: item.postal_code || '',
      isDefault: item.is_default,
    }));
  },

  async addAddress(userId: string, input: AddressInput): Promise<Address> {
    const validated = AddressSchema.parse(input);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return {
        id: `addr-${Date.now()}`,
        title: validated.title,
        fullName: validated.full_name,
        phone: validated.phone,
        addressLine: validated.address_line,
        city: validated.city,
        province: validated.province,
        postalCode: validated.postal_code || '54000',
        isDefault: validated.is_default,
      };
    }

    const { data, error } = await supabase
      .from('addresses')
      .insert({
        user_id: userId,
        title: validated.title,
        full_name: validated.full_name,
        phone: validated.phone,
        address_line: validated.address_line,
        city: validated.city,
        province: validated.province,
        postal_code: validated.postal_code,
        is_default: validated.is_default,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return {
      id: data.id,
      title: data.title,
      fullName: data.full_name,
      phone: data.phone,
      addressLine: data.address_line,
      city: data.city,
      province: data.province,
      postalCode: data.postal_code || '',
      isDefault: data.is_default,
    };
  },

  async deleteAddress(addressId: string): Promise<boolean> {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return true;
    const { error } = await supabase.from('addresses').delete().eq('id', addressId);
    return !error;
  },
};
