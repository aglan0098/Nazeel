// src/types/auth.ts
export interface LoginRequest {
  UserName: string;
  Password: string;
  ReturnUrl?: string;
}

export interface LoginResponse {
  isSuccess: boolean;
  message: string;
  object: string;
}
