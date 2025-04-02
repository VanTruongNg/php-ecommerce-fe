export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/user",
    VALIDATE_ADMIN: "/auth/validate-admin",
    GOOGLE_LOGIN: "/auth/google",
    GOOGLE_CALLBACK: "/auth/google/callback",
    REDIRECT_URI: typeof window !== 'undefined' ? `${window.location.origin}/auth/google/callback` : '',
  },

  // User endpoints
  USERS: {
    BASE: "/users",
    DETAIL: (id: number) => `/users/${id}`,
    UPDATE: (id: number) => `/users/${id}`,
    DELETE: (id: number) => `/users/${id}`,
  },

  // Product endpoints
  PRODUCTS: {
    BASE: "/products",
    DETAIL: (id: number) => `/products/${id}`,
    CREATE: "/products",
    UPDATE: (id: number) => `/products/${id}`,
    DELETE: (id: number) => `/products/${id}`,
    BY_CATEGORY: (categoryId: number) => `/categories/${categoryId}/products`,
  },

  // Category endpoints
  CATEGORIES: {
    BASE: "/categories",
    DETAIL: (id: number) => `/categories/${id}`,
    CREATE: "/categories",
    UPDATE: (id: number) => `/categories/${id}`,
    DELETE: (id: number) => `/categories/${id}`,
  },

  // Order endpoints
  ORDERS: {
    BASE: "/orders",
    DETAIL: (id: number) => `/orders/${id}`,
    CREATE: "/orders",
    UPDATE: (id: number) => `/orders/${id}`,
    DELETE: (id: number) => `/orders/${id}`,
    USER_ORDERS: "/orders/my-orders",
  },
} as const;