// Common types
export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: {
    cars?: T[];
    [key: string]: any;
  };
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ApiErrorResponse {
  status: string;
  message: string;
  errors?: Record<string, string[]>;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  email_verified_at: string | null;
  role: "admin" | "customer";
  phone: string | null;
  address: string | null;
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

export interface Car {
  id: string;
  model: string;
  year: string;
  brand_id: string;
  color: string;
  price: string;
  image_url: string;
  stock: number;
  fuel_type: 'electric' | 'gasoline' | 'hybrid' | 'diesel';
  availability: 'in_stock' | 'out_of_stock' | 'pre_order';
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  name: string;
  country: string;
  banner_url: string;
  created_at: string;
  updated_at: string;
}