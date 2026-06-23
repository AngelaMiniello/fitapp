export interface ILoginProps {
  email: string;
  password: string;
}

export interface ILoginErrors {
  email?: string;
  password?: string;
}

export interface IRegisterProps {
  username: string;
  genre: string;
  age: number;
  height: string;
  weight: string;
  mail: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterErrors {
  username?: string;
  genre?: string;
  age?: number;
  height?: string;
  weight?: string;
  mail?: string;
  password?: string;
  confirmPassword?: string;
}
