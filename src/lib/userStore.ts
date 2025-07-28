import { create } from "zustand";

export interface User {
  _id: string;
  email: string;
  fullName: string;
  username: string;
  profilePic: string;
  // Add any other fields you need
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));