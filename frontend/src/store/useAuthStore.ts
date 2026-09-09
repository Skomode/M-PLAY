import { create } from "zustand";
import type { IAuthState } from "../types/types";

export const useAuthStore = create<IAuthState>((set) => ({
  user: null, 
  token: null,
  isAuthenticated: false,

  login: (user, token) => set({
    user,
    token,
    isAuthenticated: true,
  }),

  logout: () => set({
  user: null, 
  token: null,
  isAuthenticated: false,
  }),
}));