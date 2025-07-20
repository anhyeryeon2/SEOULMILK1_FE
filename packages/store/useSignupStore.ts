import { create } from 'zustand';

interface SignupState {
  name: string;
  loginId: string;
  password: string;
  setSignupData: (data: Partial<SignupState>) => void;
  resetSignupData: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  name: '',
  loginId: '',
  password: '',
  setSignupData: (data) => set((state) => ({ ...state, ...data })),
  resetSignupData: () => set({ name: '', loginId: '', password: '' })
}));
