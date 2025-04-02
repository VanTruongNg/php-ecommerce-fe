import { create } from "zustand";
import { User } from "@/lib/api/types";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User, access_token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user, access_token) => {
    // Lưu access token vào localStorage
    localStorage.setItem("access_token", access_token);

    set({
      user,
      isAuthenticated: true,
    });
  },
  logout: () => {
    // Xóa access token khỏi localStorage
    localStorage.removeItem("access_token");
    
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));