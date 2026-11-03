import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";
import api from "../services/api";

export interface NguoiDung {
  id: number;
  email: string;
  vaiTro: "USER" | "OWNER";
  hoTen?: string;
}

interface AuthContextType {
  nguoiDung: NguoiDung | null;
  dangNhap: (data: NguoiDung) => void;
  dangXuat: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hàm đọc user_info từ Cookie khi app khởi động hoặc khi F5
const layUserTuCookie = (): NguoiDung | null => {
  const rawData = Cookies.get("user_info");
  if (!rawData) return null;
  try {
    return JSON.parse(decodeURIComponent(rawData));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Khởi tạo state ngay từ Cookie, không cần useEffect hay API /me
  const [nguoiDung, setNguoiDung] = useState<NguoiDung | null>(layUserTuCookie);

  const dangNhap = (data: NguoiDung) => {
    setNguoiDung(data);
  };

  const dangXuat = async () => {
    try {
      await api.post("/auth/dang-xuat");
    } catch (err) {
      console.error("Lỗi đăng xuất:", err);
    } finally {
      Cookies.remove("user_info", { path: "/" });
      setNguoiDung(null);
    }
  };

  return (
    <AuthContext.Provider value={{ nguoiDung, dangNhap, dangXuat }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }
  return context;
};