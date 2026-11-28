import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

import type { DichVu } from "../types/dichVu";
import { searchDichVu } from "../services/dichVuService";

interface DichVuContextType {
    danhSachDichVu: DichVu[];
    danhSachDichVuHS: number[];

    dangTaiDichVu: boolean;

    setDanhSachDichVuHS: (ids: number[]) => void;
    toggleDichVu: (id: number) => void;
    resetDichVu: () => void;
    taiDanhSachDichVu: () => Promise<void>;
}

const DichVuContext = createContext<DichVuContextType | undefined>(undefined);

export const DichVuProvider = ({ children }: { children: ReactNode }) => {
    const [danhSachDichVu, setDanhSachDichVu] = useState<DichVu[]>([]);
    const [danhSachDichVuHS, setDanhSachDichVuHS] = useState<number[]>([]);
    const [dangTaiDichVu, setDangTaiDichVu] = useState(false);

    const taiDanhSachDichVu = async () => {
        try {
            setDangTaiDichVu(true);

            const response = await searchDichVu("", 0, 1000);

            setDanhSachDichVu(response.content);
        } catch (error) {
            console.error("Lỗi tải danh sách dịch vụ:", error);
        } finally {
            setDangTaiDichVu(false);
        }
    };

    useEffect(() => {
        taiDanhSachDichVu();
    }, []);

    const toggleDichVu = (id: number) => {
        setDanhSachDichVuHS((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const resetDichVu = () => {
        setDanhSachDichVuHS([]);
    };

    return (
        <DichVuContext.Provider
            value={{
                danhSachDichVu,
                danhSachDichVuHS,
                dangTaiDichVu,
                setDanhSachDichVuHS,
                toggleDichVu,
                resetDichVu,
                taiDanhSachDichVu,
            }}
        >
            {children}
        </DichVuContext.Provider>
    );
};

export const useDichVu = () => {
    const context = useContext(DichVuContext);

    if (!context) {
        throw new Error("useDichVu phải được sử dụng bên trong DichVuProvider");
    }

    return context;
};