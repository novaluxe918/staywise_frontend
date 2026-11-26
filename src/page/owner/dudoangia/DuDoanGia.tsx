
import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Stack,
    Paper,
    Chip,
    Divider,
    alpha,
} from "@mui/material";

import {
    Sparkles,
    Calendar,
    BarChart3,
} from "lucide-react";

import FormDuDoanGia from "./FormDuDoanGia";
import type { PhongOption } from "../../../types/phong";
import { showAllPhong } from "../../../services/phongService";
import type { DuDoanGiaResponse, LichSuDoanGia } from "../../../types/duDoanGia";
import { duDoanGia, getLichSuDoanGia } from "../../../services/duDoanGiaService";
import KetQuaDuDoanGia from "./KetQuaDuDoanGia";
import BangLichSuDuDoanGia from "./BangLichSuDuDoanGia";
import { useHomeStay } from "../../../context/HomeStayContext";

const DuDoanGia: React.FC = () => {

    const {
        homeStayDangChon,
        dangTaiHomeStay,
    } = useHomeStay();

    const [danhSachPhong, setDanhSachPhong] = useState<PhongOption[]>([]);
    const [loadingPhong, setLoadingPhong] = useState(false);
    const [ketQuaDuDoan, setKetQuaDuDoan] =
        useState<DuDoanGiaResponse | null>(null);
    const [loadingDuDoan, setLoadingDuDoan] = useState(false);
    const [lichSu, setLichSu] = useState<LichSuDoanGia[]>([]);
    const [loadingLichSu, setLoadingLichSu] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchDuLieu = async () => {
            if (!homeStayDangChon) {
                setDanhSachPhong([]);
                setLichSu([]);
                setKetQuaDuDoan(null);
                setLoadingPhong(false);
                setLoadingLichSu(false);
                return;
            }

            setDanhSachPhong([]);
            setLichSu([]);
            setKetQuaDuDoan(null);

            try {
                setLoadingPhong(true);
                setLoadingLichSu(true);

                const [response, data] = await Promise.all([
                    showAllPhong(0, 100, homeStayDangChon),
                    getLichSuDoanGia(homeStayDangChon),
                ]);

                if (!isMounted) return;

                setDanhSachPhong(
                    response.content.map((phong) => ({
                        id: phong.id,
                        tenPhong: phong.tenPhong,
                    }))
                );

                setLichSu(data);

            } catch (error) {
                console.error("Lỗi tải dữ liệu dự đoán:", error);

                if (isMounted) {
                    setDanhSachPhong([]);
                    setLichSu([]);
                }
            } finally {
                if (isMounted) {
                    setLoadingPhong(false);
                    setLoadingLichSu(false);
                }
            }
        };

        fetchDuLieu();

        return () => {
            isMounted = false;
        };
    }, [homeStayDangChon]);

    const handleDuDoan = async (data: {
        maPhong: string;
        ngayApDung: string;
    }) => {
        if (!homeStayDangChon) {
            return;
        }

        try {
            setLoadingDuDoan(true);
            setKetQuaDuDoan(null);

            const ketQua = await duDoanGia({
                maPhong: Number(data.maPhong),
                ngayApDung: data.ngayApDung,
            });

            setKetQuaDuDoan(ketQua);

            console.log("Kết quả dự đoán:", ketQua);

        } catch (error) {
            console.error("Lỗi dự đoán giá:", error);
        } finally {
            setLoadingDuDoan(false);
        }
    };

    const cardStyle = {
        p: 3,
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.03)",
    };

    const iconStyle = {
        p: 1,
        borderRadius: "10px",
        bgcolor: "#F1F5F9",
        color: "#334155",
        display: "flex",
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#F8FAFC",
                py: { xs: 3, md: 5 },
                color: "#0F172A",
            }}
        >
            <Container maxWidth="xl">

                {/* HEADER */}
                <Stack
                    spacing={2}
                    sx={{
                        mb: 4,
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", md: "center" },
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 1.5,
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: "1.5rem", md: "1.875rem" },
                                    fontWeight: 700,
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                Gợi ý giá phòng thông minh
                            </Typography>

                            <Chip
                                icon={<Sparkles size={14} />}
                                label="AI Prediction"
                                size="small"
                                sx={{
                                    bgcolor: alpha("#4F46E5", 0.08),
                                    color: "#4F46E5",
                                    fontWeight: 600,
                                    borderRadius: 2,
                                }}
                            />
                        </Box>

                        <Typography
                            sx={{
                                mt: 1,
                                fontSize: "0.925rem",
                                color: "#64748B",
                            }}
                        >
                            Phân tích thông tin phòng và đề xuất mức giá phù hợp
                            bằng mô hình trí tuệ nhân tạo.
                        </Typography>
                    </Box>

                    <Chip
                        icon={<Sparkles size={15} />}
                        label="Random Forest"
                        sx={{
                            bgcolor: "#FFFFFF",
                            color: "#4F46E5",
                            border: "1px solid #E2E8F0",
                            fontWeight: 600,
                            px: 1,
                            height: 36,
                        }}
                    />
                </Stack>

                {/* MAIN CONTENT */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            lg: "420px 1fr",
                        },
                        gap: 3,
                        alignItems: "stretch",
                    }}
                >
                    {/* FORM DỰ ĐOÁN */}
                    <Paper
                        elevation={0}
                        sx={{
                            ...cardStyle,
                            height: "fit-content",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{ alignItems: "center" }}
                        >
                            <Box sx={iconStyle}>
                                <Calendar size={20} />
                            </Box>

                            <Box>
                                <Typography sx={{ fontWeight: 600, fontSize: "1.05rem" }}>
                                    Thiết lập dự đoán
                                </Typography>

                                <Typography sx={{ fontSize: "0.825rem", color: "#64748B" }}>
                                    Chọn phòng và ngày muốn áp dụng giá
                                </Typography>
                            </Box>
                        </Stack>

                        <Divider sx={{ my: 2.5, borderColor: "#F1F5F9" }} />

                        <FormDuDoanGia
                            onSubmit={handleDuDoan}
                            danhSachPhong={danhSachPhong}
                            loading={loadingDuDoan || loadingPhong || dangTaiHomeStay}
                        />
                    </Paper>


                    {/* KẾT QUẢ */}
                    <Paper
                        elevation={0}
                        sx={{
                            ...cardStyle,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                            <Box
                                sx={{
                                    ...iconStyle,
                                    bgcolor: alpha("#4F46E5", 0.08),
                                    color: "#4F46E5",
                                }}
                            >
                                <BarChart3 size={20} />
                            </Box>

                            <Box>
                                <Typography sx={{ fontWeight: 600, fontSize: "1.05rem" }}>
                                    Mức giá đề xuất
                                </Typography>

                                <Typography sx={{ fontSize: "0.825rem", color: "#64748B" }}>
                                    So sánh giá hiện tại với giá AI dự đoán
                                </Typography>
                            </Box>
                        </Stack>

                        <Divider sx={{ my: 2.5, borderColor: "#F1F5F9" }} />

                        <KetQuaDuDoanGia ketQua={ketQuaDuDoan} />
                    </Paper>

                </Box>

                {/* LỊCH SỬ */}
                <Paper
                    elevation={0}
                    sx={{
                        ...cardStyle,
                        mt: 3,
                    }}
                >

                    <BangLichSuDuDoanGia
                        lichSu={lichSu}
                        loading={loadingLichSu}
                    />
                </Paper>

            </Container>
        </Box>
    );
};

export default DuDoanGia;
