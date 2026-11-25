import type { DuDoanGiaRequest, DuDoanGiaResponse, LichSuDoanGia } from "../types/duDoanGia";
import api from "./api"

export const timKiemLichSu = async (maPhong?: number,
    ngayApDung?: string
): Promise<LichSuDoanGia[]> => {
    const response = await api.get("/du-doan-gia/tim-kiem-lich-su", {
        params: {
            maPhong,
            ngayApDung
        }
    });

    return response.data;
}

export const duDoanGia = async (request: DuDoanGiaRequest): Promise<DuDoanGiaResponse> => {
    const response = await api.post(
        "/du-doan-gia/du-doan",
        request
    );

    return response.data;


}