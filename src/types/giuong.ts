import type { TrangThai } from "./enums";

export interface LoaiGiuong {
    id: number;
    tenGiuong: string;
    hinhAnh: string;
    trangThai: TrangThai;
}

export interface LoaiGiuongDTO {
    id?: number;
    tenGiuong: string;
}