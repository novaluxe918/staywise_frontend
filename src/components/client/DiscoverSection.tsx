
import { useEffect, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type {
    HomeStay,
    TheLoaiHomeStayResponse,
} from "../../types/homestay";

import {
    getAllTheLoaiHomeStay,
    layHomeStayTheoTheLoai,
} from "../../services/homestayService";
import HomeStayCard from "../../page/client/card/HomeStayCard";



interface Props {
    visible?: boolean;
}

function DiscoverSection({ visible = true }: Props) {
    const navigate = useNavigate();

    const [danhSachTheLoai, setDanhSachTheLoai] = useState<
        TheLoaiHomeStayResponse[]
    >([]);

    const [danhSachHomeStay, setDanhSachHomeStay] = useState<
        Record<string, HomeStay[]>
    >({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchDuLieu = async () => {
            try {
                setLoading(true);

                const theLoai = await getAllTheLoaiHomeStay();

                if (!isMounted) return;

                setDanhSachTheLoai(theLoai);

                const ketQua = await Promise.all(
                    theLoai.map(async (category) => {
                        try {
                            const data = await layHomeStayTheoTheLoai(
                                category.value
                            );

                            return {
                                theLoai: category.value,
                                danhSach: data,
                            };
                        } catch (error) {
                            console.error(
                                `Lỗi lấy HomeStay loại ${category.value}:`,
                                error
                            );

                            return {
                                theLoai: category.value,
                                danhSach: [],
                            };
                        }
                    })
                );

                if (!isMounted) return;

                const duLieu: Record<string, HomeStay[]> = {};

                ketQua.forEach((item) => {
                    duLieu[item.theLoai] = item.danhSach;
                });

                setDanhSachHomeStay(duLieu);
            } catch (error) {
                console.error("Lỗi lấy dữ liệu trang chủ:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchDuLieu();

        return () => {
            isMounted = false;
        };
    }, []);

    const xemHomeStayTheoLoai = (theLoai: string) => {
        navigate(`/kham-pha?loaiHinh=${encodeURIComponent(theLoai)}`);
    };

    return (
        <Box
            sx={{
                py: { xs: 7, md: 11 },
                bgcolor: "#fff",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(35px)",
                transition: "all 0.8s ease",
            }}
        >
            <Container maxWidth="lg">
                {/* Tiêu đề */}
                <Box sx={{ mb: 5 }}>
                    <Typography
                        sx={{
                            color: "#15803D",
                            fontSize: 13,
                            fontWeight: 700,
                            letterSpacing: 1.5,
                            mb: 1,
                            textTransform: "uppercase",
                        }}
                    >
                        Khám phá StayWise
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            color: "#172B24",
                            fontSize: { xs: 25, md: 34 },
                        }}
                    >
                        Tìm chỗ nghỉ theo phong cách của bạn
                    </Typography>

                    <Typography sx={{ mt: 1, color: "#64748B", fontSize: 15 }}>
                        Khám phá những không gian nghỉ dưỡng phù hợp
                        với chuyến đi của bạn.
                    </Typography>
                </Box>

                {/* Danh sách HomeStay */}
                {loading ? (
                    <Typography
                        sx={{ textAlign: "center", color: "text.secondary" }}
                    >
                        Đang tải dữ liệu HomeStay...
                    </Typography>
                ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {danhSachTheLoai.map((category) => {
                            const danhSach =
                                danhSachHomeStay[category.value] || [];

                            if (danhSach.length === 0) return null;

                            return (
                                <Box key={category.value}>
                                    {/* Tiêu đề loại hình */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 2.5,
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: 23,
                                                    fontWeight: 800,
                                                    color: "#172B24",
                                                }}
                                            >
                                                {category.label}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: "#64748B",
                                                    fontSize: 14,
                                                    mt: 0.5,
                                                }}
                                            >
                                                {danhSach.length} chỗ nghỉ
                                            </Typography>
                                        </Box>

                                        <Button
                                            onClick={() =>
                                                xemHomeStayTheoLoai(category.value)
                                            }
                                            endIcon={<ArrowRight size={16} />}
                                            sx={{
                                                color: "#15803D",
                                                fontWeight: 700,
                                                textTransform: "none",
                                            }}
                                        >
                                            Xem thêm
                                        </Button>
                                    </Box>

                                    {/* Danh sách thẻ HomeStay */}
                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: {
                                                xs: "1fr",
                                                sm: "repeat(2, minmax(0, 1fr))",
                                                md: "repeat(4, minmax(0, 1fr))",
                                            },
                                            gap: 2.5,
                                        }}
                                    >
                                        {danhSach.map((homeStay) => (
                                            <HomeStayCard
                                                key = {homeStay.id}
                                        homeStay={homeStay}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            );
                        })}

                        {!Object.values(danhSachHomeStay).some(
                            (danhSach) => danhSach.length > 0
                        ) && (
                                <Typography
                                    color="text.secondary"
                                    sx={{ py: 4, textAlign: "center" }}
                                >
                                    Hiện chưa có chỗ nghỉ nào được duyệt.
                                </Typography>
                            )}
                    </Box>
                )}
            </Container>
        </Box>
    );
}

export default DiscoverSection;
