import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Slide,
    TextField,
    Typography,
} from "@mui/material";
import { Check, Shapes, ShieldCheck, Trash2, UploadCloud } from "lucide-react";
import { theLoaiTienIchSchema, type TheLoaiTienIchForm } from "../../../schemas/theLoaiTienIchSchema";
import { toast } from "../../../utils/toast";
import type { TheLoaiTienIch, TheLoaiTienIchDTO } from "../../../types/theLoaiTienIch";
import { saveTheLoai } from "../../../services/theLoaiTienIchService";
import type { TransitionProps } from "@mui/material/transitions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadAnh } from "../../../hooks/useUploadAnh";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalThemTheLoai({
    open,
    handleClose,
    onSuccess,
    duLieuUpdate
}: {
    open: boolean;
    handleClose: () => void;
    onSuccess: () => void;
    duLieuUpdate: TheLoaiTienIch | null
}) {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<TheLoaiTienIchForm>({
        resolver: zodResolver(theLoaiTienIchSchema),
        defaultValues: {
            tenTheLoai: ""
        },
        mode: "onBlur"
    });
    const {
        fileAnh,
        previewAnh,
        setFileAnh,
        setPreviewAnh,
        handleChonAnh,
        xoaAnh,
    } = useUploadAnh();
    const [dangLuu, setDangLuu] = useState<boolean>(false);



    useEffect(() => {
        if (!open) return;

        if (duLieuUpdate) {
            reset({
                tenTheLoai: duLieuUpdate.tenTheLoai
            });

            setPreviewAnh(duLieuUpdate.hinhAnh);
            setFileAnh(null);

        } else {
            reset({
                tenTheLoai: ""
            });

            setPreviewAnh(null);
            setFileAnh(null);
        }
    }, [open, duLieuUpdate, reset]);

    const handleLuuTheLoai = handleSubmit(async (data) => {
        try {
            setDangLuu(true);

            const dto: TheLoaiTienIchDTO = {
                id: duLieuUpdate?.id ?? null,
                tenTheLoai: data.tenTheLoai,
            };

            const response = await saveTheLoai(dto, fileAnh);

            toast.success(
                response.message ||
                (duLieuUpdate
                    ? "Cập nhật thể loại thành công!"
                    : "Thêm thể loại thành công!")
            );

            onSuccess();

        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Không thể lưu thể loại tiện ích!"
            );
        } finally {
            setDangLuu(false);
        }
    });

    return (
        <React.Fragment>
            <Dialog
                open={open}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                role="alertdialog"
                maxWidth="md"
                fullWidth
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 3,
                            p: 2,
                            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                        },
                    },
                }}
            >
                <DialogTitle component="div" sx={{ px: 2, pt: 1, pb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#111827" }}>
                        {duLieuUpdate
                            ? "Cập nhật Thể loại Tiện ích"
                            : "Thêm Thể loại Tiện ích"}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.5 }}>
                        {duLieuUpdate
                            ? "Cập nhật thông tin nhóm tiện ích để quản lý và phân loại các tiện nghi tại cơ sở."
                            : "Khai báo nhóm tiện ích lưu trú mới để phân loại và quản lý các tiện nghi tại cơ sở."}
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ px: 2, py: 1 }}>
                    <Box
                        sx={{
                            border: "1px solid #e5e7eb",
                            borderRadius: 2.5,
                            p: 3,
                            backgroundColor: "#ffffff",
                        }}
                    >
                        {/* Tiêu đề mục & Tag chuẩn */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                                <Box
                                    sx={{
                                        width: 4,
                                        height: 24,
                                        backgroundColor: "#047857",
                                        borderRadius: 1,
                                        mt: 0.3,
                                    }}
                                />
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1f2937" }}>
                                        Thông tin nhóm tiện ích
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                        Điền các trường thông tin bên dưới để cấu hình hiển thị cho du khách.
                                    </Typography>
                                </Box>
                            </Box>

                            <Chip
                                icon={<ShieldCheck size={16} color="#047857" />}
                                label="Mẫu chuẩn Staywise"
                                sx={{
                                    backgroundColor: "#ecfdf5",
                                    color: "#065f46",
                                    fontWeight: 600,
                                    fontSize: 12,
                                    borderRadius: 2,
                                    "& .MuiChip-icon": { ml: 1 },
                                }}
                            />
                        </Box>

                        {/* Ô nhập tên thể loại - Dùng value & onChange thuần */}
                        <Box sx={{ mb: 3.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: "#374151" }}>
                                Tên thể loại tiện ích <span style={{ color: "#ef4444" }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                size="medium"
                                {...register("tenTheLoai")}
                                error={!!errors.tenTheLoai}
                                helperText={errors.tenTheLoai?.message}
                                placeholder="Nhập tên thể loại tiện ích..."
                                slotProps={{
                                    input: {
                                        endAdornment: <Shapes size={18} color="#94a3b8" />,
                                    },
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                    },
                                }}
                            />
                            <Typography variant="caption" sx={{ color: "#6b7280", mt: 0.8, display: "block" }}>
                                Tên nhóm sẽ được hiển thị trên bộ lọc tìm kiếm tiện nghi của khách du lịch.
                            </Typography>
                        </Box>

                        {/* Chọn hình ảnh */}
                        <Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#374151" }}>
                                    Hình ảnh / Biểu tượng đại diện (HinhAnh)
                                </Typography>
                                <Typography variant="caption" sx={{ color: "#6b7280" }}>
                                    Định dạng SVG, PNG, JPG (Tối đa 2MB)
                                </Typography>
                            </Box>

                            <Box
                                component="label"
                                sx={{
                                    border: "1.5px dashed #cbd5e1",
                                    borderRadius: 2.5,
                                    p: 3,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#fafbfc",
                                    cursor: "pointer",
                                    transition: "border-color 0.2s",
                                    "&:hover": { borderColor: "#047857" },
                                }}
                            >
                                <input
                                    type="file"
                                    hidden
                                    accept=".svg,.png,.jpg,.jpeg"
                                    onChange={handleChonAnh}
                                />
                                <Box
                                    sx={{
                                        backgroundColor: "#f1f5f9",
                                        borderRadius: "50%",
                                        p: 1.5,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 1.5,
                                    }}
                                >
                                    <UploadCloud size={26} color="#047857" />
                                </Box>
                                <Typography variant="body2" sx={{ color: "#374151", textAlign: "center" }}>
                                    <span style={{ color: "#047857", fontWeight: 600 }}>Chọn tệp / Duyệt ảnh</span> hoặc kéo thả biểu tượng vào đây
                                </Typography>
                                <Typography variant="caption" sx={{ color: "#94a3b8", mt: 0.5, textAlign: "center" }}>
                                    Khuyến dùng tỷ lệ 1:1, ảnh vector SVG hoặc PNG nền trong suốt để hiển thị sắc nét nhất.
                                </Typography>
                            </Box>

                            {/* Preview ảnh */}
                            {previewAnh && (
                                <Box
                                    sx={{
                                        mt: 2,
                                        p: 1.5,
                                        borderRadius: 2,
                                        backgroundColor: "#f0fdfa",
                                        border: "1px solid #ccfbf1",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: 2,
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                        <Box
                                            component="img"
                                            src={previewAnh}
                                            alt="Ảnh đại diện"
                                            sx={{
                                                width: 65,
                                                height: 65,
                                                objectFit: "contain",
                                                borderRadius: 2,
                                                backgroundColor: "#ffffff",
                                                border: "1px solid #ccfbf1",
                                            }}
                                        />

                                        <Box sx={{ minWidth: 0 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: "#0f172a",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    maxWidth: 250,
                                                }}
                                            >
                                                {fileAnh?.name || "Ảnh hiện tại"}
                                            </Typography>

                                            <Typography variant="caption" sx={{ color: "#64748b" }}>
                                                {fileAnh
                                                    ? `${(fileAnh.size / 1024).toFixed(1)} KB`
                                                    : "Ảnh đang được sử dụng"}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Chip
                                            label={duLieuUpdate ? "Ảnh hiện tại" : "Sẵn sàng tải"}
                                            size="small"
                                            sx={{
                                                backgroundColor: "#2dd4bf",
                                                color: "#ffffff",
                                                fontWeight: 600,
                                                fontSize: 11,
                                            }}
                                        />

                                        {!duLieuUpdate && (
                                            <IconButton
                                                size="small"
                                                onClick={() => {
                                                    xoaAnh
                                                }}
                                                sx={{
                                                    color: "#94a3b8",
                                                    "&:hover": { color: "#ef4444" },
                                                }}
                                            >
                                                <Trash2 size={18} />
                                            </IconButton>
                                        )}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 2, pt: 2, pb: 1, display: "flex", justifyContent: "space-between" }}>
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                        sx={{
                            color: "#475569",
                            borderColor: "#cbd5e1",
                            textTransform: "none",
                            borderRadius: 2,
                            px: 3,
                            "&:hover": { borderColor: "#94a3b8", backgroundColor: "#f8fafc" },
                        }}
                    >
                        Hủy bỏ
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<Check size={18} />}
                        onClick={handleLuuTheLoai}
                        disabled={dangLuu}
                        sx={{
                            backgroundColor: "#064e3b",
                            color: "#ffffff",
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 2,
                            px: 3,
                            "&:hover": { backgroundColor: "#022c22" },
                        }}
                    >
                        {dangLuu
                            ? "Đang lưu..."
                            : duLieuUpdate
                                ? "Cập nhật"
                                : "Lưu thể loại"}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}