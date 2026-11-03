import { z } from "zod";
import type { th } from "zod/v4/locales";

export const theLoaiTienIchSchema = z.object({
    tenTheLoai : z
     .string()
        .trim()
        .min(1, "Vui lòng nhập tên thể loại tiện ích")
        .min(3, "Tên thể loại phải có ít nhất 3 ký tự")
        .max(100, "Tên thể loại không được vượt quá 100 ký tự"),
});

export type TheLoaiTienIchForm = z.infer<typeof theLoaiTienIchSchema>;

