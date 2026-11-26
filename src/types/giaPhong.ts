export interface GiaPhongRequest {
    id?: number | null;
    maPhong?: number;
    giaPhong?: number;
    ngayBatDau?: string;
    ngayKetThuc?: string;
}

export interface GiaPhong {
    id: number;
    maPhong: number;
    tenPhong: string;
    giaPhong: number;
    ngayBatDau: string;
    ngayKetThuc: string;
}

export interface GiaPhongTheoPhong {
    id: number;
    maPhong: number;
    tenPhong: string;
    giaPhong: number;
    ngayBatDau: string;
    ngayKetThuc: string;
}
