import type { Phong, PhongRequest } from "../types/phong";
import api, { type PageResponse } from "./api";

export const savePhong = async (data: PhongRequest) => {
    const formData = new FormData();

    // Nếu có ID thì gửi lên để cập nhật
    if (data.id) {
        formData.append("id", String(data.id));
    }

    formData.append("maHomeStay", String(data.maHomeStay));
    formData.append("tenPhong", data.tenPhong);
    formData.append("moTa", data.moTa);
    formData.append("dienTich", String(data.dienTich));
    formData.append("loaiPhong", data.loaiPhong);

    // Danh sách giường
    data.danhSachGiuong.forEach((item, index) => {
        formData.append(
            `danhSachGiuong[${index}].maLoaiGiuong`,
            String(item.maLoaiGiuong)
        );

        formData.append(
            `danhSachGiuong[${index}].soLuong`,
            String(item.soLuong)
        );
    });

    // Danh sách sức chứa
    data.danhSachSoNguoi.forEach((item, index) => {
        formData.append(
            `danhSachSoNguoi[${index}].theLoaiNguoi`,
            item.theLoaiNguoi
        );

        formData.append(
            `danhSachSoNguoi[${index}].soLuong`,
            String(item.soLuong)
        );
    });

    const response = await api.post("/phong/save", formData);

    return response.data;
};

export const showAllPhong = async (
    trang: number,
    kichThuoc: number
): Promise<PageResponse<Phong>> => {
    const response = await api.get("/phong/timKiem", {
        params: {
            trang,
            kichThuoc,
        },
    });

    return response.data;
};

export const xoaPhong = async (id: number) => {
    const response = await api.delete(`/phong/xoa/${id}`);
    return response.data;
};