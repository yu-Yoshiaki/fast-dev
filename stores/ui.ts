import { create } from 'zustand'

interface UIState {
  isSidebarOpen: boolean
  isLoading: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
  setIsLoading: (isLoading: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isLoading: false,
  setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setIsLoading: (isLoading) => set({ isLoading: isLoading }),
}))

