import { supabase } from '@/lib/supabase/client';
import { UserRegisterInput, UserLoginInput, UserRegisterSchema, UserLoginSchema } from '@/lib/validations';

export const authService = {
  // Register user with Supabase Auth
  async register(input: UserRegisterInput) {
    const validated = UserRegisterSchema.parse(input);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return { success: true, message: 'Mock Registration Successful' };
    }

    const { data, error } = await supabase.auth.signUp({
      email: validated.email,
      password: validated.password,
      options: {
        data: {
          full_name: validated.full_name,
          phone: validated.phone,
        },
      },
    });

    if (error) throw new Error(error.message);

    // Create Profile Row
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: validated.full_name,
        phone: validated.phone,
        role: 'customer',
      });
    }

    return { success: true, user: data.user };
  },

  // Login user with Supabase Auth
  async login(input: UserLoginInput) {
    const validated = UserLoginSchema.parse(input);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return { success: true, message: 'Mock Login Successful' };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: validated.email,
      password: validated.password,
    });

    if (error) throw new Error(error.message);

    return { success: true, session: data.session, user: data.user };
  },

  // Logout user
  async logout() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
    await supabase.auth.signOut();
  },

  // Password reset request
  async resetPassword(email: string) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return { success: true, message: 'Mock Reset Link Sent' };
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/forgot-password`,
    });
    if (error) throw new Error(error.message);
    return { success: true };
  },

  // Get current active session
  async getSession() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
    const { data } = await supabase.auth.getSession();
    return data.session;
  },
};
