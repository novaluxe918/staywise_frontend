export interface NguoiDungResponse {
    hoTen: string;
    email: string;
    soDienThoai: string | null;
    anhDaiDien: string | null;
    anhCCCDMatTruoc: string | null;
    anhCCCDMatSau: string | null;
    anhGiayPhepKinhDoanh: string | null;
    trangThaiXacMinh: string;
    lyDoTuChoiXacMinh: string | null;
}

export interface NguoiDungRequest {
    hoTen: string;
    soDienThoai: string;
    anhDaiDien?: File | null;
    anhCCCDMatTruoc?: File | null;
    anhCCCDMatSau?: File | null;
    anhGiayPhepKinhDoanh?: File | null;
}

export interface OwnerRow extends NguoiDungResponse {
    id: number;
}

export interface CapNhatTrangThaiXacMinhRequest {
    trangThaiXacMinh: "CHUA_XAC_MINH" | "CHO_XAC_MINH" | "DA_XAC_MINH" | "TU_CHOI";
    lyDoTuChoiXacMinh?: string | null;
}