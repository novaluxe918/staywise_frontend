import type { GiaPhong, GiaPhongRequest } from "../types/giaPhong";
import api, { type PageResponse } from "./api";

export const saveGiaPhong = async (data: GiaPhongRequest) => {
    const formData = new FormData();

    if (data.id != null) {
        formData.append("id", String(data.id));
    }

    if (data.maPhong != null) {
        formData.append("maPhong", String(data.maPhong));
    }

    if (data.giaPhong != null) {
        formData.append("giaPhong", String(data.giaPhong));
    }

    if (data.ngayBatDau) {
        formData.append("ngayBatDau", data.ngayBatDau);
    }

    if (data.ngayKetThuc) {
        formData.append("ngayKetThuc", data.ngayKetThuc);
    }

    const response = await api.post(
        `giaPhong/save`,
        formData
    );

    return response.data;
};

export const showAllGiaPhong = async (
    tuKhoa: string,
    trang: number,
    kichThuoc: number
): Promise<PageResponse<GiaPhong>> => {

    const response = await api.get("/giaPhong/show-all", {
        params: {
            tuKhoa,
            trang,
            kichThuoc,
        },
    });

    return response.data;
};


export const deleteGiaPhong = async (id: number): Promise<string> => {
    const response = await api.delete(`/giaphong/xoa/${id}`);
    return response.data;
};