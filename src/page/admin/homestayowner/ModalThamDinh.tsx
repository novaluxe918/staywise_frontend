
import React, { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    Button,
    TextField,
    Stack,
    IconButton,
    Divider,
    Alert,
} from "@mui/material";

import {
    CloseOutlined,
    
    CancelOutlined,
    GavelOutlined,
    CheckCircleOutlineOutlined,
} from "@mui/icons-material";

import type {
    OwnerRow,
    CapNhatTrangThaiXacMinhRequest,
} from "../../../types/nguoiDung";

// 1. Khai báo Props
interface Props {
    open: boolean;
    onClose: () => void;
    owner: OwnerRow | null;

    onSubmit: (
        id: number,
        data: CapNhatTrangThaiXacMinhRequest
    ) => void;
}

function ModalThamDinh({
    open,
    onClose,
    owner,
    onSubmit,
}: Props) {


    const [trangThai, setTrangThai] = useState<
        "DA_XAC_MINH" | "TU_CHOI" | null
    >(null);

    // 3. State lưu lý do từ chối
    const [lyDo, setLyDo] = useState("");

    // 4. Reset dữ liệu khi mở Modal
    useEffect(() => {
        if (open) {
            setTrangThai(null);
            setLyDo("");
        }
    }, [open, owner]);

    if (!owner) return null;

    const handleXacNhan = () => {

        if (!trangThai) return;

        if (trangThai === "TU_CHOI" && !lyDo.trim()) {
            return;
        }

        const data: CapNhatTrangThaiXacMinhRequest = {
            trangThaiXacMinh: trangThai,
            lyDoTuChoiXacMinh:
                trangThai === "TU_CHOI"
                    ? lyDo.trim()
                    : null,
        };

        onSubmit(owner.id, data);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 3,
                    },
                },
            }}
        >
            {/* Tiêu đề */}
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            bgcolor: "#F0FDFA",
                            color: "#0D9488",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <GavelOutlined />
                    </Box>

                    <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
                            Thẩm định hồ sơ
                        </Typography>

                        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                            Xác nhận kết quả kiểm tra hồ sơ
                        </Typography>
                    </Box>
                </Stack>

                <IconButton onClick={onClose}>
                    <CloseOutlined />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ py: 3 }}>

                {/* Thông tin Owner */}
                <Box
                    sx={{
                        bgcolor: "#F8FAFC",
                        borderRadius: 2,
                        p: 2,
                        mb: 3,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 12,
                            color: "text.secondary",
                            fontWeight: 700,
                            mb: 1,
                        }}
                    >
                        THÔNG TIN CHỦ HOMESTAY
                    </Typography>

                    <Typography sx={{ fontWeight: 700 }}>
                        {owner.hoTen}
                    </Typography>

                    <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                        {owner.email}
                    </Typography>

                    <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                        {owner.soDienThoai || "Chưa cập nhật số điện thoại"}
                    </Typography>
                </Box>

                {/* Chọn trạng thái */}
                <Typography sx={{ fontWeight: 700, mb: 1.5 }}>
                    Kết quả thẩm định
                </Typography>

                <Stack direction="row" spacing={2}>

                    <Button
                        fullWidth
                        variant={
                            trangThai === "DA_XAC_MINH"
                                ? "contained"
                                : "outlined"
                        }
                        color="success"
                        startIcon={<CheckCircleOutlineOutlined />}
                        onClick={() => setTrangThai("DA_XAC_MINH")}
                        sx={{ py: 1.3, borderRadius: 2 }}
                    >
                        Duyệt hồ sơ
                    </Button>

                    <Button
                        fullWidth
                        variant={
                            trangThai === "TU_CHOI"
                                ? "contained"
                                : "outlined"
                        }
                        color="error"
                        startIcon={<CancelOutlined />}
                        onClick={() => setTrangThai("TU_CHOI")}
                        sx={{ py: 1.3, borderRadius: 2 }}
                    >
                        Từ chối
                    </Button>

                </Stack>

                {/* Nội dung khi duyệt */}
                {trangThai === "DA_XAC_MINH" && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Bạn đang chọn duyệt hồ sơ của chủ HomeStay này.
                        Vui lòng xác nhận để hoàn tất.
                    </Alert>
                )}

                {/* Nội dung khi từ chối */}
                {trangThai === "TU_CHOI" && (
                    <Box sx={{ mt: 2 }}>

                        <Alert severity="warning" sx={{ mb: 2 }}>
                            Bạn đang chọn từ chối hồ sơ.
                            Vui lòng ghi rõ lý do từ chối.
                        </Alert>

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Lý do từ chối"
                            placeholder="Nhập lý do từ chối hồ sơ..."
                            value={lyDo}
                            onChange={(e) => setLyDo(e.target.value)}
                            error={!lyDo.trim()}
                            helperText={
                                !lyDo.trim()
                                    ? "Vui lòng nhập lý do từ chối"
                                    : "Hãy ghi rõ nội dung cần bổ sung hoặc chỉnh sửa"
                            }
                        />

                    </Box>
                )}

            </DialogContent>

            <Divider />

            {/* Nút xác nhận */}
            <DialogActions sx={{ px: 3, py: 2 }}>

                <Button onClick={onClose} color="inherit">
                    Hủy
                </Button>

                <Button
                    variant="contained"
                    disabled={
                        !trangThai ||
                        (trangThai === "TU_CHOI" && !lyDo.trim())
                    }
                    color={
                        trangThai === "TU_CHOI"
                            ? "error"
                            : "success"
                    }
                    onClick={handleXacNhan}
                    sx={{ borderRadius: 2, px: 3 }}
                >
                    {trangThai === "DA_XAC_MINH"
                        ? "Xác nhận duyệt"
                        : trangThai === "TU_CHOI"
                            ? "Xác nhận từ chối"
                            : "Xác nhận"}
                </Button>

            </DialogActions>
        </Dialog>
    );
}

export default ModalThamDinh;
