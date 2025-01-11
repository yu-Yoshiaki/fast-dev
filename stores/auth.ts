import { create } from 'zustand';

type User = {
  id: string;
  name: string;
} | null;

type AuthStore = {
  user: User;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  checkAuth: async () => {
    try {
      // TODO: 実際の認証チェックロジックを実装
      const mockUser = { id: '1', name: 'Test User' };
      set({ user: mockUser });
    } catch (error) {
      set({ user: null });
    }
  },
}));
