import type { LoaiGiuong } from "../types/giuong";
import api, { type PageResponse } from "./api";

export const saveLoaiGiuong = async (
    tenGiuong: string,
    file: File | null,
    id?: number,
) => {
    const formData = new FormData();

    if (id !== undefined) {
        formData.append("id", String(id));
    }

    formData.append("tenGiuong", tenGiuong);

    if (file) {
        formData.append("file", file);
    }

    const response = await api.post(`giuong/save`, formData);

    return response.data;
}

export const showAllGiuong = async (
    tuKhoa: string,
    trang: number,
    kichThuoc: number
): Promise<PageResponse<LoaiGiuong>> => {
    const response = await api.get(
        `giuong/timkiem`,
        {
            params: {
                tuKhoa,
                trang,
                kichThuoc,
            },
        }
    );

    return response.data;
};

export const xoaLoaiGiuong = async (id: number) => {
    const response = await api.delete(`giuong/xoa/${id}`);
    return response.data;
};