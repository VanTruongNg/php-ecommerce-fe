import { API_ENDPOINTS } from "../endpoints";
import { AuthResponse, LoginRequest, RegisterRequest, User } from "../types";
import axiosInstance from "../axios-instance";
import Cookies from 'js-cookie';

export interface AuthApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

const setUserAuthenticated = (token: string, user: User) => {
  localStorage.setItem("access_token", token);
  Cookies.set('user-role', user.role || 'user', { expires: 7, path: '/' });
};

const clearUserAuthentication = () => {
  localStorage.removeItem("access_token");
  Cookies.remove('user-role', { path: '/' });
  Cookies.remove('refresh_token', { path: '/' });
};

let isMakingAuthRequest = false;

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    console.log("Auth Service - Login request:", data);
    
    try {
      const response = await axiosInstance.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
      console.log("Auth Service - Login response:", response.data);
      
      const { access_token } = response.data.data;
      const user = response.data.data.user;
      
      setUserAuthenticated(access_token, user);
      
      return response.data;
    } catch (error) {
      console.error("Auth Service - Login error:", error);
      throw error;
    }
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
    const { access_token } = response.data.data;
    const user = response.data.data.user;
    
    setUserAuthenticated(access_token, user);
    
    return response.data;
  },

  logout: async (): Promise<AuthApiResponse<null>> => {
    if (isMakingAuthRequest) {
      console.log("Auth Service - Ignoring duplicate logout request");
      return {
        status: "success",
        message: "Already logging out",
        data: null
      };
    }
    
    isMakingAuthRequest = true;
    
    try {
      console.log("Auth Service - Logout request sent");
      const response = await axiosInstance.post<AuthApiResponse<null>>(API_ENDPOINTS.AUTH.LOGOUT);
      console.log("Auth Service - Logout response:", response.data);
      
      clearUserAuthentication();
      
      return response.data;
    } catch (error) {
      console.error("Auth Service - Logout error:", error);
      throw error;
    } finally {
      setTimeout(() => {
        isMakingAuthRequest = false;
      }, 300);
    }
  },

  getMe: async (): Promise<AuthApiResponse<{ user: User }>> => {
    if (isMakingAuthRequest) {
      console.log("Auth Service - Ignoring duplicate getMe request");
      return {
        status: "success",
        message: "Already fetching user data",
        data: { user: null as unknown as User }
      };
    }
    
    isMakingAuthRequest = true;
    
    try {
      console.log("Auth Service - GetMe request sent");
      const response = await axiosInstance.get<AuthApiResponse<{ user: User }>>(API_ENDPOINTS.AUTH.ME);
      console.log("Auth Service - GetMe response:", response.data);
      
      if (response.data.data.user) {
        Cookies.set('user-role', response.data.data.user.role || 'user', { expires: 7, path: '/' });
      }
      
      return response.data;
    } catch (error) {
      console.error("Auth Service - GetMe error:", error);
      throw error;
    } finally {
      setTimeout(() => {
        isMakingAuthRequest = false;
      }, 300);
    }
  },
  
  validateAdmin: async (): Promise<AuthApiResponse<{ isAdmin: boolean; user?: User }>> => {
    try {
      console.log("Auth Service - ValidateAdmin request sent");
      const response = await axiosInstance.get<AuthApiResponse<{ user: User }>>(API_ENDPOINTS.AUTH.ME);
      console.log("Auth Service - ValidateAdmin response:", response.data);
      
      const isAdmin = response.data.data.user?.role === 'admin';
      
      return {
        status: response.data.status,
        message: response.data.message,
        data: {
          isAdmin,
          user: response.data.data.user
        }
      };
    } catch (error) {
      console.error("Auth Service - Validate Admin error:", error);
      return {
        status: "error",
        message: "Failed to validate admin rights",
        data: { isAdmin: false }
      };
    }
  },

  // Thêm các phương thức đăng nhập Google
  getGoogleAuthUrl: async (): Promise<string> => {
    try {
      console.log("Auth Service - Requesting Google Auth URL");
      // Backend trả về { url: "https://google-auth-url..." }
      const response = await axiosInstance.get<{ url: string }>(API_ENDPOINTS.AUTH.GOOGLE_LOGIN);
      console.log("Auth Service - Google Auth URL received:", response.data);
      
      // Kiểm tra response có đúng định dạng không
      if (!response.data || !response.data.url) {
        console.error("Invalid Google Auth URL response:", response.data);
        throw new Error("Không nhận được URL đăng nhập Google hợp lệ");
      }
      
      return response.data.url;
    } catch (error) {
      console.error("Auth Service - Google Auth URL error:", error);
      throw error;
    }
  },

  handleGoogleCallback: async (): Promise<AuthApiResponse<{user: null, access_token: null}>> => {
    console.log("Auth Service - This method is deprecated");
    return {
      status: "success", 
      message: "Please use the success route instead",
      data: { user: null, access_token: null }
    };
  }
};

export default authService;