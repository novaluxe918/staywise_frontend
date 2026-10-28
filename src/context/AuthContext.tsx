
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface NguoiDung {
  id: number;
  email: string;
  vaiTro: "USER" | "OWNER";
  hoTen?: string;
}

interface DangNhapResponse extends NguoiDung {
  token: string;
}

interface AuthContextType {
  nguoiDung: NguoiDung | null;
  token: string | null;
  dangNhap: (data: DangNhapResponse) => void;
  dangXuat: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [nguoiDung, setNguoiDung] = useState<NguoiDung | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Khôi phục thông tin khi tải lại trang
  useEffect(() => {
    const tokenDaLuu = localStorage.getItem("token");
    const userDaLuu = localStorage.getItem("nguoiDung");

    if (tokenDaLuu && userDaLuu) {
      try {
        const user: NguoiDung = JSON.parse(userDaLuu);

        setToken(tokenDaLuu);
        setNguoiDung(user);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("nguoiDung");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        localStorage.removeItem("vaiTro");
      }
    }
  }, []);

  // Lưu thông tin khi đăng nhập thành công
  const dangNhap = (data: DangNhapResponse) => {
    const user: NguoiDung = {
      id: data.id,
      email: data.email,
      vaiTro: data.vaiTro,
      hoTen: data.hoTen,
    };

    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", String(data.id));
    localStorage.setItem("email", data.email);
    localStorage.setItem("vaiTro", data.vaiTro);
    localStorage.setItem("nguoiDung", JSON.stringify(user));

    setToken(data.token);
    setNguoiDung(user);
  };

  // Xóa thông tin đăng nhập ở frontend
  const dangXuat = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("vaiTro");
    localStorage.removeItem("nguoiDung");

    setToken(null);
    setNguoiDung(null);
  };

  return (
    <AuthContext.Provider
      value={{
        nguoiDung,
        token,
        dangNhap,
        dangXuat,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth phải được sử dụng bên trong AuthProvider"
    );
  }

  return context;
};
