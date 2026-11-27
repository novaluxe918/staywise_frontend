
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    useRef,
} from "react";

import type { Phong } from "../types/phong";
import { showAllPhong } from "../services/phongService";
import { useHomeStay } from "./HomeStayContext";
import { useAuth } from "./AuthContext";

interface PhongContextType {
    danhSachPhong: Phong[];
    loadingPhong: boolean;
    fetchDanhSachPhong: () => Promise<void>;
}

const PhongContext = createContext<PhongContextType | undefined>(undefined);

export const PhongProvider = ({ children }: { children: React.ReactNode }) => {
    const { homeStayDangChon, dangTaiHomeStay } = useHomeStay();
    const { nguoiDung } = useAuth();

    const [danhSachPhong, setDanhSachPhong] = useState<Phong[]>([]);
    const [loadingPhong, setLoadingPhong] = useState(false);

    const requestIdRef = useRef(0);

    const fetchDanhSachPhong = useCallback(async () => {
        const requestId = ++requestIdRef.current;

        // Chưa đăng nhập hoặc HomeStay chưa tải xong
        if (!nguoiDung?.id || dangTaiHomeStay) {
            setDanhSachPhong([]);
            setLoadingPhong(false);
            return;
        }

        // Chưa có HomeStay được chọn
        if (typeof homeStayDangChon !== "number") {
            setDanhSachPhong([]);
            setLoadingPhong(false);
            return;
        }

        try {
            setLoadingPhong(true);
            setDanhSachPhong([]);

            const response = await showAllPhong(
                0,
                100,
                homeStayDangChon
            );

            // Bỏ qua kết quả của request cũ
            if (requestId !== requestIdRef.current) return;

            setDanhSachPhong(response.content ?? []);

        } catch (error) {
            if (requestId !== requestIdRef.current) return;

            console.error("Lỗi lấy danh sách phòng:", error);
            setDanhSachPhong([]);

        } finally {
            if (requestId === requestIdRef.current) {
                setLoadingPhong(false);
            }
        }
    }, [nguoiDung?.id, homeStayDangChon, dangTaiHomeStay]);

    useEffect(() => {
        void fetchDanhSachPhong();

        return () => {
            requestIdRef.current++;
        };
    }, [fetchDanhSachPhong]);

    return (
        <PhongContext.Provider
            value={{
                danhSachPhong,
                loadingPhong,
                fetchDanhSachPhong,
            }}
        >
            {children}
        </PhongContext.Provider>
    );
};

export const usePhong = () => {
    const context = useContext(PhongContext);

    if (!context) {
        throw new Error("usePhong phải được sử dụng bên trong PhongProvider");
    }

    return context;
};
