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
  vaiTro: "USER" | "OWNER" | "ADMIN";
  hoTen?: string;
  anhDaiDien?: string | null;
}

interface AuthContextType {
  nguoiDung: NguoiDung | null;
  dangNhap: (data: NguoiDung) => void;
  dangXuat: () => Promise<void>;
  capNhatNguoiDung: (data: Partial<NguoiDung>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


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
  const [nguoiDung, setNguoiDung] = useState<NguoiDung | null>(layUserTuCookie);

  const dangNhap = (data: NguoiDung) => {
    setNguoiDung(data);
    Cookies.set("user_info", encodeURIComponent(JSON.stringify(data)), {
      path: "/",
      sameSite: "Lax",
    });
  };

  const capNhatNguoiDung = (data: Partial<NguoiDung>) => {
    setNguoiDung((prev) => {
      const updatedUser = prev ? { ...prev, ...data } : null;

      if (updatedUser) {
        Cookies.set("user_info", encodeURIComponent(JSON.stringify(updatedUser)), {
          path: "/",
          sameSite: "Lax",
        });
      }

      return updatedUser;
    });
  };

  const dangXuat = async () => {
    try {
      await api.post("/auth/dang-xuat");
    } catch (err) {
      console.error("Lỗi đăng xuất:", err);
    } finally {
      Cookies.remove("user_info", { path: "/" });

      Cookies.remove("token", { path: "/" });

      localStorage.removeItem("token");

      setNguoiDung(null);
    }
  };
  return (
    <AuthContext.Provider value={{ nguoiDung, dangNhap, dangXuat, capNhatNguoiDung }}>
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