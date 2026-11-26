
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";

import type { Phong } from "../types/phong";
import { showAllPhong } from "../services/phongService";
import { useHomeStay } from "./HomeStayContext";

interface PhongContextType {
    danhSachPhong: Phong[];
    loadingPhong: boolean;
    fetchDanhSachPhong: () => Promise<void>;
}

const PhongContext = createContext<PhongContextType | undefined>(undefined);

export const PhongProvider = ({ children }: { children: React.ReactNode }) => {
    const { homeStayDangChon } = useHomeStay();

    const [danhSachPhong, setDanhSachPhong] = useState<Phong[]>([]);
    const [loadingPhong, setLoadingPhong] = useState(false);

    const fetchDanhSachPhong = useCallback(async () => {
        if (typeof homeStayDangChon !== "number") {
            setDanhSachPhong([]);
            return;
        }

        try {
            setLoadingPhong(true);

            const response = await showAllPhong(
                0,
                100,
                homeStayDangChon
            );

            setDanhSachPhong(response.content ?? []);

        } catch (error) {
            console.error("Lỗi lấy danh sách phòng:", error);
            setDanhSachPhong([]);
        } finally {
            setLoadingPhong(false);
        }
    }, [homeStayDangChon]);

    useEffect(() => {
        fetchDanhSachPhong();
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
