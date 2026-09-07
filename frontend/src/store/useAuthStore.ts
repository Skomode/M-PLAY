import { create } from "zustand";

interface IUser {
  id: string;
  nickName: string;
  eMail: string;
  savedSongs: string[];
}

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (user: IUser, token: string) => void;
  logout: ()=> void,
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null, 
  token: null,
  isAuthenticated: false,

  login: (user, token) => set({
    user,
    token,
    isAuthenticated: true,
  }),

  logut: () => set ({
      user: null, 
  token: null,
  isAuthenticated: false,
  }),
})