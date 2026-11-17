
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Stack,
    Typography,
    IconButton,
    Button,
    Grid,
    Paper,
    Chip,
    Divider,
    TextField,
} from "@mui/material";

import {
    Close,
    HomeOutlined,
    PersonOutlined,
    LocationOnOutlined,
    PhoneOutlined,
    EmailOutlined,
    CheckCircleOutlined,
    CancelOutlined,
    ImageOutlined,
    WifiOutlined,
    MiscellaneousServicesOutlined,
} from "@mui/icons-material";

import type { HomeStay } from "../../../types/homestay";
import { toast } from "../../../utils/toast";
import { duyetHomeStay, tuChoiHomeStay } from "../../../services/homestayService";

interface Props {
    open: boolean;
    onClose: () => void;
    homeStay: HomeStay | null;
    onSuccess: () => void
}

function ModalXetDuyet({
    open,
    onClose,
    homeStay,
    onSuccess
}: Props) {
    const [lyDoTuChoi, setLyDoTuChoi] = useState("");

    if (!homeStay) return null;

    const ThongTin = ({
        icon,
        label,
        value,
    }: {
        icon: React.ReactNode;
        label: string;
        value?: string | number | null;
    }) => (
        <Stack
            direction="row"
            spacing={1.5}
            sx={{ alignItems: "flex-start" }}
        >
            <Box sx={{ color: "#64748b", mt: 0.3 }}>
                {icon}
            </Box>

            <Box>
                <Typography variant="caption" color="text.secondary">
                    {label}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ overflowWrap: "anywhere", fontWeight: 600 }}
                >
                    {value || "Chưa cập nhật"}
                </Typography>
            </Box>
        </Stack>
    );

    const TieuDe = ({
        icon,
        children,
    }: {
        icon: React.ReactNode;
        children: React.ReactNode;
    }) => (
        <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", mb: 2 }}
        >
            <Box sx={{ color: "#2563eb", display: "flex" }}>
                {icon}
            </Box>
            <Typography sx={{ fontWeight: 700, color: "#1e293b" }}>
                {children}
            </Typography>
        </Stack>
    );

    const KhuVuc = ({
        children,
    }: {
        children: React.ReactNode;
    }) => (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                border: "1px solid #e2e8f0",
                borderRadius: 2.5,
            }}
        >
            {children}
        </Paper>
    );

  const handleTuChoi = async () => {
    if (!lyDoTuChoi.trim()) {
        toast.warning("Vui lòng nhập lý do từ chối");
        return;
    }

    try {
        await tuChoiHomeStay(
            homeStay.id,
            lyDoTuChoi
        );

        toast.success("Từ chối HomeStay thành công");

        setLyDoTuChoi("");

        onClose();
        onSuccess();

    } catch (error: any) {
        console.error(error);

        toast.error(
            error.response?.data?.message ||
            error.response?.data ||
            "Từ chối HomeStay thất bại"
        );
    }
};

 const handleDuyet = async () => {
    try {
        await duyetHomeStay(homeStay.id);

        toast.success("Duyệt HomeStay thành công");

        onClose();
        onSuccess();

    } catch (error: any) {
        console.error(error);

        toast.error(
            error.response?.data?.message ||
            error.response?.data ||
            "Duyệt HomeStay thất bại"
        );
    }
};

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            scroll="paper"
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 3,
                        maxHeight: "92vh",
                    },
                },
            }}
        >
            {/* HEADER */}
            <DialogTitle
                sx={{
                    px: 3,
                    py: 2,
                    borderBottom: "1px solid #e2e8f0",
                    bgcolor: "#f8fafc",
                }}
            >
                <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            Xét duyệt HomeStay
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Kiểm tra thông tin đăng ký của chủ HomeStay
                        </Typography>
                    </Box>

                    <IconButton onClick={onClose} size="small">
                        <Close />
                    </IconButton>
                </Stack>
            </DialogTitle>

            {/* CONTENT */}
            <DialogContent
                sx={{
                    p: { xs: 2, sm: 3 },
                    bgcolor: "#f8fafc",
                }}
            >
                <Stack component="div" spacing={2.5}>

                    {/* THÔNG TIN CHUNG */}
                    <KhuVuc>
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 1,
                            }}
                        >
                            <Stack component="div" direction="row" spacing={1.5}>
                                <Box
                                    sx={{
                                        width: 46,
                                        height: 46,
                                        bgcolor: "#eff6ff",
                                        color: "#2563eb",
                                        borderRadius: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <HomeOutlined fontSize="large" />
                                </Box>

                                <Box>
                                    <Typography sx={{ fontWeight: 800 }}>
                                        {homeStay.tenHomeStay}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Chip
                                label="Chờ duyệt"
                                color="warning"
                                size="small"
                            />
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        <TieuDe icon={<HomeOutlined />}>
                            Thông tin cơ sở lưu trú
                        </TieuDe>

                        <Grid container spacing={2.5}>
                            <Grid size={{ xs: 12 }}>
                                <ThongTin
                                    icon={<HomeOutlined fontSize="small" />}
                                    label="Tên HomeStay"
                                    value={homeStay.tenHomeStay}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Mô tả
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ mt: 0.5, lineHeight: 1.8 }}
                                >
                                    {homeStay.moTa || "Chưa có mô tả"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </KhuVuc>

                    {/* CHỦ HOMESTAY */}
                    <KhuVuc>
                        <TieuDe icon={<PersonOutlined />}>
                            Thông tin chủ HomeStay
                        </TieuDe>

                        <Grid container spacing={2.5}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <ThongTin
                                    icon={<PersonOutlined fontSize="small" />}
                                    label="Họ và tên"
                                    value={homeStay.tenChuHomeStay}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <ThongTin
                                    icon={<PhoneOutlined fontSize="small" />}
                                    label="Số điện thoại"
                                    value={homeStay.soDienThoai}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <ThongTin
                                    icon={<EmailOutlined fontSize="small" />}
                                    label="Email"
                                    value={homeStay.email}
                                />
                            </Grid>
                        </Grid>
                    </KhuVuc>

                    {/* ĐỊA CHỈ */}
                    <KhuVuc>
                        <TieuDe icon={<LocationOnOutlined />}>
                            Địa chỉ HomeStay
                        </TieuDe>

                        <Grid container spacing={2.5}>
                            <Grid size={{ xs: 12 }}>
                                <ThongTin
                                    icon={<LocationOnOutlined />}
                                    label="Địa chỉ cụ thể"
                                    value={homeStay.diaChi}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <ThongTin
                                    icon={<LocationOnOutlined />}
                                    label="Phường / Xã"
                                    value={homeStay.phuongXa}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <ThongTin
                                    icon={<LocationOnOutlined />}
                                    label="Tỉnh / Thành"
                                    value={homeStay.tinhThanh}
                                />
                            </Grid>
                        </Grid>
                    </KhuVuc>

                    {/* HÌNH ẢNH */}
                    <KhuVuc>
                        <TieuDe icon={<ImageOutlined />}>
                            Hình ảnh HomeStay
                        </TieuDe>

                        {homeStay.danhSachHinhAnh?.length > 0 ? (
                            <Grid container spacing={2}>
                                {homeStay.danhSachHinhAnh.map((anh) => (
                                    <Grid
                                        key={anh.id}
                                        size={{ xs: 6, sm: 4, md: 3 }}
                                    >
                                        <Box
                                            sx={{
                                                position: "relative",
                                                height: 130,
                                                borderRadius: 2,
                                                overflow: "hidden",
                                                border: "1px solid #e2e8f0",
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={anh.duongDan}
                                                alt="Ảnh HomeStay"
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    display: "block",
                                                }}
                                            />

                                            {anh.laAnhDaiDien && (
                                                <Chip
                                                    label="Ảnh đại diện"
                                                    size="small"
                                                    color="primary"
                                                    sx={{
                                                        position: "absolute",
                                                        top: 8,
                                                        left: 8,
                                                        fontSize: 10,
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Box
                                sx={{
                                    border: "1px dashed #cbd5e1",
                                    borderRadius: 2,
                                    p: 3,
                                    textAlign: "center",
                                    bgcolor: "#f8fafc",
                                }}
                            >
                                <ImageOutlined
                                    sx={{ fontSize: 36, color: "#94a3b8" }}
                                />

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 1 }}
                                >
                                    HomeStay chưa có hình ảnh
                                </Typography>
                            </Box>
                        )}
                    </KhuVuc>

                    {/* TIỆN ÍCH */}
                    <KhuVuc>
                        <TieuDe icon={<WifiOutlined />}>
                            Tiện ích
                        </TieuDe>

                        <Stack
                            direction="row"
                            sx={{ flexWrap: "wrap", gap: 1 }}
                        >
                            {homeStay.tienIchHienThi?.length ? (
                                homeStay.tienIchHienThi.map((item, index) => (
                                    <Chip
                                        key={index}
                                        label={item}
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                    />
                                ))
                            ) : (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Chưa có tiện ích
                                </Typography>
                            )}
                        </Stack>
                    </KhuVuc>

                    {/* DỊCH VỤ */}
                    <KhuVuc>
                        <TieuDe icon={<MiscellaneousServicesOutlined />}>
                            Dịch vụ
                        </TieuDe>

                        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                            {homeStay.dichVuHienThi?.length ? (
                                homeStay.dichVuHienThi.map((item, index) => (
                                    <Chip
                                        key={index}
                                        label={item}
                                        color="success"
                                        variant="outlined"
                                        size="small"
                                    />
                                ))
                            ) : (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Chưa có dịch vụ
                                </Typography>
                            )}
                        </Stack>
                    </KhuVuc>

                    {/* XÉT DUYỆT */}
                    <KhuVuc>
                        <TieuDe icon={<CheckCircleOutlined />}>
                            Kết quả xét duyệt
                        </TieuDe>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1.5 }}
                        >
                            Nếu từ chối, vui lòng ghi rõ lý do để chủ
                            HomeStay biết và khắc phục.
                        </Typography>

                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            value={lyDoTuChoi}
                            onChange={(e) =>
                                setLyDoTuChoi(e.target.value)
                            }
                            placeholder="Nhập lý do từ chối HomeStay..."
                            size="small"
                        />
                    </KhuVuc>
                </Stack>
            </DialogContent>

            {/* FOOTER */}
            <DialogActions
                sx={{
                    p: 2.5,
                    borderTop: "1px solid #e2e8f0",
                    bgcolor: "#fff",
                    gap: 1,
                }}
            >
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={onClose}
                    sx={{ textTransform: "none" }}
                >
                    Đóng
                </Button>

                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<CancelOutlined />}
                    onClick={handleTuChoi}
                    disabled={!lyDoTuChoi.trim()}
                    sx={{ textTransform: "none" }}
                >
                    Từ chối
                </Button>

                <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleOutlined />}
                    onClick={handleDuyet}
                    sx={{ textTransform: "none" }}
                >
                    Duyệt HomeStay
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalXetDuyet;
