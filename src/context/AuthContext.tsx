
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
    try {
        const userInfo = Cookies.get("user_info");

        if (!userInfo) return null;

        let data: NguoiDung;

        try {
            data = JSON.parse(userInfo) as NguoiDung;
        } catch {
            data = JSON.parse(
                decodeURIComponent(userInfo)
            ) as NguoiDung;
        }

        if (!data.id || !data.email || !data.vaiTro) {
            return null;
        }

        return data;
    } catch (error) {
        console.error("Không thể đọc user_info:", error);
        Cookies.remove("user_info", { path: "/" });
        return null;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [nguoiDung, setNguoiDung] = useState<NguoiDung | null>(
        layUserTuCookie
    );


    // Cập nhật thông tin người dùng
    const capNhatNguoiDung = (data: Partial<NguoiDung>) => {
        setNguoiDung((prev) => {
            if (!prev) return null;

            const updatedUser = {
                ...prev,
                ...data,
            };

            Cookies.set("user_info", JSON.stringify(updatedUser), {
                path: "/",
                sameSite: "Lax",
            });

            return updatedUser;
        });
    };

const dangNhap = (data: NguoiDung) => {
    Cookies.set("user_info", JSON.stringify(data), {
        path: "/",
        sameSite: "Lax",
    });
    setNguoiDung(data);
};

const dangXuat = async () => {
    try {
        await api.post("/auth/dang-xuat");
    } catch (error) {
        console.error("Lỗi đăng xuất:", error);
    } finally {
        Cookies.remove("user_info", { path: "/" });
        Cookies.remove("access_token", { path: "/" });
        Cookies.remove("JSESSIONID", { path: "/" });
        localStorage.removeItem("token");

        setNguoiDung(null);
    }
};

    return (
        <AuthContext.Provider
            value={{
                nguoiDung,
                dangNhap,
                dangXuat,
                capNhatNguoiDung,
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
