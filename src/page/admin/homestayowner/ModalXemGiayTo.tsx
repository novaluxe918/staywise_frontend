
import React, { useState } from "react";
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Stack,
    Avatar,
    Divider,
    Paper,
} from "@mui/material";

import {
    CloseOutlined,
    BadgeOutlined,
    ZoomInOutlined,
    ImageNotSupportedOutlined,
    DescriptionOutlined,
} from "@mui/icons-material";
import type { OwnerRow } from "../../../types/nguoiDung";

interface Props {
    open: boolean;
    onClose: () => void;
    owner: OwnerRow | null;
}

function ModalXemGiayTo({ open, onClose, owner }: Props) {
    const [anhDangXem, setAnhDangXem] = useState<string | null>(null);

    if (!owner) return null;

    const danhSachGiayTo = [
        {
            ten: "CCCD mặt trước",
            moTa: "Thông tin cá nhân và ảnh chân dung",
            anh: owner.anhCCCDMatTruoc,
            icon: <BadgeOutlined />,
        },
        {
            ten: "CCCD mặt sau",
            moTa: "Quê quán, ngày cấp và đặc điểm nhận dạng",
            anh: owner.anhCCCDMatSau,
            icon: <BadgeOutlined />,
        },
        {
            ten: "Giấy phép kinh doanh",
            moTa: "Giấy tờ xác nhận đăng ký kinh doanh",
            anh: owner.anhGiayPhepKinhDoanh,
            icon: <DescriptionOutlined />,
        },
    ];

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="md"
                fullWidth
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 3,
                            overflow: "hidden",
                        },
                    },
                }}
            >
                {/* Tiêu đề */}
                <DialogTitle
                    sx={{
                        px: 3,
                        py: 2.5,
                        borderBottom: "1px solid #E2E8F0",
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{ justifyContent: "space-between", alignItems: "center" }}
                    >
                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{ alignItems: "center" }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: "#E0F2F1",
                                    color: "#0D9488",
                                    width: 42,
                                    height: 42,
                                }}
                            >
                                <BadgeOutlined />
                            </Avatar>

                            <Stack spacing={0.3}>
                                <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
                                    Hồ sơ giấy tờ xác minh
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Kiểm tra thông tin và giấy tờ của chủ HomeStay
                                </Typography>
                            </Stack>
                        </Stack>

                        <IconButton onClick={onClose}>
                            <CloseOutlined />
                        </IconButton>
                    </Stack>
                </DialogTitle>

                <DialogContent sx={{ p: 3 }}>
                    {/* Thông tin Owner */}
                    <Stack spacing={1} sx={{ mb: 3, mt: 1 }}>
                        <Typography sx={{ fontWeight: 700, color: "#0F172A" }}>
                            Thông tin chủ sở hữu
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ flexWrap: "wrap" }}
                            useFlexGap
                        >
                            <Typography variant="body2" color="#475569">
                                Họ tên: <b>{owner.hoTen}</b>
                            </Typography>

                            <Typography variant="body2" color="#475569">
                                Email: <b>{owner.email || "Chưa cập nhật"}</b>
                            </Typography>

                            <Typography variant="body2" color="#475569">
                                SĐT: <b>{owner.soDienThoai || "Chưa cập nhật"}</b>
                            </Typography>
                        </Stack>
                    </Stack>

                    <Divider sx={{ mb: 3 }} />

                    {/* Danh sách giấy tờ */}
                    <Typography
                        color="#0F172A"
                        sx={{ mb: 2, fontWeight: 700 }}
                    >
                        Danh sách giấy tờ
                    </Typography>

                    <Stack spacing={3}>
                        {danhSachGiayTo.map((item, index) => (
                            <Paper
                                key={index}
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    borderRadius: 2.5,
                                    borderColor: "#E2E8F0",
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{ mb: 1.5, alignItems: "center" }}
                                >
                                    <Stack
                                        sx={{ color: "#0D9488" }}
                                    >
                                        {item.icon}
                                    </Stack>

                                    <Stack spacing={0.3}>
                                        <Typography
                                            sx={{ fontWeight: 700, fontSize: 14 }}
                                        >
                                            {item.ten}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {item.moTa}
                                        </Typography>
                                    </Stack>
                                </Stack>

                                {item.anh ? (
                                    <Stack
                                        onClick={() => setAnhDangXem(item.anh!)}
                                        sx={{
                                            position: "relative",
                                            height: 240,
                                            borderRadius: 2,
                                            overflow: "hidden",
                                            bgcolor: "#F8FAFC",
                                            border: "1px solid #E2E8F0",
                                            cursor: "zoom-in",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            "&:hover .zoom-overlay": {
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        <img
                                            src={item.anh}
                                            alt={item.ten}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                            }}
                                        />

                                        <Box
                                            className="zoom-overlay"
                                            sx={{
                                                position: "absolute",
                                                inset: 0,
                                                display: "flex",
                                                flexDirection: "row",
                                                gap: 1,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                bgcolor: "rgba(15,23,42,0.5)",
                                                color: "#fff",
                                                opacity: 0,
                                                transition: "0.2s",
                                            }}
                                        >
                                            <ZoomInOutlined />
                                            <Typography sx={{ fontWeight: 600 }}>
                                                Nhấn để phóng to
                                            </Typography>
                                        </Box>
                                    </Stack>
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 1,
                                            height: 180,
                                            bgcolor: "#F8FAFC",
                                            border: "1px dashed #CBD5E1",
                                            borderRadius: 2,
                                            color: "#94A3B8",
                                        }}
                                    >
                                        <ImageNotSupportedOutlined
                                            sx={{ fontSize: 35 }}
                                        />
                                        <Typography variant="body2">
                                            Chưa cung cấp giấy tờ này
                                        </Typography>
                                    </Box>
                                )}
                            </Paper>
                        ))}
                    </Stack>
                </DialogContent>
            </Dialog>

            {/* Modal phóng to ảnh */}
            <Dialog
                open={Boolean(anhDangXem)}
                onClose={() => setAnhDangXem(null)}
                maxWidth="lg"
            >
                <Stack
                    direction="row"
                    sx={{ p: 1, justifyContent: "flex-end" }}
                >
                    <IconButton onClick={() => setAnhDangXem(null)}>
                        <CloseOutlined />
                    </IconButton>
                </Stack>

                {anhDangXem && (
                    <img
                        src={anhDangXem}
                        alt="Giấy tờ phóng to"
                        style={{
                            display: "block",
                            maxWidth: "85vw",
                            maxHeight: "80vh",
                            objectFit: "contain",
                        }}
                    />
                )}
            </Dialog>
        </>
    );
}

export default ModalXemGiayTo;
