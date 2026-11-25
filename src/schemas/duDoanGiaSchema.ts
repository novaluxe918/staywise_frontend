
import { z } from "zod";

export const duDoanGiaSchema = z.object({
    maPhong: z
        .string()
        .min(1, "Vui lòng chọn phòng"),

    ngayApDung: z
        .string()
        .min(1, "Vui lòng chọn ngày áp dụng"),
});

export type DuDoanGiaFormData = z.infer<typeof duDoanGiaSchema>;
