
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { HomeStayOption } from "../types/homestay";
import { layDanhSachHomeStayDaDuyet } from "../services/homestayService";



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

    const [danhSachHomeStay, setDanhSachHomeStay] = useState<HomeStayOption[]>([]);

    const [homeStayDangChon, setHomeStayDangChon] = useState<number | "">("");

    const [dangTaiHomeStay, setDangTaiHomeStay] = useState(false);

    const taiLaiDanhSachHomeStay = async () => {
        try {
            setDangTaiHomeStay(true);

            const data = await layDanhSachHomeStayDaDuyet();

            setDanhSachHomeStay(data);

            // Giữ cơ sở đang chọn nếu vẫn còn trong danh sách được duyệt
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
        taiLaiDanhSachHomeStay();
    }, []);

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
