
import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    useRef,
    type ReactNode,
} from "react";

import type { HomeStayOption } from "../types/homestay";
import { layDanhSachHomeStayDaDuyet } from "../services/homestayService";
import { useAuth } from "./AuthContext";

interface HomeStayContextType {
    danhSachHomeStay: HomeStayOption[];
    homeStayDangChon: number | "";
    setHomeStayDangChon: (id: number | "") => void;
    dangTaiHomeStay: boolean;
    taiLaiDanhSachHomeStay: () => Promise<void>;
}

const HomeStayContext = createContext<HomeStayContextType | undefined>(
    undefined
);

export const HomeStayProvider = ({ children }: { children: ReactNode }) => {
    const { nguoiDung } = useAuth();
    const userId = nguoiDung?.id ?? null;
    const email = nguoiDung?.email ?? null;

    const [danhSachHomeStay, setDanhSachHomeStay] =
        useState<HomeStayOption[]>([]);

    const [homeStayDangChon, setHomeStayDangChon] =
        useState<number | "">("");

    const [dangTaiHomeStay, setDangTaiHomeStay] = useState(false);

    const requestId = useRef(0);

    const taiLaiDanhSachHomeStay = useCallback(async () => {
        const currentRequest = ++requestId.current;
        const currentUserId = userId;
        const currentEmail = email;

        if (currentUserId === null || currentEmail === null) {
            setDanhSachHomeStay([]);
            setHomeStayDangChon("");
            setDangTaiHomeStay(false);
            return;
        }

        // Xóa dữ liệu cũ trước khi tải dữ liệu mới
        setDanhSachHomeStay([]);
        setHomeStayDangChon("");
        setDangTaiHomeStay(true);

        try {
            const data = await layDanhSachHomeStayDaDuyet();

            // Không nhận kết quả của request cũ
            if (currentRequest !== requestId.current) {
                return;
            }

            setDanhSachHomeStay(data);

            // Luôn chọn HomeStay thuộc danh sách vừa tải
            setHomeStayDangChon(
                data.length > 0 ? data[0].id : ""
            );

        } catch (error) {
            if (currentRequest !== requestId.current) {
                return;
            }

            console.error("Lỗi lấy danh sách HomeStay:", error);

            setDanhSachHomeStay([]);
            setHomeStayDangChon("");

        } finally {
            if (currentRequest === requestId.current) {
                setDangTaiHomeStay(false);
            }
        }
    }, [userId, email]);

    useEffect(() => {
        // Vô hiệu hóa tất cả request của tài khoản trước
        requestId.current++;

        setDanhSachHomeStay([]);
        setHomeStayDangChon("");
        setDangTaiHomeStay(false);

        if (userId !== null && email !== null) {
            void taiLaiDanhSachHomeStay();
        }

        return () => {
            requestId.current++;
        };
    }, [userId, email, taiLaiDanhSachHomeStay]);

    return (
        <HomeStayContext.Provider
            value={{
                danhSachHomeStay,
                homeStayDangChon,
                setHomeStayDangChon,
                dangTaiHomeStay,
                taiLaiDanhSachHomeStay,
            }}
        >
            {children}
        </HomeStayContext.Provider>
    );
};

export const useHomeStay = () => {
    const context = useContext(HomeStayContext);

    if (!context) {
        throw new Error(
            "useHomeStay phải được sử dụng bên trong HomeStayProvider"
        );
    }

    return context;
};
