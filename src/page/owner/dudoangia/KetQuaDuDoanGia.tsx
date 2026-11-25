
import React from "react";
import {
    Box,
    Paper,
    Stack,
    Typography,
    Divider,
    Chip,
} from "@mui/material";
import { Sparkles, Wallet, TrendingUp } from "lucide-react";

import type { DuDoanGiaResponse } from "../../../types/duDoanGia";

interface Props {
    ketQua: DuDoanGiaResponse | null;
}

const KetQuaDuDoanGia: React.FC<Props> = ({ ketQua }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                height: "100%",
            }}
        >
            <Stack spacing={2.5}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <Sparkles size={20} color="#7C3AED" />

                    <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
                        Kết quả dự đoán
                    </Typography>
                </Stack>

                {ketQua ? (
                    <>
                        <Box>
                            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                <Wallet size={18} color="#64748B" />
                                <Typography color="text.secondary">
                                    Giá phòng hiện tại
                                </Typography>
                            </Stack>

                            <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
                                {ketQua.giaHienTai.toLocaleString("vi-VN")} VNĐ
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                <TrendingUp size={18} color="#2563EB" />
                                <Typography color="text.secondary">
                                    Giá AI đề xuất
                                </Typography>
                            </Stack>

                            <Typography
                                variant="h4"
                                color="primary"
                                sx={{ fontWeight: 800, mt: 1 }}
                            >
                                {ketQua.giaDuDoan.toLocaleString("vi-VN")} VNĐ
                            </Typography>
                        </Box>

                        <Divider />

                        <Stack
                            direction="row"
                            sx={{
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                        </Stack>
                    </>
                ) : (
                    <Box
                        sx={{
                            py: 6,
                            textAlign: "center",
                            color: "text.secondary",
                        }}
                    >
                        <Sparkles size={36} color="#94A3B8" />

                        <Typography sx={{ mt: 2, fontWeight: 600 }}>
                            Chưa có kết quả dự đoán
                        </Typography>

                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Vui lòng chọn phòng và ngày áp dụng để AI phân tích giá.
                        </Typography>
                    </Box>
                )}
            </Stack>
        </Paper>
    );
};

export default KetQuaDuDoanGia;
