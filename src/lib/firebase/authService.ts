import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth, googleProvider } from './config';

export const firebaseAuthService = {
  // Sign up with Email, Password & Full Name
  async signUp(email: string, pass: string, fullName: string) {
    if (!auth) {
      return {
        user: { id: `usr-${Date.now()}`, email, user_metadata: { full_name: fullName } },
        session: null,
      };
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    if (fullName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName: fullName });
    }
    return {
      user: {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        user_metadata: { full_name: fullName || userCredential.user.displayName },
      },
      session: userCredential.user,
    };
  },

  // Sign in with Email & Password
  async signIn(email: string, pass: string) {
    if (!auth) {
      return {
        user: { id: `usr-${Date.now()}`, email, user_metadata: { full_name: email.split('@')[0] } },
        session: null,
      };
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    return {
      user: {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        user_metadata: { full_name: userCredential.user.displayName || email.split('@')[0] },
      },
      session: userCredential.user,
    };
  },

  // Sign in with Google Popup
  async signInWithGoogle() {
    if (!auth || !googleProvider) {
      return {
        user: { id: `usr-${Date.now()}`, email: 'google.user@example.com', user_metadata: { full_name: 'Patron Khan' } },
        session: null,
      };
    }
    const userCredential = await signInWithPopup(auth, googleProvider);
    return {
      user: {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        user_metadata: { full_name: userCredential.user.displayName },
      },
      session: userCredential.user,
    };
  },

  // Sign out
  async logout() {
    if (auth) {
      await signOut(auth);
    }
    return { success: true };
  },

  // Get current user session
  getCurrentUser(): Promise<any | null> {
    return new Promise((resolve) => {
      if (!auth) {
        resolve(null);
        return;
      }
      const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        unsubscribe();
        if (user) {
          resolve({
            id: user.uid,
            email: user.email,
            user_metadata: { full_name: user.displayName || user.email?.split('@')[0] },
          });
        } else {
          resolve(null);
        }
      });
    });
  },
};
