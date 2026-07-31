// login
export interface LoginData {
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// register
export interface RegisterData {
  user: User;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

// shared
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  profilePhoto: string | null;
  role: UserRole;
}

export type UserRole = 'USER' | 'ADMIN';
