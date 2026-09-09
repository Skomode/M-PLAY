export interface IUser {
  id: string;
  nickName: string;
  eMail: string;
  savedSongs: string[];
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (user: IUser, token: string) => void;
  logout: ()=> void,
}

export interface IAuthCredentials {
    nickName: string,
    password: string, 
    email: string
}