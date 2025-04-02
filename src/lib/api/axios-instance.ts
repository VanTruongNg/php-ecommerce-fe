import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

console.log("Khởi tạo Axios với URL:", API_URL);

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true, // Quan trọng để gửi/nhận cookies (refresh_token)
});

// Danh sách các endpoint không cần refresh token khi gặp lỗi 401
const NO_REFRESH_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh"
];

// Log tất cả các request
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request:", {
      method: config.method,
      url: config.url,
      headers: config.headers,
      data: config.data,
      withCredentials: config.withCredentials,
    });
    
    // Thêm access_token từ localStorage vào Authorization header
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

let isRefreshing = false;
interface QueuePromise {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

let failedQueue: QueuePromise[] = [];

const processQueue = (error: unknown | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Log tất cả các response
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response:", {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  async (error) => {
    console.error("Response Error:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
      request: error.request,
      config: error.config,
    });
    
    const originalRequest = error.config;
    
    // Kiểm tra endpoint hiện tại để quyết định có nên refresh token hay không
    const currentEndpoint = originalRequest.url?.replace(API_URL, '') || '';
    const shouldSkipRefresh = NO_REFRESH_ENDPOINTS.some(endpoint => 
      currentEndpoint.includes(endpoint)
    );
    
    if (error.response?.status === 401 && !originalRequest._retry && !shouldSkipRefresh) {
      console.log("Bắt đầu refresh token flow");
      
      if (isRefreshing) {
        console.log("Đã có request refresh token đang xử lý, thêm vào hàng đợi");
        // Nếu đang refresh token, thêm request vào hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            console.log("Tiếp tục request sau khi refresh token thành công");
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(err => {
            console.error("Request bị reject sau khi refresh token thất bại", err);
            return Promise.reject(err);
          });
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      console.log("Bắt đầu gọi API refresh token");

      try {
        // Dùng axios nguyên bản thay vì instance đã cấu hình để tránh lặp vô tận
        const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
          withCredentials: true,
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        });
        
        console.log("Refresh token thành công:", response.data);
        const { access_token } = response.data.data;

        localStorage.setItem("access_token", access_token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        
        processQueue(null, access_token);
        isRefreshing = false;
        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token thất bại:", refreshError);
        processQueue(refreshError, null);
        isRefreshing = false;
        
        localStorage.removeItem("access_token");
        
        // Nếu không phải đang ở trang đăng nhập, chuyển hướng đến trang đăng nhập
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth/login')) {
          window.location.href = "/auth/login";
        }
        
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;