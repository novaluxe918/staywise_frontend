import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

import type { TienIch } from "../types/tienIch";
import { getAllTienIch } from "../services/tienIchService";

interface TienIchContextType {
    danhSachTienIch: TienIch[];
    danhSachTienIchHS: number[];

    dangTaiTienIch: boolean;

    setDanhSachTienIchHS: (ids: number[]) => void;
    toggleTienIch: (id: number) => void;
    resetTienIch: () => void;
    taiDanhSachTienIch: () => Promise<void>;
}

const TienIchContext = createContext<TienIchContextType | undefined>(undefined);

export const TienIchProvider = ({ children }: { children: ReactNode }) => {
    const [danhSachTienIch, setDanhSachTienIch] = useState<TienIch[]>([]);
    const [danhSachTienIchHS, setDanhSachTienIchHS] = useState<number[]>([]);
    const [dangTaiTienIch, setDangTaiTienIch] = useState(false);

    const taiDanhSachTienIch = async () => {
        try {
            setDangTaiTienIch(true);

            const response = await getAllTienIch("", 0, 1000);

            setDanhSachTienIch(response.content);
        } catch (error) {
            console.error("Lỗi tải danh sách tiện ích:", error);
        } finally {
            setDangTaiTienIch(false);
        }
    };

    useEffect(() => {
        taiDanhSachTienIch();
    }, []);

    const toggleTienIch = (id: number) => {
        setDanhSachTienIchHS((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const resetTienIch = () => {
        setDanhSachTienIchHS([]);
    };

    return (
        <TienIchContext.Provider
            value={{
                danhSachTienIch,
                danhSachTienIchHS,
                dangTaiTienIch,
                setDanhSachTienIchHS,
                toggleTienIch,
                resetTienIch,
                taiDanhSachTienIch,
            }}
        >
            {children}
        </TienIchContext.Provider>
    );
};

export const useTienIch = () => {
    const context = useContext(TienIchContext);

    if (!context) {
        throw new Error("useTienIch phải được sử dụng bên trong TienIchProvider");
    }

    return context;
};