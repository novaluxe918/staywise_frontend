import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }, 
});

api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      if (config.headers) {
        // Hỗ trợ cả AxiosHeaders instance lẫn plain object
        if (typeof config.headers.delete === "function") {
          config.headers.delete("Content-Type");
        } else {
          delete config.headers["Content-Type"];
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export interface PageResponse<T> {
    content: T[];

    page: {
        size: number;
        number: number;
        totalElements: number;
        totalPages: number;
    };
}


export interface PageParams {
    tuKhoa?: string;
    trang?: number;
    kichThuoc?: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
}

export default api;