import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import type { Phong } from "../types/phong";
import { showAllPhong } from "../services/phongService";




interface PhongContextType {
    danhSachPhong: Phong[];
    loadingPhong: boolean;
    fetchDanhSachPhong: () => Promise<void>;
}


const PhongContext = createContext<PhongContextType | undefined>(undefined);


export const PhongProvider = ({ children }: { children: React.ReactNode }) => {

    const [danhSachPhong, setDanhSachPhong] = useState<Phong[]>([]);
    const [loadingPhong, setLoadingPhong] = useState(false);


    const fetchDanhSachPhong = async () => {
        try {
            setLoadingPhong(true);

            const response = await showAllPhong(0, 100);

            setDanhSachPhong(response.content ?? []);

        } catch (error) {
            console.error("Lỗi lấy danh sách phòng:", error);
        } finally {
            setLoadingPhong(false);
        }
    };

    useEffect(() => {
        fetchDanhSachPhong();
    }, []);

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