'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase';
import { UserProfile, UserRole } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  role: UserRole | 'guest';
  isAdmin: boolean;
  loading: boolean;
  isFirebaseConfigured: boolean;
  signUp: (name: string, email: string, phone: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to format Firebase Auth and Firestore error messages into friendly readable text
export const formatAuthError = (err: any): string => {
  if (!err) return 'An unexpected error occurred.';
  const code = err.code || '';
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please sign in instead.';
    case 'auth/invalid-email':
      return 'Please provide a valid email address.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password. Please try again.';
    case 'auth/too-many-requests':
      return 'Access temporarily disabled due to multiple failed login attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'permission-denied':
      return 'Firestore Permission Denied: Your Firebase Console Firestore Rules are blocking writes. Please publish the rules from firestore.rules in Firebase Console.';
    case 'unavailable':
      return 'Firestore is unreachable. Please verify you created the Firestore Database in Firebase Console.';
    case 'not-found':
      return 'Firestore database not found. Please create the database in your Firebase Console.';
    default:
      return err.message || 'Authentication failed. Please check your information.';
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  // Fetch or refresh the user's Firestore profile document
  const fetchUserProfile = async (currentUser: User): Promise<UserProfile | null> => {
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data() as UserProfile;
        setUserProfile(data);
        return data;
      } else {
        // Document doesn't exist yet, create default customer profile
        const defaultProfile: UserProfile = {
          uid: currentUser.uid,
          name: currentUser.displayName || 'Customer',
          email: currentUser.email || '',
          phone: '',
          role: 'customer',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        await setDoc(userDocRef, defaultProfile);
        setUserProfile(defaultProfile);
        return defaultProfile;
      }
    } catch (fetchErr: any) {
      console.warn('Could not fetch user profile from Firestore:', fetchErr);
      if (fetchErr?.code === 'permission-denied') {
        console.error(
          '🚨 [Firestore] Permission Denied! Ensure you copied and clicked "Publish" in the Firebase Console (Firestore Database -> Rules tab) using the contents of firestore.rules.'
        );
      }
      return null;
    }
  };

  useEffect(() => {
    // If Firebase is not configured with real keys, skip waiting indefinitely
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserProfile(currentUser);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (name: string, email: string, phone: string, password: string) => {
    setError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      // Update display name on Auth
      if (cred.user) {
        await firebaseUpdateProfile(cred.user, { displayName: name.trim() });

        // Save detailed profile in Firestore
        const profileData: UserProfile = {
          uid: cred.user.uid,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          role: 'customer', // Always customer by default
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        await setDoc(doc(db, 'users', cred.user.uid), profileData);
        setUserProfile(profileData);
      }
    } catch (err: any) {
      const msg = formatAuthError(err);
      setError(msg);
      throw new Error(msg);
    }
  };

  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      if (cred.user) {
        await fetchUserProfile(cred.user);
      }
    } catch (err: any) {
      const msg = formatAuthError(err);
      setError(msg);
      throw new Error(msg);
    }
  };

  const signOut = async () => {
    setError(null);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (err: any) {
      const msg = formatAuthError(err);
      setError(msg);
      throw new Error(msg);
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error('Not authenticated');
    setError(null);
    try {
      const userRef = doc(db, 'users', user.uid);
      // Ensure role cannot be modified via profile update
      const { role, ...safeData } = data;
      const payload = {
        ...safeData,
        updatedAt: serverTimestamp(),
      };
      await updateDoc(userRef, payload);
      setUserProfile((prev) => (prev ? { ...prev, ...safeData } : null));
    } catch (err: any) {
      const msg = formatAuthError(err);
      setError(msg);
      throw new Error(msg);
    }
  };

  const role: UserRole | 'guest' = user ? (userProfile?.role || 'customer') : 'guest';
  const isAdmin = role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        role,
        isAdmin,
        loading,
        isFirebaseConfigured,
        signUp,
        signIn,
        signOut,
        updateUserProfile,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
