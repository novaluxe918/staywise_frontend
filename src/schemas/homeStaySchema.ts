import z from "zod";

export const homeStaySchema = z.object({
    tenHomeStay: z.string().min(3, "Tên HomeStay phải có ít nhất 3 ký tự"),
    moTa: z.string().optional(),
    soDienThoai: z.string().regex(/^(0|\+84)[0-9]{9}$/, "Số điện thoại không hợp lệ"),
    email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
    diaChi: z.string().min(5, "Vui lòng nhập địa chỉ chi tiết"),
});

export type HomeStayFormValues = z.infer<typeof homeStaySchema>;
