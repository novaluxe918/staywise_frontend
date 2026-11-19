import React, { useEffect, useState } from "react";
import {
    Box,
    Paper,
    Typography,
    CircularProgress,
    Alert,
    Grid,
    Divider,
    Chip,
    Dialog,
    IconButton,
    Stack,
    Avatar,
    alpha,
    Button,
} from "@mui/material";
import {
    Phone as PhoneIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    HomeWork as CategoryIcon,
    CheckCircleOutlined as CheckIcon,
    RoomService as ServiceIcon,
    Close as CloseIcon,
    ZoomIn as ZoomInIcon,
    Collections as GalleryIcon,
    Description as DescriptionIcon,
} from "@mui/icons-material";

import type { HomeStay } from "../../../types/homestay";
import { layThongTinHomeStay } from "../../../services/homestayService";
import { useHomeStay } from "../../../context/HomeStayContext";
import { EditIcon } from "lucide-react";

function HoSo() {
    const { homeStayDangChon, dangTaiHomeStay } = useHomeStay();
    const [anhDangXem, setAnhDangXem] = useState<string | null>(null);
    const [homeStay, setHomeStay] = useState<HomeStay | null>(null);
    const [dangTai, setDangTai] = useState(false);
    const [loi, setLoi] = useState("");

    useEffect(() => {
        const layDuLieu = async () => {
            if (dangTaiHomeStay) return;

            if (!homeStayDangChon) {
                setHomeStay(null);
                setLoi("");
                return;
            }

            try {
                setDangTai(true);
                setLoi("");
                const data = await layThongTinHomeStay(homeStayDangChon);
                setHomeStay(data);
            } catch (error) {
                console.error(error);
                setLoi("Không thể tải thông tin HomeStay!");
                setHomeStay(null);
            } finally {
                setDangTai(false);
            }
        };

        layDuLieu();
    }, [homeStayDangChon, dangTaiHomeStay]);

    if (dangTaiHomeStay || dangTai) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (loi) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error" sx={{ borderRadius: 2 }}>{loi}</Alert>
            </Box>
        );
    }

    if (!homeStayDangChon) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                    Bạn chưa có HomeStay được duyệt.
                </Alert>
            </Box>
        );
    }

    if (!homeStay) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="warning" sx={{ borderRadius: 2 }}>
                    Không tìm thấy thông tin HomeStay.
                </Alert>
            </Box>
        );
    }

    // Lấy ảnh đầu tiên làm ảnh bìa (Cover) nếu có
    const anhBia = homeStay.danhSachHinhAnh?.[0]?.duongDan;

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1300, mx: "auto" }}>
            {/* 1. HERO BANNER HEADER */}
            <Paper
                elevation={0}
                sx={{
                    position: "relative",
                    borderRadius: 4,
                    overflow: "hidden",
                    mb: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    background: anhBia
                        ? `linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.45) 60%, rgba(15, 23, 42, 0.2) 100%), url(${anhBia})`
                        : "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: 240,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    p: { xs: 3, md: 4 },
                    color: "common.white",
                }}
            >
                <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                    <Chip
                        icon={<CategoryIcon sx={{ color: "inherit !important", fontSize: 16 }} />}
                        label={homeStay.tenTheLoaiHomeStay || "HomeStay"}
                        size="small"
                        sx={{
                            bgcolor: alpha("#ffffff", 0.2),
                            color: "common.white",
                            backdropFilter: "blur(8px)",
                            fontWeight: 600,
                            px: 0.5,
                        }}
                    />
                </Stack>

                <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.5px", mb: 1 }}>
                    {homeStay.tenHomeStay}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ alignItems: "center", opacity: 0.9 }}>
                    <LocationIcon fontSize="small" />
                    <Typography variant="body2">
                        {homeStay.diaChi}, {homeStay.phuongXa}, {homeStay.tinhThanh}
                    </Typography>
                </Stack>
            </Paper>

            {/* 2. BỐ CỤC 2 CỘT CHÍNH */}
            <Grid container spacing={3}>
                {/* CỘT TRÁI: MÔ TẢ & THƯ VIỆN ẢNH */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    {/* Thẻ Giới thiệu / Mô tả */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3.5,
                            borderRadius: 4,
                            mb: 3,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
                            <Avatar sx={{ bgcolor: alpha("#2563eb", 0.1), color: "primary.main", width: 38, height: 38 }}>
                                <DescriptionIcon fontSize="small" />
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                Giới thiệu về HomeStay
                            </Typography>
                        </Stack>

                        <Typography
                            color="text.secondary"
                            sx={{
                                lineHeight: 1.8,
                                whiteSpace: "pre-line",
                                fontSize: "0.975rem",
                            }}
                        >
                            {homeStay.moTa || "Chưa có mô tả chi tiết cho cơ sở lưu trú này."}
                        </Typography>
                    </Paper>

                    {/* Thẻ Hình ảnh HomeStay */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3.5,
                            borderRadius: 4,
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Stack direction="row" sx={{ mb: 2.5, alignItems: "center", justifyContent: "space-between" }}>
                            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                                <Avatar sx={{ bgcolor: alpha("#7c3aed", 0.1), color: "#7c3aed", width: 38, height: 38 }}>
                                    <GalleryIcon fontSize="small" />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        Không gian & Hình ảnh
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Nhấn vào ảnh để xem kích thước đầy đủ
                                    </Typography>
                                </Box>
                            </Stack>

                            {homeStay.danhSachHinhAnh?.length > 0 && (
                                <Chip
                                    label={`${homeStay.danhSachHinhAnh.length} ảnh`}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontWeight: 600 }}
                                />
                            )}
                        </Stack>

                        {homeStay.danhSachHinhAnh?.length > 0 ? (
                            <Grid container spacing={2}>
                                {homeStay.danhSachHinhAnh.map((anh, index) => (
                                    <Grid
                                        key={anh.id}

                                        size={{ xs: 12, sm: index === 0 ? 12 : 6, md: index === 0 ? 8 : 4 }}
                                    >
                                        <Box
                                            onClick={() => setAnhDangXem(anh.duongDan)}
                                            sx={{
                                                position: "relative",
                                                height: 220,
                                                borderRadius: 3,
                                                overflow: "hidden",
                                                cursor: "pointer",
                                                border: "1px solid",
                                                borderColor: "divider",
                                                "&:hover img": {
                                                    transform: "scale(1.06)",
                                                },
                                                "&:hover .zoom-overlay": {
                                                    opacity: 1,
                                                },
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={anh.duongDan}
                                                alt={`Hình ảnh HomeStay ${index + 1}`}
                                                loading="lazy"
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    transition: "transform 0.4s ease",
                                                }}
                                            />
                                            {/* Lớp phủ hiện icon phóng to khi hover */}
                                            <Box
                                                className="zoom-overlay"
                                                sx={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    bgcolor: "rgba(0,0,0,0.35)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    opacity: 0,
                                                    transition: "opacity 0.25s ease",
                                                    color: "common.white",
                                                }}
                                            >
                                                <ZoomInIcon fontSize="large" />
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Box
                                sx={{
                                    py: 6,
                                    textAlign: "center",
                                    bgcolor: "action.hover",
                                    borderRadius: 3,
                                    border: "1px dashed",
                                    borderColor: "divider",
                                }}
                            >
                                <Typography color="text.secondary">
                                    HomeStay chưa có hình ảnh trưng bày.
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                {/* CỘT PHẢI: THÔNG TIN LIÊN HỆ, ĐỊA CHỈ, TIỆN ÍCH & DỊCH VỤ */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Stack spacing={3}>
                        {/* Thẻ Thông tin liên hệ & Địa chỉ */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
                                Thông tin liên hệ
                            </Typography>

                            <Stack spacing={2.5}>
                                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                                    <Avatar sx={{ bgcolor: alpha("#10b981", 0.1), color: "#059669" }}>
                                        <PhoneIcon fontSize="small" />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                                            Số điện thoại
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {homeStay.soDienThoai || "Chưa cập nhật"}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                                    <Avatar sx={{ bgcolor: alpha("#0ea5e9", 0.1), color: "#0284c7" }}>
                                        <EmailIcon fontSize="small" />
                                    </Avatar>
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                                            Email quản lý
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, wordBreak: "break-word" }}>
                                            {homeStay.email || "Chưa cập nhật"}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Divider />

                                <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
                                    <Avatar sx={{ bgcolor: alpha("#f59e0b", 0.1), color: "#d97706" }}>
                                        <LocationIcon fontSize="small" />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                                            Địa chỉ chi tiết
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            {homeStay.diaChi}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {homeStay.phuongXa}, {homeStay.tinhThanh}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Paper>

                        {/* Thẻ Tiện ích */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: "center" }}>
                                <CheckIcon color="primary" fontSize="small" />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Tiện ích nổi bật
                                </Typography>
                            </Stack>

                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                {homeStay.tienIchHienThi?.length > 0 ? (
                                    homeStay.tienIchHienThi.map((item, index) => (
                                        <Chip
                                            key={index}
                                            label={item}
                                            size="small"
                                            sx={{
                                                borderRadius: 2,
                                                bgcolor: alpha("#2563eb", 0.08),
                                                color: "primary.main",
                                                fontWeight: 500,
                                                border: "1px solid",
                                                borderColor: alpha("#2563eb", 0.2),
                                            }}
                                        />
                                    ))
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        Chưa cập nhật tiện ích.
                                    </Typography>
                                )}
                            </Box>
                        </Paper>

                        {/* Thẻ Dịch vụ */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: "center" }}>
                                <ServiceIcon color="secondary" fontSize="small" />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Dịch vụ đi kèm
                                </Typography>
                            </Stack>

                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                {homeStay.dichVuHienThi?.length > 0 ? (
                                    homeStay.dichVuHienThi.map((item, index) => (
                                        <Chip
                                            key={index}
                                            label={item}
                                            size="small"
                                            sx={{
                                                borderRadius: 2,
                                                bgcolor: alpha("#9333ea", 0.08),
                                                color: "secondary.main",
                                                fontWeight: 500,
                                                border: "1px solid",
                                                borderColor: alpha("#9333ea", 0.2),
                                            }}
                                        />
                                    ))
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        Chưa cập nhật dịch vụ.
                                    </Typography>
                                )}
                            </Box>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>

            <Paper
                elevation={0}
                sx={{
                    mt: 4,
                    p: 2.5,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "stretch", sm: "center" },
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    Thông tin hồ sơ được hiển thị trực tiếp với khách hàng khi đặt phòng.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    startIcon={<EditIcon />}
                    // onClick={xuLyCapNhat}
                    sx={{
                        borderRadius: 3,
                        px: 3.5,
                        py: 1.2,
                        fontWeight: 700,
                        textTransform: "none",
                        boxShadow: "0 4px 14px 0 rgba(37, 99, 235, 0.35)",
                        "&:hover": {
                            boxShadow: "0 6px 20px rgba(37, 99, 235, 0.45)",
                        },
                    }}
                >
                    Cập nhật thông tin
                </Button>
            </Paper>

        </Box>
    );
}

export default HoSo;