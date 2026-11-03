import api from "../services/api";
import type { TrangThai } from "./enums";

export interface TheLoaiTienIchDTO{
    id?: number | null;
    tenTheLoai: string;
    hinhAnh?: string;
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}


export interface TheLoaiTienIch{
    id:number;
    tenTheLoai: string;
    hinhAnh: string;
    trangThai: TrangThai;

}

export interface TheLoaiTienIchResponse {
    message: string;
}

export interface PageResponse<T> {
    content: T[];

    page: {
        size: number;
        number: number;
        totalElements: number;
        totalPages: number;
    };
}

export const searchTheLoai = async (
    tuKhoa: string = '',
    trang: number = 0,
    kichThuoc: number = 5
): Promise<PageResponse<TheLoaiTienIch>> => {
    const response = await api.get<PageResponse<TheLoaiTienIch>>('/theloaitienich/search', {
        params: {
            tuKhoa,
            trang,
            kichThuoc,
        },
    });
    return response.data;
};