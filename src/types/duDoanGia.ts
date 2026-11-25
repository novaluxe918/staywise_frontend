export interface LichSuDoanGia {
    id: number;
    maPhong: number;
    tenPhong: string;
    tenHomeStay: string;
    ngayDuDoan: string;
    ngayApDung: string;
    giaDuDoan: number;
    doTinCay: number;
    phienBan: string;
}

export interface DuDoanGiaRequest {
    maPhong: number;
    ngayApDung: string;
}


export interface DuDoanGiaResponse {
    id: number;
    maPhong: number;
    ngayApDung: string;
    giaHienTai: number;
    giaDuDoan: number;
    doTinCay: number;
    phienBan: string;
}
