
import { z } from "zod";

export const phongSchema = z.object({
    tenPhong: z
        .string()
        .trim()
        .min(1, "Vui lòng nhập tên phòng"),

    loaiPhong: z
        .string()
        .min(1, "Vui lòng chọn loại phòng"),

    dienTich: z
        .string()
        .min(1, "Vui lòng nhập diện tích")
        .refine(
            value => Number(value) > 0,
            "Diện tích phải lớn hơn 0"
        ),

    moTa: z.string(),

    giuongDaChon: z
        .array(
            z.object({
                maLoaiGiuong: z.number(),
                soLuong: z.number().min(1).max(20),
            })
        )
        .min(1, "Vui lòng chọn ít nhất một loại giường"),

    danhSachSoNguoi: z
        .array(
            z.object({
                theLoaiNguoi: z.enum(["NGUOI_LON", "TRE_EM"]),
                soLuong: z.number().min(0),
            })
        )
        .refine(
            danhSach => danhSach.reduce(
                (tong, item) => tong + item.soLuong,
                0
            ) > 0,
            "Sức chứa phòng phải lớn hơn 0"
        ),
});

export type PhongFormData = z.infer<typeof phongSchema>;
