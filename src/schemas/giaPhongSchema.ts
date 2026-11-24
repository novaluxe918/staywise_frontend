import { z } from "zod";

export const giaPhongSchema = z
    .object({
        maPhong: z
            .number({
                error: "Vui lòng chọn phòng",
            })
            .positive("Vui lòng chọn phòng"),

        giaPhong: z
            .number({
                error: "Vui lòng nhập giá phòng",
            })
            .positive("Giá phòng phải lớn hơn 0"),

        ngayBatDau: z
            .string()
            .min(1, "Vui lòng chọn ngày bắt đầu"),

        ngayKetThuc: z
            .string()
            .min(1, "Vui lòng chọn ngày kết thúc"),
    })
    .refine(
        (data) =>
            new Date(data.ngayKetThuc) > new Date(data.ngayBatDau),
        {
            message: "Ngày kết thúc phải sau ngày bắt đầu",
            path: ["ngayKetThuc"],
        }
    );

export type GiaPhongFormData = z.infer<typeof giaPhongSchema>;