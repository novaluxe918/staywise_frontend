
import type { TheLoaiTienIch, TheLoaiTienIchDTO, TheLoaiTienIchResponse } from "../types/theLoaiTienIch";
import api, { type PageResponse } from "./api";

export const saveTheLoai = async (
    dto: TheLoaiTienIchDTO,
    file: File | null
): Promise<TheLoaiTienIchResponse> => {

    const formData = new FormData();

    if (dto.id !== undefined && dto.id !== null) {
        formData.append("id", String(dto.id));
    }

    formData.append("tenTheLoai", dto.tenTheLoai);

    if (file) {
        formData.append("file", file);
    }

    const response = await api.post<TheLoaiTienIchResponse>(
        "/theloaitienich/save",
        formData
    );

    return response.data;
};


export const getAllTheLoai = async (): Promise<TheLoaiTienIch[]> => {
    const response = await api.get<PageResponse<TheLoaiTienIch>>(
        "/theloaitienich/search",
        {
            params: {
                tuKhoa: "",
                trang: 0,
                kichThuoc: 100
            }
        }
    );

    console.log("Dữ liệu API trả về:", response.data);

    return response.data.content;
};