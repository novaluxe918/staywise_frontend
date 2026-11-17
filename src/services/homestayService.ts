import type { HomeStay, TheLoaiHomeStayResponse } from "../types/homestay";
import api, { type PageResponse } from "./api";

export const dangKyHomeStay = (formData: FormData) => {

    return api.post("/homestay/save", formData);
}

export const getAllTheLoaiHomeStay = async (): Promise<TheLoaiHomeStayResponse[]> => {
    const response = await api.get<TheLoaiHomeStayResponse[]>(
        "/homestay/theloai"
    );

    return response.data;
};

export const getDanhSachHomeStay = async (tuKhoa: string,
    trang: number,
    kichThuoc: number): Promise<PageResponse<HomeStay>> => {
    const response = await api.get<PageResponse<HomeStay>>(
        "homestay/timKiem",
        {
            params: {
                tuKhoa,
                trang,
                kichThuoc
            }
        }
    );
    return response.data;
};