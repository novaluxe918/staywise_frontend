import z from "zod";

export const tienIchSchema = z.object({
    matheloai: z
    .union([z.number(), z.string()])
    .refine((val) => val !== "" && !isNaN(Number(val)) && Number(val) > 0, {
      message: "Vui lòng chọn thể loại tiện ích",
    })
    .transform((val) => Number(val)),
  tenTienIch: z
    .string()
    .trim()
    .min(1, "Tên tiện ích không được để trống")
    .max(60, "Tên tiện ích tối đa 60 ký tự"),
  moTa: z
    .string()
    .trim()
    .max(500, "Mô tả tối đa 500 ký tự")
    .optional()
    .default(""),
})

export type TienIchFormValues = z.infer<typeof tienIchSchema>;