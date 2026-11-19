
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { HomeStayOption } from "../types/homestay";
import { layDanhSachHomeStayDaDuyet } from "../services/homestayService";
import { useAuth } from "./AuthContext"; // Sửa đường dẫn nếu cần

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

interface Props {
    children: ReactNode;
}

export const HomeStayProvider = ({ children }: Props) => {

    const { nguoiDung } = useAuth();

    const [danhSachHomeStay, setDanhSachHomeStay] =
        useState<HomeStayOption[]>([]);

    const [homeStayDangChon, setHomeStayDangChon] =
        useState<number | "">("");

    const [dangTaiHomeStay, setDangTaiHomeStay] = useState(false);

    // Tải danh sách HomeStay
    const taiLaiDanhSachHomeStay = async () => {
        try {
            setDangTaiHomeStay(true);

            const data = await layDanhSachHomeStayDaDuyet();

            setDanhSachHomeStay(data);

            setHomeStayDangChon((current) => {
                const conHopLe = data.some(
                    (item) => item.id === current
                );

                if (conHopLe) return current;

                return data.length > 0 ? data[0].id : "";
            });

        } catch (error) {
            console.error("Lỗi lấy danh sách HomeStay:", error);
            setDanhSachHomeStay([]);
            setHomeStayDangChon("");
        } finally {
            setDangTaiHomeStay(false);
        }
    };


    useEffect(() => {
        let isMounted = true;

        const taiDanhSach = async () => {

        
            if (!nguoiDung?.id) {
                setDanhSachHomeStay([]);
                setHomeStayDangChon("");
                setDangTaiHomeStay(false);
                return;
            }

            try {
                setDangTaiHomeStay(true);

              
                setDanhSachHomeStay([]);
                setHomeStayDangChon("");

                const data = await layDanhSachHomeStayDaDuyet();

                if (!isMounted) return;

                setDanhSachHomeStay(data);

                setHomeStayDangChon(
                    data.length > 0 ? data[0].id : ""
                );

            } catch (error) {
                if (!isMounted) return;

                console.error("Lỗi lấy danh sách HomeStay:", error);

                setDanhSachHomeStay([]);
                setHomeStayDangChon("");

            } finally {
                if (isMounted) {
                    setDangTaiHomeStay(false);
                }
            }
        };

        taiDanhSach();

        return () => {
            isMounted = false;
        };

    }, [nguoiDung?.id]);

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
