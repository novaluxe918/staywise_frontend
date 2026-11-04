import type { TienIch, TienIchRequest } from "../types/tienIch";
import api, { type PageResponse } from "./api";

export const saveTienIch = async (data: TienIchRequest): Promise<string> => {
    const formData = new FormData();

    formData.append("tenTienIch", data.tenTienIch);
    formData.append("moTa", data.moTa);
    formData.append("matheloai", String(data.matheloai));

    const response = await api.post<string>("/tienich/save", formData);

    return response.data;
}

export const getAllTienIch = async (
    tuKhoa: string = "",
    trang: number = 0,
    kichThuoc: number = 5
): Promise<PageResponse<TienIch>> => {
    const response = await api.get<PageResponse<TienIch>>("/tienich/timKiem", {
        params: { tuKhoa, trang, kichThuoc },
    });

    return response.data;
}