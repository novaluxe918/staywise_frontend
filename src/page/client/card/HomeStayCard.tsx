
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { HomeStay } from "../../../types/homestay";

interface Props {
    homeStay: HomeStay;
    giaThapNhat?: number;
}

function HomeStayCard({ homeStay, giaThapNhat }: Props) {
    const navigate = useNavigate();

    const anhDaiDien =
        homeStay.danhSachHinhAnh?.find((anh) => anh.laAnhDaiDien)
            ?.duongDan ||
        homeStay.danhSachHinhAnh?.[0]?.duongDan ||
        "/images/no-image.jpg";

    // Ưu tiên giá được truyền từ component cha
    const giaHienThi = giaThapNhat ?? homeStay.giaThapNhat;

    const formatGia = (gia: number) =>
        new Intl.NumberFormat("vi-VN").format(gia) + "đ";

    return (
        <Box
            onClick={() => navigate(`/homestay/${homeStay.id}`)}
            sx={{
                overflow: "hidden",
                borderRadius: 3,
                border: "1px solid #E2E8F0",
                bgcolor: "#fff",
                cursor: "pointer",
                transition: "all 0.25s ease",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                },
            }}
        >
            <Box
                component="img"
                src={anhDaiDien}
                alt={homeStay.tenHomeStay}
                sx={{
                    width: "100%",
                    height: 190,
                    objectFit: "cover",
                    display: "block",
                }}
            />

            <Box sx={{ p: 2 }}>
                <Typography
                    sx={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#172B24",
                        mb: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {homeStay.tenHomeStay}
                </Typography>

                <Typography
                    sx={{
                        fontSize: 13,
                        color: "#64748B",
                        mb: 1.5,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {homeStay.diaChi}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        pt: 1.5,
                        borderTop: "1px solid #F1F5F9",
                    }}
                >
                    <Typography sx={{ fontSize: 13, color: "#64748B" }}>
                        Giá mỗi đêm
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 17,
                            fontWeight: 800,
                            color: "#15803D",
                        }}
                    >
                        {giaHienThi != null
                            ? `Từ ${formatGia(giaHienThi)} / đêm`
                            : "Chưa có giá"}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default HomeStayCard;
