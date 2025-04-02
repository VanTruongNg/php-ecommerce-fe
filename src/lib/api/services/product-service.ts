import { API_ENDPOINTS } from "../endpoints";
import { ApiResponse, Product, Category } from "../types";
import axiosInstance from "../axios-instance";

export const productService = {
  // Product APIs
  getAllProducts: async (): Promise<ApiResponse<Product[]>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS.BASE);
    return response.data;
  },

  getProductById: async (id: number): Promise<ApiResponse<Product>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS.DETAIL(id));
    return response.data;
  },

  getProductsByCategory: async (categoryId: number): Promise<ApiResponse<Product[]>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS.BY_CATEGORY(categoryId));
    return response.data;
  },

  createProduct: async (data: Omit<Product, "id" | "created_at" | "updated_at">): Promise<ApiResponse<Product>> => {
    const response = await axiosInstance.post(API_ENDPOINTS.PRODUCTS.CREATE, data);
    return response.data;
  },

  updateProduct: async (id: number, data: Partial<Product>): Promise<ApiResponse<Product>> => {
    const response = await axiosInstance.put(API_ENDPOINTS.PRODUCTS.UPDATE(id), data);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
    return response.data;
  },

  // Category APIs
  getAllCategories: async (): Promise<ApiResponse<Category[]>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES.BASE);
    return response.data;
  },

  getCategoryById: async (id: number): Promise<ApiResponse<Category>> => {
    const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES.DETAIL(id));
    return response.data;
  },

  createCategory: async (data: Omit<Category, "id" | "created_at" | "updated_at">): Promise<ApiResponse<Category>> => {
    const response = await axiosInstance.post(API_ENDPOINTS.CATEGORIES.CREATE, data);
    return response.data;
  },

  updateCategory: async (id: number, data: Partial<Category>): Promise<ApiResponse<Category>> => {
    const response = await axiosInstance.put(API_ENDPOINTS.CATEGORIES.UPDATE(id), data);
    return response.data;
  },

  deleteCategory: async (id: number): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.delete(API_ENDPOINTS.CATEGORIES.DELETE(id));
    return response.data;
  },
};

export default productService;