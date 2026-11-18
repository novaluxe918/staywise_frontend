

import type { CapNhatTrangThaiXacMinhRequest, NguoiDungQuanLy, NguoiDungRequest, NguoiDungResponse, NguoiDungSearchParams, OwnerRow } from "../types/nguoiDung";
import api, { type PageParams, type PageResponse } from "./api";

// Lấy thông tin
export const layThongTinNguoiDung = async () => {
    const response = await api.get<NguoiDungResponse>(
        "/nguoidung/thong-tin"
    );

    return response.data;
};

// Cập nhật thông tin
export const capNhatThongTinNguoiDung = async (
    data: NguoiDungRequest
) => {

    const formData = new FormData();

    formData.append("hoTen", data.hoTen);
    formData.append("soDienThoai", data.soDienThoai);

    if (data.anhDaiDien) {
        formData.append("anhDaiDien", data.anhDaiDien);
    }

    if (data.anhCCCDMatTruoc) {
        formData.append("anhCCCDMatTruoc", data.anhCCCDMatTruoc);
    }

    if (data.anhCCCDMatSau) {
        formData.append("anhCCCDMatSau", data.anhCCCDMatSau);
    }

    if (data.anhGiayPhepKinhDoanh) {
        formData.append(
            "anhGiayPhepKinhDoanh",
            data.anhGiayPhepKinhDoanh
        );
    }

    return await api.put(
        "/nguoidung/cap-nhat",
        formData
    );
};

export const capNhatAnhDaiDien = async(file: File) => {
     const formData = new FormData();

    formData.append("anhDaiDien", file);

    return await api.put(
        "/nguoidung/anhDaiDien",
        formData
    );
}

export const getDanhSachOwners = async (
    params: PageParams
): Promise<PageResponse<OwnerRow>> => {

    const response = await api.get<PageResponse<OwnerRow>>(
        "/admin/danhSachOwner",
        { params }
    );

    return response.data;
};


export const capNhatTrangThaiXacMinh = async (
    maNguoiDung: number,
    data: CapNhatTrangThaiXacMinhRequest
) => {
    const response = await api.put(
        `/admin/capNhatTrangThaiXacMinh/${maNguoiDung}`,
        data
    );

    return response.data;
};


export const getThongTinHoSo = async () => {
    const response = await api.get("/nguoidung/thong-bao");
    return response.data;
};

export const getThongTinNguoiDung = async(params: NguoiDungSearchParams): Promise<PageResponse<NguoiDungQuanLy>> => {
     const response = await api.get("nguoidung/show-all", {params})

     return response.data;
}