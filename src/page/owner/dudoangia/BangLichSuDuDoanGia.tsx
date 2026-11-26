
import React from "react";
import {
    Box,
    Stack,
    Typography,
    Divider,
} from "@mui/material";

import { History, Info } from "lucide-react";
import type { LichSuDoanGia } from "../../../types/duDoanGia";

interface Props {
    lichSu: LichSuDoanGia[];
    loading?: boolean;
}

const BangLichSuDuDoanGia: React.FC<Props> = ({
    lichSu,
    loading = false,
}) => {
    return (
        <Box>
            {/* TIÊU ĐỀ */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                sx={{
                    justifyContent: "space-between",
                    alignItems: {
                        xs: "flex-start",
                        sm: "center",
                    },
                }}
            >
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            bgcolor: "#EFF6FF",
                            color: "#2563EB",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <History size={20} />
                    </Box>

                    <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: "1.05rem" }}>
                            Lịch sử dự đoán
                        </Typography>

                        <Typography sx={{ fontSize: "0.825rem", color: "#64748B" }}>
                            Theo dõi những lần dự đoán giá trước đó
                        </Typography>
                    </Box>
                </Stack>

                <Stack
                    direction="row"
                    spacing={0.75}
                    sx={{
                        alignItems: "center",
                        color: "#64748B",
                    }}
                >
                    <Info size={15} />

                    <Typography sx={{ fontSize: "0.8rem" }}>
                        Giá đề xuất chỉ mang tính chất tham khảo
                    </Typography>
                </Stack>
            </Stack>

            <Divider sx={{ my: 2.5, borderColor: "#F1F5F9" }} />

            {/* ĐANG TẢI */}
            {loading ? (
                <Box sx={{ py: 5, textAlign: "center" }}>
                    <Typography sx={{ color: "#64748B" }}>
                        Đang tải lịch sử dự đoán...
                    </Typography>
                </Box>
            ) : lichSu.length === 0 ? (
                <Box
                    sx={{
                        py: 5,
                        px: 2,
                        borderRadius: 3,
                        bgcolor: "#F8FAFC",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            color: "#475569",
                        }}
                    >
                        Chưa có lịch sử dự đoán
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "0.825rem",
                            color: "#94A3B8",
                            mt: 0.5,
                        }}
                    >
                        Các lần dự đoán sẽ được lưu lại tại đây.
                    </Typography>
                </Box>
            ) : (
                /* DANH SÁCH LỊCH SỬ */
                <Stack spacing={2}>
                    {lichSu.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                p: 2,
                                border: "1px solid #E2E8F0",
                                borderRadius: 3,
                                bgcolor: "#FFFFFF",
                                transition: "0.2s",
                                "&:hover": {
                                    borderColor: "#93C5FD",
                                    bgcolor: "#F8FAFC",
                                },
                            }}
                        >
                            <Stack
                                direction={{
                                    xs: "column",
                                    sm: "row",
                                }}
                                spacing={2}
                                sx={{
                                    justifyContent: "space-between",
                                    alignItems: {
                                        xs: "flex-start",
                                        sm: "center",
                                    },
                                }}
                            >
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            color: "#1E293B",
                                        }}
                                    >
                                        {item.tenPhong}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: "0.825rem",
                                            color: "#64748B",
                                            mt: 0.5,
                                        }}
                                    >
                                        {item.tenHomeStay}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: "0.8rem",
                                            color: "#64748B",
                                            mt: 1,
                                        }}
                                    >
                                        Ngày áp dụng:{" "}
                                        {new Date(
                                            `${item.ngayApDung}T00:00:00`
                                        ).toLocaleDateString("vi-VN")}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: "0.8rem",
                                            color: "#94A3B8",
                                            mt: 0.5,
                                        }}
                                    >
                                        Ngày dự đoán:{" "}
                                        {new Date(
                                            item.ngayDuDoan
                                        ).toLocaleString("vi-VN")}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        textAlign: {
                                            xs: "left",
                                            sm: "right",
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "0.8rem",
                                            color: "#64748B",
                                        }}
                                    >
                                        Giá dự đoán
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: "1.2rem",
                                            fontWeight: 700,
                                            color: "#2563EB",
                                        }}
                                    >
                                        {Number(
                                            item.giaDuDoan
                                        ).toLocaleString("vi-VN")}{" "}
                                        VNĐ
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: "0.75rem",
                                            color: "#94A3B8",
                                            mt: 0.5,
                                        }}
                                    >
                                        Model: {item.phienBan}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default BangLichSuDuDoanGia;
