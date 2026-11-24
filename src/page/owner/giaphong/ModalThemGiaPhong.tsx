
import React, { useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Box, Button, TextField, Typography, IconButton,
    Divider, Stack, MenuItem, InputAdornment, Paper
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import type { GiaPhong, GiaPhongRequest } from "../../../types/giaPhong";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    giaPhongSchema,
    type GiaPhongFormData
} from "../../../schemas/giaPhongSchema";
import type { PhongOption } from "../../../types/phong";

interface Props {
    open: boolean;
    onClose: () => void;
    danhSachPhong: PhongOption[];
    onSubmit: (data: GiaPhongRequest) => Promise<void>;
    duLieuUpdate: GiaPhong | null;

}

const GREEN = "#15803D";

const inputStyle = {
    "& .MuiOutlinedInput-root": {
        borderRadius: 2.5,
        backgroundColor: "#fff",
        "& fieldset": { borderColor: "#D1E7D5" },
        "&:hover fieldset": { borderColor: "#86C99A" },
        "&.Mui-focused fieldset": {
            borderColor: GREEN,
            borderWidth: 1.5
        }
    },
    "& .MuiInputBase-input": { fontSize: 14, py: 1.7 }
};

const labelStyle = {
    fontSize: 13.5,
    fontWeight: 650,
    color: "#334155",
    mb: 1,
    display: "flex",
    alignItems: "center",
    gap: 0.8
};

function FieldLabel({ children, icon }: {
    children: React.ReactNode;
    icon: React.ReactNode;
}) {
    return (
        <Typography sx={labelStyle}>
            {icon}
            {children}
            <Box component="span" color="error.main">*</Box>
        </Typography>
    );
}

function ModalThemGiaPhong({
    open, onClose, danhSachPhong, onSubmit, duLieuUpdate
}: Props) {

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<GiaPhongFormData>({
        resolver: zodResolver(giaPhongSchema),
        defaultValues: {
            maPhong: undefined,
            giaPhong: undefined,
            ngayBatDau: "",
            ngayKetThuc: "",
        },
    });

    useEffect(() => {
        if (!open) return;

        if (duLieuUpdate) {
            reset({
                maPhong: duLieuUpdate.maPhong,
                giaPhong: duLieuUpdate.giaPhong,
                ngayBatDau: duLieuUpdate.ngayBatDau?.slice(0, 16) ?? "",
                ngayKetThuc: duLieuUpdate.ngayKetThuc?.slice(0, 16) ?? "",
            });
        } else {
            reset({
                maPhong: undefined,
                giaPhong: undefined,
                ngayBatDau: "",
                ngayKetThuc: "",
            });
        }
    }, [open, duLieuUpdate, reset]);

    const handleClose = () => {
        reset();
        onClose();
    };

    const onFormSubmit = async (data: GiaPhongFormData) => {
        try {
            await onSubmit({
                id: duLieuUpdate?.id,
                maPhong: data.maPhong,
                giaPhong: data.giaPhong,
                ngayBatDau: data.ngayBatDau + ":00",
                ngayKetThuc: data.ngayKetThuc + ":00",
            });

            handleClose();
        } catch (error) {
            console.error("Lỗi lưu giá phòng:", error);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 4,
                        overflow: "hidden",
                        boxShadow: "0 24px 70px rgba(21,128,61,0.16)"
                    }
                }
            }}
        >
            <DialogTitle sx={{
                background: "linear-gradient(120deg, #14532D, #15803D, #22A052)",
                color: "#fff",
                px: 3,
                py: 2.5
            }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{
                        width: 50, height: 50, borderRadius: 3,
                        bgcolor: "rgba(255,255,255,0.18)",
                        display: "grid", placeItems: "center"
                    }}>
                        <BedOutlinedIcon sx={{ fontSize: 29 }} />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: 21, fontWeight: 750 }}>
                            {duLieuUpdate ? "Cập nhật giá phòng" : "Thêm giá phòng"}
                        </Typography>
                        <Typography sx={{ fontSize: 12.5, opacity: 0.85 }}>
                            {duLieuUpdate
                                ? "Điều chỉnh thông tin và mức giá áp dụng cho phòng"
                                : "Thiết lập mức giá áp dụng cho phòng"}
                        </Typography>
                    </Box>

                    <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ p: 3, bgcolor: "#FCFFFC" }}>
                <Stack spacing={2.5}>

                    <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                        Vui lòng cung cấp thông tin để thiết lập giá phòng.
                    </Typography>

                    {/* CHỌN PHÒNG */}
                    <Box>
                        <FieldLabel icon={<BedOutlinedIcon sx={{ color: GREEN }} />}>
                            Phòng áp dụng
                        </FieldLabel>

                        <TextField
                            select
                            fullWidth
                            sx={inputStyle}
                            value={watch("maPhong") ?? ""}
                            onChange={e => setValue(
                                "maPhong",
                                e.target.value === "" ? undefined as never : Number(e.target.value),
                                { shouldValidate: true, shouldDirty: true }
                            )}
                            error={!!errors.maPhong}
                            helperText={errors.maPhong?.message}
                            slotProps={{ select: { displayEmpty: true } }}
                        >
                            <MenuItem value="" disabled>
                                Chọn phòng muốn thiết lập giá
                            </MenuItem>

                            {danhSachPhong.map(phong => (
                                <MenuItem key={phong.id} value={phong.id}>
                                    {phong.tenPhong}
                                </MenuItem>
                            ))}
                        </TextField>

                        {danhSachPhong.length === 0 && (
                            <Typography color="warning.main" sx={{ fontSize: 12, mt: 1 }}>
                                Chưa có phòng nào được tạo.
                            </Typography>
                        )}
                    </Box>

                    {/* GIÁ PHÒNG */}
                    <Box>
                        <FieldLabel icon={<PaymentsOutlinedIcon sx={{ color: GREEN }} />}>
                            Giá phòng
                        </FieldLabel>

                        <TextField
                            fullWidth
                            type="number"
                            placeholder="Nhập giá phòng"
                            {...register("giaPhong", { valueAsNumber: true })}
                            error={!!errors.giaPhong}
                            helperText={errors.giaPhong?.message}
                            sx={inputStyle}
                            slotProps={{
                                htmlInput: { min: 1 },
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">₫</InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Typography sx={{ color: GREEN, fontSize: 12, fontWeight: 700 }}>
                                                VNĐ
                                            </Typography>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    </Box>

                    {/* THỜI GIAN */}
                    <Box>
                        <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
                            <CalendarMonthOutlinedIcon sx={{ color: GREEN }} />
                            <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#14532D" }}>
                                Thời gian áp dụng
                            </Typography>
                        </Stack>

                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                            gap: 2
                        }}>
                            <Box>
                                <FieldLabel icon={<></>}>Ngày bắt đầu</FieldLabel>
                                <TextField
                                    fullWidth
                                    type="datetime-local"
                                    {...register("ngayBatDau")}
                                    error={!!errors.ngayBatDau}
                                    helperText={errors.ngayBatDau?.message}
                                    sx={inputStyle}
                                />
                            </Box>

                            <Box>
                                <FieldLabel icon={<></>}>Ngày kết thúc</FieldLabel>
                                <TextField
                                    fullWidth
                                    type="datetime-local"
                                    {...register("ngayKetThuc")}
                                    error={!!errors.ngayKetThuc}
                                    helperText={errors.ngayKetThuc?.message}
                                    sx={inputStyle}
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* LƯU Ý */}
                    <Paper elevation={0} sx={{
                        display: "flex", gap: 1.2, p: 1.8,
                        borderRadius: 2.5,
                        bgcolor: "#F0FDF4",
                        border: "1px solid #DCFCE7"
                    }}>
                        <InfoOutlinedIcon sx={{ color: GREEN }} />
                        <Box>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: "#166534" }}>
                                Lưu ý khi thiết lập giá
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: "#4B6652", mt: 0.4 }}>
                                Ngày kết thúc phải sau ngày bắt đầu.
                                Giá phòng áp dụng trong khoảng thời gian đã chọn.
                            </Typography>
                        </Box>
                    </Paper>

                </Stack>
            </DialogContent>

            <Divider sx={{ borderColor: "#E5F0E7" }} />

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button
                    onClick={handleClose}
                    disabled={isSubmitting}
                    sx={{ color: "#64748B", textTransform: "none" }}
                >
                    Hủy
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit(onFormSubmit)}
                    disabled={isSubmitting || danhSachPhong.length === 0}
                    startIcon={<SaveOutlinedIcon />}
                    sx={{
                        background: "linear-gradient(135deg, #15803D, #16A34A)",
                        borderRadius: 2.5,
                        px: 3,
                        py: 1.2,
                        fontWeight: 700,
                        textTransform: "none",
                        boxShadow: "0 4px 12px rgba(21,128,61,0.22)",
                        "&:hover": { bgcolor: "#166534" }
                    }}
                >
                    {isSubmitting
                        ? "Đang lưu..."
                        : duLieuUpdate
                            ? "Cập nhật"
                            : "Thêm giá phòng"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalThemGiaPhong;
