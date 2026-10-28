import type { PhuongXa, TinhThanh } from "../types/diaChi"
import api from "./api"

export const layDanhSachTinhThanh = async (): Promise<TinhThanh[]> => {
    const response = await api.get<TinhThanh[]>("hanh-chinh/tinh-thanh");
    return response.data;
}

export const layDanhSachPhuongXa = async (
  maTinhThanh: number
): Promise<PhuongXa[]> => {
  const response = await api.get<PhuongXa[]>(
    `/hanh-chinh/phuong-xa/${maTinhThanh}`
  );
  return response.data;
};