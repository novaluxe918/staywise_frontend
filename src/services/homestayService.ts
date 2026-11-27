import type { HomeStay, HomeStayOption, TheLoaiHomeStayResponse } from "../types/homestay";
import api, { type PageResponse } from "./api";

export const dangKyHomeStay = (formData: FormData) => {

    return api.post("/homestay/save", formData);
}

export const getAllTheLoaiHomeStay = async (): Promise<TheLoaiHomeStayResponse[]> => {
    const response = await api.get<TheLoaiHomeStayResponse[]>(
        "/homestay/theloai"
    );

    return response.data;
};

export const getDanhSachHomeStay = async (tuKhoa: string,
    trang: number,
    kichThuoc: number): Promise<PageResponse<HomeStay>> => {
    const response = await api.get<PageResponse<HomeStay>>(
        "homestay/timKiem",
        {
            params: {
                tuKhoa,
                trang,
                kichThuoc
            }
        }
    );
    return response.data;
};

export const duyetHomeStay = async (id: number) => {
    return await api.put(`/admin/duyet/${id}`);
}

export const tuChoiHomeStay = async (id: number,
    lyDoTuChoi: string) => {
    return await api.put(
        `/admin/tuChoi/${id}`,
        { lyDoTuChoi }
    );
}

export const layDanhSachHomeStayDaDuyet =
    async (): Promise<HomeStayOption[]> => {

        const response = await api.get<HomeStayOption[]>(
            "/homestay/da-duyet"
        );

        return response.data;
    };

export const layThongTinHomeStay = async(id: number): Promise<HomeStay>  => {
   
    const response = await api.get<HomeStay>(`homestay/${id}`);

    return response.data;
}

export const layHomeStayTheoTheLoai = async (
    theLoai: string
): Promise<HomeStay[]> => {
    const response = await api.get<HomeStay[]>(
        "/homestay/the-loai",
        {
            params: { theLoai },
        }
    );

    return response.data;
}