import { create } from "zustand";

interface IUser {
  id: string;
  nickName: string;
  eMail: string;
  savedSongs: string[];
}

interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (user: IUser, token: string) => void;
  logout: ()=> void,
}

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