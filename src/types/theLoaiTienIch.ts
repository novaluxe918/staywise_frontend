
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


