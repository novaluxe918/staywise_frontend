
import React from "react";
import {
    Box,
    Button,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";
import { Sparkles } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    duDoanGiaSchema,
    type DuDoanGiaFormData,
} from "../../../schemas/duDoanGiaSchema";

interface Props {
    danhSachPhong?: { id: number; tenPhong: string }[];
    onSubmit: (data: DuDoanGiaFormData) => void;
    loading?: boolean;
}

const FormDuDoanGia: React.FC<Props> = ({
    danhSachPhong = [],
    onSubmit,
    loading = false,
}) => {
    const { control, handleSubmit, formState: { errors } } =
        useForm<DuDoanGiaFormData>({
            resolver: zodResolver(duDoanGiaSchema),
            defaultValues: {
                maPhong: "",
                ngayApDung: "",
            },
        });

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
                <Controller
                    name="maPhong"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            select
                            fullWidth
                            size="small"
                            label="Chọn phòng"
                            error={!!errors.maPhong}
                            helperText={
                                errors.maPhong?.message ||
                                (danhSachPhong.length === 0
                                    ? "Chưa có danh sách phòng"
                                    : "")
                            }
                        >
                            {danhSachPhong.map((phong) => (
                                <MenuItem
                                    key={phong.id}
                                    value={String(phong.id)}
                                >
                                    {phong.tenPhong}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />

                <Controller
                    name="ngayApDung"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            size="small"
                            type="date"
                            label="Ngày áp dụng giá"
                            slotProps={{
                                inputLabel: { shrink: true },
                            }}
                            error={!!errors.ngayApDung}
                            helperText={errors.ngayApDung?.message}
                        />
                    )}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={<Sparkles size={18} />}
                    sx={{
                        py: 1.3,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 700,
                        background: "linear-gradient(90deg, #2563EB, #7C3AED)",
                        boxShadow: "none",
                        "&:hover": {
                            background: "linear-gradient(90deg, #1D4ED8, #6D28D9)",
                            boxShadow: "none",
                        },
                    }}
                >
                    {loading ? "Đang phân tích..." : "Dự đoán giá phòng"}
                </Button>
            </Stack>
        </Box>
    );
};

export default FormDuDoanGia;
