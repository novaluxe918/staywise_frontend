import type { TrangThai } from "./enums";

export interface DichVuRequest{
    id?: number | null;
    tenDichVu: string;
}

export interface DichVu{
    id:number;
    tenDichVu: string;
    trangThai: TrangThai;
}