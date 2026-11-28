
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { HomeStay } from "../../../types/homestay";
import { layThongTinHomeStay } from "../../../services/homestayService";

import {
    Box, Button, Chip, CircularProgress, Container,
    Divider, Paper, Stack, Typography,
} from "@mui/material";

import {
    ArrowLeft, Mail, MapPin, Phone, UserRound, Wifi,
    Sparkles, Image as ImageIcon,
} from "lucide-react";

const green = "#15803D";
const textDark = "#172B24";
const textMuted = "#64748B";

const sectionTitle = {
    fontSize: { xs: 20, md: 23 },
    fontWeight: 800,
    color: textDark,
    mb: 2,
};

function ChiTietHomeStay() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [homeStay, setHomeStay] = useState<HomeStay | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchHomeStay = async () => {
            try {
                setLoading(true);
                setError("");

                if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
                    throw new Error("Mã HomeStay không hợp lệ");
                }

                const data = await layThongTinHomeStay(Number(id));

                if (isMounted) setHomeStay(data);
            } catch (err) {
                console.error(err);
                if (isMounted) setError("Không tìm thấy thông tin HomeStay.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchHomeStay();

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
                <CircularProgress sx={{ color: green }} />
            </Box>
        );
    }

    if (error || !homeStay) {
        return (
            <Box sx={{ textAlign: "center", py: 12 }}>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {error || "Không tìm thấy thông tin HomeStay."}
                </Typography>
                <Button onClick={() => navigate(-1)} sx={{ color: green }}>
                    Quay lại
                </Button>
            </Box>
        );
    }

    const danhSachAnh = homeStay.danhSachHinhAnh ?? [];
    const anhDaiDien =
        danhSachAnh.find((anh) => anh.laAnhDaiDien)?.duongDan ||
        danhSachAnh[0]?.duongDan;

    const anhPhu = danhSachAnh
        .filter((anh) => anh.duongDan !== anhDaiDien)
        .slice(0, 4);

    const renderContact = (
        icon: React.ReactNode,
        label: string,
        value?: string
    ) => (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Box
                sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    bgcolor: "#F0FDF4",
                    color: green,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                }}
            >
                {icon}
            </Box>
            <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: 13 }} color={textMuted}>
                    {label}
                </Typography>
                <Typography color={textDark} sx={{ fontWeight: 600, overflowWrap: "anywhere" }}>
                    {value || "Chưa cập nhật"}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ bgcolor: "#F8FAF9", minHeight: "100vh", py: { xs: 2, md: 4 } }}>
            <Container maxWidth="lg">
                {/* Tiêu đề */}
                <Box sx={{ mb: 3 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            justifyContent: "space-between",
                            alignItems: { xs: "flex-start", sm: "center" },
                            gap: 1,
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: { xs: 25, md: 32 },
                                    fontWeight: 800,
                                    color: textDark,
                                    mb: 1,
                                }}
                            >
                                {homeStay.tenHomeStay}
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <MapPin size={17} color={green} />
                                <Typography sx={{ color: textMuted, fontSize: 14 }}>
                                    {homeStay.diaChi}
                                </Typography>
                            </Box>
                        </Box>

                        {homeStay.tenTheLoaiHomeStay && (
                            <Chip
                                label={homeStay.tenTheLoaiHomeStay}
                                sx={{
                                    bgcolor: "#DCFCE7",
                                    color: "#166534",
                                    fontWeight: 700,
                                    borderRadius: 2,
                                }}
                            />
                        )}
                    </Box>
                </Box>

                {/* Thư viện ảnh */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1.7fr 1fr" },
                        gap: 1.5,
                        height: { xs: "auto", md: 420 },
                        mb: 5,
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            height: { xs: 260, md: "100%" },
                            borderRadius: 4,
                            overflow: "hidden",
                            bgcolor: "#E2E8F0",
                        }}
                    >
                        {anhDaiDien ? (
                            <Box
                                component="img"
                                src={anhDaiDien}
                                alt={homeStay.tenHomeStay}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        ) : (
                            <Stack
                                sx={{
                                    height: "100%",
                                    color: textMuted,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <ImageIcon size={40} />
                                <Typography>Chưa có hình ảnh</Typography>
                            </Stack>
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: { xs: "none", md: "grid" },
                            gridTemplateColumns: "1fr 1fr",
                            gridTemplateRows: "1fr 1fr",
                            gap: 1.5,
                        }}
                    >
                        {Array.from({ length: 4 }).map((_, index) => {
                            const anh = anhPhu[index];

                            return (
                                <Box
                                    key={anh?.id ?? index}
                                    sx={{
                                        borderRadius: 3,
                                        overflow: "hidden",
                                        bgcolor: "#E2E8F0",
                                    }}
                                >
                                    {anh ? (
                                        <Box
                                            component="img"
                                            src={anh.duongDan}
                                            alt={homeStay.tenHomeStay}
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    ) : (
                                        <Stack
                                            sx={{
                                                height: "100%",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#94A3B8",
                                            }}
                                        >
                                            <ImageIcon size={24} />
                                        </Stack>
                                    )}
                                </Box>
                            );
                        })}
                    </Box>
                </Box>

                {/* Nội dung chính */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1.8fr 1fr" },
                        gap: 4,
                        alignItems: "start",
                    }}
                >
                    {/* Cột trái */}
                    <Box>
                        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, mb: 3 }}>
                            <Typography sx={sectionTitle}>
                                Giới thiệu chỗ nghỉ
                            </Typography>

                            <Typography
                                sx={{
                                    color: "#475569",
                                    lineHeight: 1.9,
                                    whiteSpace: "pre-line",
                                }}
                            >
                                {homeStay.moTa || "Chưa có mô tả cho chỗ nghỉ này."}
                            </Typography>
                        </Paper>

                        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, mb: 3 }}>
                            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
                                <Wifi color={green} size={21} />
                                <Typography sx={{ ...sectionTitle, mb: 0 }}>
                                    Tiện ích nổi bật
                                </Typography>
                            </Stack>

                            {homeStay.tienIchHienThi?.length ? (
                                <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.2 }}>
                                    {homeStay.tienIchHienThi.map((item, index) => (
                                        <Chip
                                            key={index}
                                            label={item}
                                            variant="outlined"
                                            sx={{
                                                borderColor: "#BBF7D0",
                                                color: "#166534",
                                                bgcolor: "#F0FDF4",
                                                fontWeight: 500,
                                                py: 2.2,
                                            }}
                                        />
                                    ))}
                                </Stack>
                            ) : (
                                <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                                    Chưa có thông tin tiện ích.
                                </Typography>
                            )}
                        </Paper>

                        <Paper elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3 }}>
                            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
                                <Sparkles color={green} size={21} />
                                <Typography sx={{ ...sectionTitle, mb: 0 }}>
                                    Dịch vụ
                                </Typography>
                            </Stack>

                            {homeStay.dichVuHienThi?.length ? (
                                <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.2 }}>
                                    {homeStay.dichVuHienThi.map((item, index) => (
                                        <Chip
                                            key={index}
                                            label={item}
                                            variant="outlined"
                                            sx={{
                                                borderColor: "#CBD5E1",
                                                color: "#334155",
                                                bgcolor: "#F8FAFC",
                                                fontWeight: 500,
                                                py: 2.2,
                                            }}
                                        />
                                    ))}
                                </Stack>
                            ) : (
                                <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                                    Chưa có thông tin dịch vụ.
                                </Typography>
                            )}
                        </Paper>
                    </Box>

                    {/* Cột phải */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            position: { md: "sticky" },
                            top: 100,
                        }}
                    >
                        <Typography sx={{ ...sectionTitle, mb: 3 }}>
                            Thông tin chỗ nghỉ
                        </Typography>

                        <Stack spacing={3}>
                            {renderContact(
                                <UserRound size={20} />,
                                "Chủ HomeStay",
                                homeStay.tenChuHomeStay
                            )}

                            {renderContact(
                                <Phone size={20} />,
                                "Số điện thoại",
                                homeStay.soDienThoai
                            )}

                            {renderContact(
                                <Mail size={20} />,
                                "Email",
                                homeStay.email
                            )}
                        </Stack>

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                            <MapPin size={19} color={green} />
                            <Typography sx={{ fontWeight: 700, color: textDark }}>
                                Địa chỉ
                            </Typography>
                        </Box>

                        <Typography sx={{ color: textMuted, fontSize: 14, lineHeight: 1.8 }}>
                            {[
                                homeStay.diaChi,
                                homeStay.phuongXa,
                                homeStay.tinhThanh,
                            ].filter(Boolean).join(", ")}
                        </Typography>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
}

export default ChiTietHomeStay;
