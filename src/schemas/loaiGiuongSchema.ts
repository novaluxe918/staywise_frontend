import { z } from "zod";

export const loaiGiuongSchema = z.object({
    tenGiuong: z
        .string()
        .trim()
        .min(1, "Vui lòng nhập tên loại giường!")
        .max(100, "Tên loại giường không được vượt quá 100 ký tự!"),
});

export type LoaiGiuongFormData = z.infer<typeof loaiGiuongSchema>;