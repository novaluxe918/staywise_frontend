
import type { DichVuRequest } from "../types/dichVu";
import api from "./api";

export const saveDichVu = async (data: DichVuRequest): Promise<string> => {
   const formData = new FormData();

   if (data.id != null) {
      formData.append("id", data.id.toString());
   }

   formData.append("tenDichVu", data.tenDichVu);

   const response = await api.post<string>("dichVu/save", formData)

   return response.data;
}

export const searchDichVu = async (tuKhoa: string,
   trang: number,
   kichThuoc: number) => {
   const response = await api.get("/dichVu/timKiem", {
      params: {
         tuKhoa,
         trang,
         kichThuoc
      }
   });

   return response.data;
}