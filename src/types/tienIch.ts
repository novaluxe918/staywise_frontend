import type { TrangThai } from "./enums";
import type { TheLoaiTienIch } from "./theLoaiTienIch";

export interface TienIchRequest {
      id?: number | null;
    tenTienIch: string;
    moTa: string;
     matheloai: number | "";
}

export interface TienIch{
     id: number;
    tenTienIch: string;
    moTa: string;
    ngayTao: string;
    matheloai: number;
    theLoaiTienIch?: TheLoaiTienIch;
    trangThai: TrangThai;
}