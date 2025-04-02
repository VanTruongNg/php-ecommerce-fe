// Common types
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  email_verified_at: string | null;
  role: "admin" | "customer";
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  status: "success" | "error";
  message: string;
  data: {
    user: User;
    access_token: string;
  };
}

// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}