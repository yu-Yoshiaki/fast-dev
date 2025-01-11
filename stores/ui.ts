import { create } from 'zustand';

type UIStore = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useUIStore = create<UIStore>(set => ({
  isLoading: false,
  setLoading: loading => set({ isLoading: loading }),
}));
