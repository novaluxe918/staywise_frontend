
import React, { useState } from "react";
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

interface PhongOption {
    id: number;
    tenPhong: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
    danhSachPhong: PhongOption[];
    onSubmit: (data: {
        maPhong: number;
        giaPhong: number;
        ngayBatDau: string;
        ngayKetThuc: string;
    }) => Promise<void>;
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
    open, onClose, danhSachPhong, onSubmit
}: Props) {

    const [maPhong, setMaPhong] = useState<number | "">("");
    const [giaPhong, setGiaPhong] = useState("");
    const [ngayBatDau, setNgayBatDau] = useState("");
    const [ngayKetThuc, setNgayKetThuc] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const resetForm = () => {
        setMaPhong("");
        setGiaPhong("");
        setNgayBatDau("");
        setNgayKetThuc("");
        setError("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = async () => {
        if (!maPhong || !giaPhong || !ngayBatDau || !ngayKetThuc) {
            setError("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (Number(giaPhong) <= 0) {
            setError("Giá phòng phải lớn hơn 0");
            return;
        }

        if (new Date(ngayKetThuc) <= new Date(ngayBatDau)) {
            setError("Ngày kết thúc phải sau ngày bắt đầu");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await onSubmit({
                maPhong: Number(maPhong),
                giaPhong: Number(giaPhong),
                ngayBatDau: ngayBatDau + ":00",
                ngayKetThuc: ngayKetThuc + ":00"
            });

            handleClose();
        } catch (error) {
            console.error("Lỗi thêm giá phòng:", error);
        } finally {
            setLoading(false);
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
            {/* HEADER */}
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
                            Thêm giá phòng
                        </Typography>
                        <Typography sx={{ fontSize: 12.5, opacity: 0.85 }}>
                            Thiết lập mức giá áp dụng cho phòng
                        </Typography>
                    </Box>

                    <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            {/* CONTENT */}
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
                            select fullWidth sx={inputStyle}
                            value={maPhong}
                            onChange={e => setMaPhong(
                                e.target.value === "" ? "" : Number(e.target.value)
                            )}
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
                            fullWidth type="number"
                            placeholder="Nhập giá phòng"
                            value={giaPhong}
                            onChange={e => setGiaPhong(e.target.value)}
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
                                    fullWidth type="datetime-local"
                                    value={ngayBatDau}
                                    onChange={e => setNgayBatDau(e.target.value)}
                                    sx={inputStyle}
                                />
                            </Box>

                            <Box>
                                <FieldLabel icon={<></>}>Ngày kết thúc</FieldLabel>
                                <TextField
                                    fullWidth type="datetime-local"
                                    value={ngayKetThuc}
                                    onChange={e => setNgayKetThuc(e.target.value)}
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

                    {error && (
                        <Typography sx={{ color: "error.main", fontSize: 13 }}>
                            {error}
                        </Typography>
                    )}

                </Stack>
            </DialogContent>

            <Divider sx={{ borderColor: "#E5F0E7" }} />

            {/* FOOTER */}
            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button
                    onClick={handleClose}
                    disabled={loading}
                    sx={{ color: "#64748B", textTransform: "none" }}
                >
                    Hủy
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading || danhSachPhong.length === 0}
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
                    {loading ? "Đang lưu..." : "Thêm giá phòng"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalThemGiaPhong;
