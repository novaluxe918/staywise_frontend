
import React, { useEffect, useState } from "react";
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
import type { GiaPhongTheoPhong } from "../../../types/giaPhong";
import { getGiaPhongByMaPhong } from "../../../services/giaPhongservice";


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
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<DuDoanGiaFormData>({
        resolver: zodResolver(duDoanGiaSchema),
        defaultValues: {
            maPhong: "",
            ngayApDung: "",
        },
    });

    const maPhong = watch("maPhong");


    const [danhSachKhoangGia, setDanhSachKhoangGia] =
        useState<GiaPhongTheoPhong[]>([]);

   
    const [loadingNgay, setLoadingNgay] = useState(false);

    useEffect(() => {
        const fetchGiaPhong = async () => {
            setValue("ngayApDung", "");

            if (!maPhong) {
                setDanhSachKhoangGia([]);
                return;
            }

            try {
                setLoadingNgay(true);

                const data = await getGiaPhongByMaPhong(
                    Number(maPhong)
                );

                setDanhSachKhoangGia(data);
            } catch (error) {
                console.error("Lỗi lấy khoảng giá phòng:", error);
                setDanhSachKhoangGia([]);
            } finally {
                setLoadingNgay(false);
            }
        };

        fetchGiaPhong();
    }, [maPhong, setValue]);

    
    const danhSachNgay = Array.from(
        new Set(
            danhSachKhoangGia.flatMap((gia) => {
                const ngayBatDau = new Date(gia.ngayBatDau);
                const ngayKetThuc = new Date(gia.ngayKetThuc);

                const ngay = new Date(
                    ngayBatDau.getFullYear(),
                    ngayBatDau.getMonth(),
                    ngayBatDau.getDate()
                );

                const ngayCuoi = new Date(
                    ngayKetThuc.getFullYear(),
                    ngayKetThuc.getMonth(),
                    ngayKetThuc.getDate()
                );

                const cacNgay: string[] = [];

                while (ngay <= ngayCuoi) {
                    const nam = ngay.getFullYear();
                    const thang = String(
                        ngay.getMonth() + 1
                    ).padStart(2, "0");

                    const ngayTrongThang = String(
                        ngay.getDate()
                    ).padStart(2, "0");

                    cacNgay.push(
                        `${nam}-${thang}-${ngayTrongThang}`
                    );

                    ngay.setDate(ngay.getDate() + 1);
                }

                return cacNgay;
            })
        )
    ).sort();

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
                {/* CHỌN PHÒNG */}
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

                {/* CHỌN NGÀY ÁP DỤNG */}
                <Controller
                    name="ngayApDung"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            select
                            fullWidth
                            size="small"
                            label="Chọn ngày áp dụng giá"
                            disabled={
                                !maPhong ||
                                loadingNgay ||
                                danhSachNgay.length === 0
                            }
                            error={!!errors.ngayApDung}
                            helperText={
                                errors.ngayApDung?.message ||
                                (loadingNgay
                                    ? "Đang tải ngày áp dụng..."
                                    : !maPhong
                                        ? "Vui lòng chọn phòng trước"
                                        : danhSachNgay.length === 0
                                            ? "Phòng chưa có lịch áp dụng giá"
                                            : `${danhSachNgay.length} ngày có thể áp dụng giá`)
                            }
                        >
                            {danhSachNgay.map((ngay) => (
                                <MenuItem
                                    key={ngay}
                                    value={ngay}
                                >
                                    {new Date(
                                        `${ngay}T00:00:00`
                                    ).toLocaleDateString("vi-VN")}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />

                {/* NÚT DỰ ĐOÁN */}
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading || loadingNgay}
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
                    {loading
                        ? "Đang phân tích..."
                        : "Dự đoán giá phòng"}
                </Button>
            </Stack>
        </Box>
    );
};

export default FormDuDoanGia;
