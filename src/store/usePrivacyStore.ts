import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PrivacyStore {
  hasConsent: boolean | null;
  setConsent: (consent: boolean) => void;
}

export const usePrivacyStore = create<PrivacyStore>()(
  persist(
    (set) => ({
      hasConsent: null,
      setConsent: (consent) => set({ hasConsent: consent }),
    }),
    {
      name: 'privacy-storage',
    }
  )
);