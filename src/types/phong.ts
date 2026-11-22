export type TheLoaiNguoi = "NGUOI_LON" | "TRE_EM";

export type LoaiPhong =
    | "PHONG_DON"
    | "PHONG_DOI"
    | "PHONG_GIA_DINH"
    | "PHONG_DORM"
    | "PHONG_VIP"
    | "PHONG_STUDIO"
    | "PHONG_BUNGALOW";

export const danhSachLoaiPhong: {
    value: LoaiPhong;
    label: string;
    description: string;
}[] = [
        {
            value: "PHONG_DON",
            label: "Phòng đơn",
            description: "Phù hợp 1 - 2 khách",
        },
        {
            value: "PHONG_DOI",
            label: "Phòng đôi",
            description: "Phù hợp 2 khách",
        },
        {
            value: "PHONG_GIA_DINH",
            label: "Phòng gia đình",
            description: "Phù hợp gia đình",
        },
        {
            value: "PHONG_DORM",
            label: "Phòng tập thể",
            description: "Phù hợp nhóm khách",
        },
        {
            value: "PHONG_VIP",
            label: "Phòng VIP",
            description: "Không gian cao cấp",
        },
        {
            value: "PHONG_STUDIO",
            label: "Phòng Studio",
            description: "Không gian tiện nghi",
        },
        {
            value: "PHONG_BUNGALOW",
            label: "Bungalow",
            description: "Không gian nghỉ dưỡng riêng",
        },
    ];


export interface ChiTietGiuongRequest {
    maLoaiGiuong: number;
    soLuong: number;
}

export interface SoNguoiRequest {
    id?: number;
    soLuong: number;
    theLoaiNguoi: TheLoaiNguoi;
}

export interface ChiTietGiuong {
    maLoaiGiuong: number;
    tenGiuong: string;
    soLuong: number;
}

export interface SoNguoi {
    id: number;
    soLuong: number;
    theLoaiNguoi: TheLoaiNguoi;
}


export interface Phong {
    id: number;
    maHomeStay: number;
    tenPhong: string;
    moTa: string;
    dienTich: number;
    loaiPhong: LoaiPhong;
    trangThaiPhong: string;
    ngayTao?: string;

    danhSachGiuong: ChiTietGiuong[];

    danhSachSoNguoi: SoNguoi[];
}

export interface PhongRequest {
    maHomeStay: number;
    tenPhong: string;
    moTa: string;
    dienTich: number;
    loaiPhong: LoaiPhong;
    danhSachGiuong: ChiTietGiuongRequest[];
    danhSachSoNguoi: SoNguoiRequest[];
}

export const danhSachTheLoaiNguoi: {
    value: TheLoaiNguoi;
    label: string;
}[] = [
        {
            value: "NGUOI_LON",
            label: "Người lớn",
        },
        {
            value: "TRE_EM",
            label: "Trẻ em",
        },
    ];