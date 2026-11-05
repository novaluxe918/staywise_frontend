import api, { type PageResponse } from "../services/api";
import type { TrangThai } from "./enums";

export interface TheLoaiTienIchDTO{
    id?: number | null;
    tenTheLoai: string;
    hinhAnh?: string;
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