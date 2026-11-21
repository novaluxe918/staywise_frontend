
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    IconButton,
    Stack,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

import { toast } from "../../../utils/toast";
import { useUploadAnh } from "../../../hooks/useUploadAnh";
import { saveLoaiGiuong } from "../../../services/giuongService";
import { loaiGiuongSchema, type LoaiGiuongFormData } from "../../../schemas/loaiGiuongSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoaiGiuong } from "../../../types/giuong";

interface Props {
    open: boolean;
    onClose: () => void;
    duLieuUpdate: LoaiGiuong | null;
    onSuccess: () => void;
}

function ModalThemLoaiGiuong({ open, onClose, duLieuUpdate, onSuccess }: Props) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoaiGiuongFormData>({
        resolver: zodResolver(loaiGiuongSchema),
        defaultValues: {
            tenGiuong: "",
        },
    });

    const {
        fileAnh,
        previewAnh,
        handleChonAnh,
        xoaAnh,
    } = useUploadAnh({
        nhieuAnh: false,
        maxSize: 2 * 1024 * 1024,
        dinhDang: [
            "image/jpeg",
            "image/png",
            "image/webp",
        ],
    });

    const [dangLuu, setDangLuu] = useState(false);

    const anhHienThi = previewAnh || duLieuUpdate?.hinhAnh;

    const onSubmit = async (data: LoaiGiuongFormData) => {
        if (!duLieuUpdate && !fileAnh) {
            toast.warning("Vui lòng chọn hình ảnh loại giường!");
            return;
        }

        try {
            setDangLuu(true);

            await saveLoaiGiuong(
                data.tenGiuong,
                fileAnh,
                duLieuUpdate?.id
            );

            toast.success(
                duLieuUpdate
                    ? "Cập nhật loại giường thành công!"
                    : "Thêm loại giường thành công!"
            );
            onSuccess;
            onClose();

        } catch (error: any) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Lưu loại giường thất bại!"
            );
        } finally {
            setDangLuu(false);
        }
    };

    useEffect(() => {
        if (!open) return;

        if (duLieuUpdate) {

            reset({
                tenGiuong: duLieuUpdate.tenGiuong,
            });
        } else {

            reset({
                tenGiuong: "",
            });
        }

        xoaAnh();
    }, [open, duLieuUpdate]);
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 4,
                        overflow: "hidden",
                        boxShadow: "0 20px 60px rgba(46,125,50,0.15)",
                    },
                },
            }}
        >
            {/* Header */}
            <DialogTitle
                sx={{
                    bgcolor: "#E8F5E9",
                    px: 3,
                    py: 2.5,
                }}
            >
                <Stack
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ alignItems: "center" }}
                    >
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 3,
                                bgcolor: "#D1EAD5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <BedOutlinedIcon
                                sx={{ color: "#2E7D32", fontSize: 28 }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: 20,
                                    color: "#205C32",
                                }}
                            >
                                {duLieuUpdate ? "Cập nhật loại giường" : "Thêm loại giường"}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="#52765B"
                            >
                                {duLieuUpdate
                                    ? "Chỉnh sửa thông tin loại giường"
                                    : "Tạo loại giường mới cho StayWise"}
                            </Typography>
                        </Box>
                    </Stack>

                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: "#52765B",
                            "&:hover": {
                                bgcolor: "#D9EBDD",
                            },
                        }}
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>

            {/* Nội dung */}
            <DialogContent
                sx={{
                    p: 3,
                    bgcolor: "#FFFFFF",
                }}
            >
                {/* Tên giường */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            color: "#244B30",
                            mb: 1,
                        }}
                    >
                        Tên loại giường
                        <Box component="span" color="error.main"> *</Box>
                    </Typography>

                    <TextField
                        fullWidth
                        placeholder="Ví dụ: Giường đơn, Giường đôi..."
                        size="medium"
                        {...register("tenGiuong")}
                        error={!!errors.tenGiuong}
                        helperText={errors.tenGiuong?.message}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2.5,
                                "&.Mui-focused fieldset": {
                                    borderColor: "#2E7D32",
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#2E7D32",
                            },
                        }}
                    />

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 1, display: "block" }}
                    >
                        Nhập tên loại giường dễ nhận biết.
                    </Typography>
                </Box>

                {/* Ảnh */}
                <Box>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            color: "#244B30",
                            mb: 1.5,
                        }}
                    >
                        Hình ảnh loại giường
                        <Box component="span" color="error.main"> *</Box>
                    </Typography>

                    {!anhHienThi ? (
                        // Chưa có ảnh
                        <Box
                            sx={{
                                border: "2px dashed #8DB99A",
                                borderRadius: 4,
                                bgcolor: "#F7FCF8",
                                p: 4,
                                textAlign: "center",
                            }}
                        >
                            <ImageOutlinedIcon
                                sx={{ fontSize: 40, color: "#35834A", mb: 1 }}
                            />

                            <Typography sx={{ fontWeight: 600, color: "#2D6A3D" }}>
                                Tải ảnh loại giường lên
                            </Typography>

                            <Button
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadOutlinedIcon />}
                                sx={{
                                    mt: 2,
                                    bgcolor: "#2E7D32",
                                    borderRadius: 2.5,
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "#256429" },
                                }}
                            >
                                Chọn hình ảnh

                                <input
                                    hidden
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={handleChonAnh}
                                />
                            </Button>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: "block", mt: 2 }}
                            >
                                PNG, JPG, WEBP • Tối đa 2MB
                            </Typography>
                        </Box>
                    ) : (
                        // Đã có ảnh cũ hoặc ảnh mới
                        <Box
                            sx={{
                                border: "1px solid #D5E3D8",
                                borderRadius: 4,
                                p: 2,
                                bgcolor: "#F7FCF8",
                            }}
                        >
                            <Box
                                component="img"
                                src={anhHienThi}
                                alt="Ảnh loại giường"
                                sx={{
                                    width: "100%",
                                    height: 260,
                                    objectFit: "contain",
                                    borderRadius: 3,
                                    bgcolor: "#FFFFFF",
                                }}
                            />

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    mt: 2,
                                    gap: 1,
                                }}
                            >
                                <Box sx={{ minWidth: 0 }}>
                                    <Typography
                                        variant="body2"
                                        color="#52765B"
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {fileAnh?.name || "Ảnh hiện tại"}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    {/* Chọn ảnh khác để thay thế */}
                                    <Button
                                        component="label"
                                        variant="outlined"
                                        size="small"
                                        startIcon={<CloudUploadOutlinedIcon />}
                                        sx={{
                                            textTransform: "none",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        Đổi ảnh

                                        <input
                                            hidden
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp"
                                            onChange={handleChonAnh}
                                        />
                                    </Button>


                                    {fileAnh && (
                                        <IconButton
                                            onClick={() => xoaAnh()}
                                            sx={{
                                                color: "#D32F2F",
                                                bgcolor: "#FDECEC",
                                                "&:hover": {
                                                    bgcolor: "#FADADA",
                                                },
                                            }}
                                        >
                                            <DeleteOutlineRoundedIcon />
                                        </IconButton>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </DialogContent>

            {/* Footer */}
            <DialogActions
                sx={{
                    bgcolor: "#FAFCFA",
                    px: 3,
                    py: 2.5,
                    borderTop: "1px solid #E4EAE5",
                    gap: 1,
                }}
            >
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        borderRadius: 2.5,
                        px: 3,
                        color: "#52675A",
                        borderColor: "#D8E1DA",
                        textTransform: "none",
                        fontWeight: 600,
                    }}
                >
                    Hủy
                </Button>

                <Button
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    sx={{
                        borderRadius: 2.5,
                        px: 3,
                        py: 1.1,
                        bgcolor: "#2E7D32",
                        textTransform: "none",
                        fontWeight: 600,
                        boxShadow: "0 4px 12px rgba(46,125,50,0.2)",
                        "&:hover": {
                            bgcolor: "#256429",
                            boxShadow: "0 6px 16px rgba(46,125,50,0.3)",
                        },
                    }}
                >
                    {dangLuu
                        ? "Đang lưu..."
                        : duLieuUpdate
                            ? "Cập nhật"
                            : "Lưu loại giường"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalThemLoaiGiuong;
