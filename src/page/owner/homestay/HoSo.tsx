import React, { useEffect, useState } from "react";
import {
    Box, Paper, Typography, CircularProgress, Alert, Grid, Divider,
    Chip, Dialog, IconButton, Stack, Avatar, alpha, Button,
} from "@mui/material";
import {
    Phone as PhoneIcon, Email as EmailIcon, LocationOn as LocationIcon,
    HomeWork as CategoryIcon, CheckCircleOutlined as CheckIcon,
    RoomService as ServiceIcon, Close as CloseIcon, ZoomIn as ZoomInIcon,
    Collections as GalleryIcon, Description as DescriptionIcon,
    Edit as EditIcon, Save as SaveIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

import type { HomeStay } from "../../../types/homestay";
import { dangKyHomeStay, layThongTinHomeStay } from "../../../services/homestayService";
import { useHomeStay } from "../../../context/HomeStayContext";
import { EditableField } from "../../../components/owner/EditableField";
import { homeStaySchema, type HomeStayFormValues } from "../../../schemas/homeStaySchema";
import ChonTienIch from "../tienich/ChonTienIch";
import ChonDichVu from "../dichvu/ChonDichVu";
import { useTienIch } from "../../../context/TienIchContext";
import { useDichVu } from "../../../context/DichVuContext";


function HoSo() {
    const { homeStayDangChon, dangTaiHomeStay } = useHomeStay();
    const {
        danhSachTienIchHS,
        setDanhSachTienIchHS,
    } = useTienIch();

    const {
        danhSachDichVuHS,
        setDanhSachDichVuHS,
    } = useDichVu();
    const [homeStay, setHomeStay] = useState<HomeStay | null>(null);
    const [anhDangXem, setAnhDangXem] = useState<string | null>(null);
    const [dangTai, setDangTai] = useState(false);
    const [dangLuu, setDangLuu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loi, setLoi] = useState("");

    const { control, handleSubmit, reset } = useForm<HomeStayFormValues>({
        resolver: zodResolver(homeStaySchema),
    });

    useEffect(() => {
        if (dangTaiHomeStay) return;

        if (!homeStayDangChon) {
            setHomeStay(null);
            return;
        }

        const layDuLieu = async () => {
            try {
                setDangTai(true);
                setLoi("");

                const data = await layThongTinHomeStay(homeStayDangChon);

                setHomeStay(data);

                // Lấy ID tiện ích và dịch vụ đã lưu
                setDanhSachTienIchHS(data.danhSachTienIchHS ?? []);
                setDanhSachDichVuHS(data.danhSachDichVuHS ?? []);

                reset({
                    tenHomeStay: data.tenHomeStay || "",
                    moTa: data.moTa || "",
                    soDienThoai: data.soDienThoai || "",
                    email: data.email || "",
                    diaChi: data.diaChi || "",
                });

            } catch (error) {
                console.error("Lỗi tải HomeStay:", error);
                setLoi("Không thể tải thông tin HomeStay!");
            } finally {
                setDangTai(false);
            }
        };

        layDuLieu();
    }, [
        homeStayDangChon,
        dangTaiHomeStay,
        reset,
        setDanhSachTienIchHS,
        setDanhSachDichVuHS,
    ]);

    const xuLyHuy = () => {
        if (!homeStay) return;

        reset({
            tenHomeStay: homeStay.tenHomeStay || "",
            moTa: homeStay.moTa || "",
            soDienThoai: homeStay.soDienThoai || "",
            email: homeStay.email || "",
            diaChi: homeStay.diaChi || "",
        });

        setDanhSachTienIchHS(homeStay.danhSachTienIchHS ?? []);
        setDanhSachDichVuHS(homeStay.danhSachDichVuHS ?? []);

        setIsEditing(false);
    };
    const onSubmit = async (values: HomeStayFormValues) => {
        if (!homeStay) return;

        try {
            setDangLuu(true);

            const formData = new FormData();

            formData.append("id", String(homeStay.id));
            formData.append("tenHomeStay", values.tenHomeStay);
            formData.append("moTa", values.moTa ?? "");
            formData.append("soDienThoai", values.soDienThoai);
            formData.append("email", values.email ?? "");
            formData.append("diaChi", values.diaChi);

            formData.append("capNhatTienIchHS", "true");
            formData.append("capNhatDichVuHS", "true");

    
            danhSachTienIchHS.forEach((id) => {
                formData.append("danhSachTienIchHS", String(id));
            });

            // 4. Gửi danh sách dịch vụ
            danhSachDichVuHS.forEach((id) => {
                formData.append("danhSachDichVuHS", String(id));
            });

           
            console.log("Danh sách tiện ích:", danhSachTienIchHS);
            console.log("Danh sách dịch vụ:", danhSachDichVuHS);

            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }

            await dangKyHomeStay(formData);

          
            const data = await layThongTinHomeStay(homeStay.id);

            setHomeStay(data);

            setDanhSachTienIchHS(data.danhSachTienIchHS ?? []);
            setDanhSachDichVuHS(data.danhSachDichVuHS ?? []);

            reset({
                tenHomeStay: data.tenHomeStay || "",
                moTa: data.moTa || "",
                soDienThoai: data.soDienThoai || "",
                email: data.email || "",
                diaChi: data.diaChi || "",
            });

            setIsEditing(false);

            Swal.fire({
                icon: "success",
                title: "Cập nhật hồ sơ thành công!",
                timer: 1500,
                showConfirmButton: false,
            });

        } catch (error) {
            console.error("Lỗi cập nhật HomeStay:", error);

            Swal.fire({
                icon: "error",
                title: "Cập nhật thất bại!",
                text: "Vui lòng thử lại.",
            });

        } finally {
            setDangLuu(false);
        }
    };

    if (dangTaiHomeStay || dangTai) {
        return <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}><CircularProgress /></Box>;
    }
    if (loi) return <Box sx={{ p: 3 }}><Alert severity="error">{loi}</Alert></Box>;
    if (!homeStayDangChon) return <Box sx={{ p: 3 }}><Alert severity="info">Bạn chưa có HomeStay được duyệt.</Alert></Box>;
    if (!homeStay) return <Box sx={{ p: 3 }}><Alert severity="warning">Không tìm thấy thông tin HomeStay.</Alert></Box>;

    const anhBia = homeStay.danhSachHinhAnh?.[0]?.duongDan;

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: { xs: 2, md: 4 }, maxWidth: 1300, mx: "auto" }}>

            <Paper
                elevation={0}
                sx={{
                    position: "relative", borderRadius: 4, overflow: "hidden", mb: 4,
                    border: "1px solid", borderColor: "divider",
                    background: anhBia
                        ? `linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.45) 60%, rgba(15, 23, 42, 0.2) 100%), url(${anhBia})`
                        : "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                    backgroundSize: "cover", backgroundPosition: "center",
                    minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "flex-end",
                    p: { xs: 3, md: 4 }, color: "common.white",
                }}
            >
                <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                    <Chip
                        icon={<CategoryIcon sx={{ color: "inherit !important", fontSize: 16 }} />}
                        label={homeStay.tenTheLoaiHomeStay || "HomeStay"}
                        size="small"
                        sx={{ bgcolor: alpha("#ffffff", 0.2), color: "common.white", backdropFilter: "blur(8px)", fontWeight: 600 }}
                    />
                </Stack>

                <EditableField
                    name="tenHomeStay"
                    control={control as any}
                    isEditing={isEditing}
                    value={homeStay.tenHomeStay}
                    typographyProps={{ variant: "h4", sx: { fontWeight: 800, mb: 0.5 } }}
                    textFieldProps={{ sx: { bgcolor: "white", borderRadius: 1.5, mb: 1, maxWidth: 600 } }}
                />

                <Stack direction="row" spacing={1} sx={{ alignItems: "center", opacity: 0.9 }}>
                    <LocationIcon fontSize="small" />
                    <Typography variant="body2">
                        {homeStay.diaChi}, {homeStay.phuongXa}, {homeStay.tinhThanh}
                    </Typography>
                </Stack>
            </Paper>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Paper elevation={0} sx={{ p: 3.5, borderRadius: 4, mb: 3, border: "1px solid", borderColor: "divider" }}>
                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2 }}>
                            <Avatar sx={{ bgcolor: alpha("#2563eb", 0.1), color: "primary.main", width: 38, height: 38 }}>
                                <DescriptionIcon fontSize="small" />
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Giới thiệu về HomeStay</Typography>
                        </Stack>

                        <EditableField
                            name="moTa"
                            control={control as any}
                            isEditing={isEditing}
                            value={homeStay.moTa}
                            emptyText="Chưa có mô tả chi tiết cho cơ sở lưu trú này."
                            typographyProps={{ color: "text.secondary", sx: { lineHeight: 1.8, whiteSpace: "pre-line" } }}
                            textFieldProps={{ multiline: true, rows: 5, placeholder: "Nhập mô tả về HomeStay..." }}
                        />
                    </Paper>

                    {/* Thư viện ảnh */}
                    <Paper elevation={0} sx={{ p: 3.5, borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
                        <Stack direction="row" sx={{ mb: 2.5, alignItems: "center", justifyContent: "space-between" }}>
                            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                                <Avatar sx={{ bgcolor: alpha("#7c3aed", 0.1), color: "#7c3aed", width: 38, height: 38 }}>
                                    <GalleryIcon fontSize="small" />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Không gian & Hình ảnh</Typography>
                                    <Typography variant="caption" color="text.secondary">Nhấn vào ảnh để xem kích thước đầy đủ</Typography>
                                </Box>
                            </Stack>
                            {homeStay.danhSachHinhAnh?.length > 0 && (
                                <Chip label={`${homeStay.danhSachHinhAnh.length} ảnh`} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                            )}
                        </Stack>

                        {homeStay.danhSachHinhAnh?.length > 0 ? (
                            <Grid container spacing={2}>
                                {homeStay.danhSachHinhAnh.map((anh, index) => (
                                    <Grid key={anh.id} size={{ xs: 12, sm: index === 0 ? 12 : 6, md: index === 0 ? 8 : 4 }}>
                                        <Box
                                            onClick={() => setAnhDangXem(anh.duongDan)}
                                            sx={{
                                                position: "relative", height: 220, borderRadius: 3, overflow: "hidden",
                                                cursor: "pointer", border: "1px solid", borderColor: "divider",
                                                "&:hover img": { transform: "scale(1.06)" },
                                                "&:hover .zoom-overlay": { opacity: 1 },
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={anh.duongDan}
                                                alt={`Ảnh ${index + 1}`}
                                                loading="lazy"
                                                sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                                            />
                                            <Box
                                                className="zoom-overlay"
                                                sx={{
                                                    position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.35)",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    opacity: 0, transition: "opacity 0.25s ease", color: "common.white",
                                                }}
                                            >
                                                <ZoomInIcon fontSize="large" />
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Box sx={{ py: 6, textAlign: "center", bgcolor: "action.hover", borderRadius: 3, border: "1px dashed", borderColor: "divider" }}>
                                <Typography color="text.secondary">HomeStay chưa có hình ảnh trưng bày.</Typography>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                {/* CỘT PHẢI */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Stack spacing={3}>
                        {/* Thông tin liên hệ */}
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>Thông tin liên hệ</Typography>
                            <Stack spacing={2.5}>
                                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                                    <Avatar sx={{ bgcolor: alpha("#10b981", 0.1), color: "#059669" }}><PhoneIcon fontSize="small" /></Avatar>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Số điện thoại</Typography>
                                        <EditableField
                                            name="soDienThoai"
                                            control={control as any}
                                            isEditing={isEditing}
                                            value={homeStay.soDienThoai}
                                            typographyProps={{ variant: "body2", sx: { fontWeight: 600 } }}
                                        />
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                                    <Avatar sx={{ bgcolor: alpha("#0ea5e9", 0.1), color: "#0284c7" }}><EmailIcon fontSize="small" /></Avatar>
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Email quản lý</Typography>
                                        <EditableField
                                            name="email"
                                            control={control as any}
                                            isEditing={isEditing}
                                            value={homeStay.email}
                                            typographyProps={{ variant: "body2", sx: { fontWeight: 600, wordBreak: "break-word" } }}
                                        />
                                    </Box>
                                </Stack>

                                <Divider />

                                <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
                                    <Avatar sx={{ bgcolor: alpha("#f59e0b", 0.1), color: "#d97706" }}><LocationIcon fontSize="small" /></Avatar>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Địa chỉ chi tiết</Typography>
                                        <EditableField
                                            name="diaChi"
                                            control={control as any}
                                            isEditing={isEditing}
                                            value={homeStay.diaChi}
                                            typographyProps={{ variant: "body2", sx: { fontWeight: 600, mb: 0.5 } }}
                                            textFieldProps={{ sx: { mb: 0.5 } }}
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            {homeStay.phuongXa}, {homeStay.tinhThanh}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Paper>

                        <ChonTienIch
                            isEditing={isEditing}
                            tienIchHienThi={homeStay.tienIchHienThi}
                        />

                        <ChonDichVu
                            isEditing={isEditing}
                            dichVuHienThi={homeStay.dichVuHienThi}
                        />
                    </Stack>
                </Grid>
            </Grid>


            <Paper
                elevation={isEditing ? 4 : 0}
                sx={{
                    mt: 4, p: 2.5, borderRadius: 4, border: "1px solid", borderColor: "divider",
                    position: isEditing ? "sticky" : "static", bottom: 16, zIndex: 10,
                    display: "flex", flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "stretch", sm: "center" }, justifyContent: "space-between", gap: 2,
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    {isEditing ? "Bạn đang ở chế độ chỉnh sửa. Nhấn Lưu thay đổi để cập nhật." : "Thông tin hồ sơ được hiển thị trực tiếp với khách hàng khi đặt phòng."}
                </Typography>

                {!isEditing ? (
                    <Button
                        type="button"
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => setIsEditing(true)}
                        sx={{ borderRadius: 3, px: 3.5, py: 1.2, fontWeight: 700, textTransform: "none" }}
                    >
                        Cập nhật thông tin
                    </Button>
                ) : (
                    <Stack direction="row" spacing={1.5}>
                        <Button type="button" variant="outlined" color="inherit" onClick={xuLyHuy} disabled={dangLuu} sx={{ borderRadius: 2.5, textTransform: "none" }}>
                            Hủy
                        </Button>
                        <Button type="submit" variant="contained" startIcon={<SaveIcon />} disabled={dangLuu} sx={{ borderRadius: 2.5, px: 3, fontWeight: 700, textTransform: "none" }}>
                            {dangLuu ? "Đang lưu..." : "Lưu thay đổi"}
                        </Button>
                    </Stack>
                )}
            </Paper>

            <Dialog open={!!anhDangXem} onClose={() => setAnhDangXem(null)} maxWidth="lg">
                <Box sx={{ position: "relative", bgcolor: "black" }}>
                    <IconButton
                        onClick={() => setAnhDangXem(null)}
                        sx={{ position: "absolute", top: 12, right: 12, bgcolor: "rgba(0,0,0,0.6)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.8)" } }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {anhDangXem && (
                        <Box component="img" src={anhDangXem} alt="Phóng to" sx={{ maxHeight: "85vh", maxWidth: "100%", display: "block" }} />
                    )}
                </Box>
            </Dialog>
        </Box>
    );
}

export default HoSo;