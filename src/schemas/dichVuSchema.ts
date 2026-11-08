import { z } from "zod";

export const dichVuSchema = z.object({
    tenDichVu: z
        .string()
        .trim()
        .min(1, "Tên dịch vụ không được để trống")
        .max(100, "Tên dịch vụ không được vượt quá 100 ký tự")
});

export type DichVuFormValues = z.infer<typeof dichVuSchema>;