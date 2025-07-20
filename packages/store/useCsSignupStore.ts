import { create } from 'zustand';

interface SignupState {
  loginId: string;
  name: string;
  password: string;
  setSignupData: (data: Partial<SignupState>) => void;
  resetSignupData: () => void;
}

export const useCsSignupStore = create<SignupState>((set) => ({
  name: '',
  loginId: '',
  password: '',
  setSignupData: (data) => set((state) => ({ ...state, ...data })),
  resetSignupData: () => set({ name: '', loginId: '', password: '' })
}));
