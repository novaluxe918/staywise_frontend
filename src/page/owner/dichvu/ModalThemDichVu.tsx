import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    TextField,
    Typography,
    Box,
    Chip
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import React, { useEffect, useState } from 'react';
import RoomServiceRoundedIcon from '@mui/icons-material/RoomServiceRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useForm } from 'react-hook-form';
import { dichVuSchema, type DichVuFormValues } from '../../../schemas/dichVuSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveDichVu } from '../../../services/dichVuService';
import { toast } from '../../../utils/toast';
import type { DichVu } from '../../../types/dichVu';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ModalThemDichVu({
    open,
    handleClose,
    onSuccess,
    duLieuUpdate
}: {
    open: boolean;
    handleClose: () => void;
    onSuccess: () => void;
    duLieuUpdate: DichVu | null
}) {

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<DichVuFormValues>({
        resolver: zodResolver(dichVuSchema),
        defaultValues: {
            tenDichVu: ""
        }
    });

    useEffect(() => {
        if (!open) return;

        if (duLieuUpdate) {

            reset({
                tenDichVu: duLieuUpdate.tenDichVu
            });

        } else {
            reset({
                tenDichVu: ""
            });
        }
    }, [open, duLieuUpdate, reset]);

    const tenDichVu = watch("tenDichVu");
    const maxLength = 100;

    const handleLuu = handleSubmit(async (data) => {
        try {
            await saveDichVu({
                ...(duLieuUpdate && { id: duLieuUpdate.id }),
                tenDichVu: data.tenDichVu
            });

            toast.success(
                duLieuUpdate
                    ? "Cập nhật dịch vụ thành công!"
                    : "Thêm dịch vụ thành công!"
            );

            reset();
            handleClose();
            onSuccess();

        } catch (error) {
            console.error("Lỗi lưu dịch vụ:", error);

            toast.error(
                duLieuUpdate
                    ? "Cập nhật dịch vụ thất bại!"
                    : "Thêm dịch vụ thất bại!"
            );
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
                maxWidth="sm"
                fullWidth
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: '16px',
                            p: 1.5,
                            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)'
                        }
                    }
                }}
            >
                <DialogTitle sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                            }}
                        >
                            <RoomServiceRoundedIcon fontSize="small" />
                        </Box>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a' }}>
                                    {duLieuUpdate ? "Cập nhật dịch vụ" : "Thêm dịch vụ"}
                                </Typography>
                                <Chip
                                    label="BẮT BUỘC"
                                    size="small"
                                    sx={{
                                        bgcolor: '#fef2f2',
                                        color: '#ef4444',
                                        fontWeight: 700,
                                        fontSize: '0.65rem',
                                        height: 20,
                                        borderRadius: '4px'
                                    }}
                                />
                            </Box>
                            <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                                Điền thông tin dịch vụ phục vụ khách lưu trú tại homestay
                            </Typography>
                        </Box>
                    </Box>
                </DialogTitle>

                <DialogContent sx={{ pt: 2 }}>
                    <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#334155' }}>
                            Tên dịch vụ <span style={{ color: '#ef4444' }}>*</span>
                        </Typography>
                        <Typography variant="caption" sx={{ color: tenDichVu.length >= maxLength ? '#ef4444' : '#94a3b8' }}>
                            {tenDichVu.length}/{maxLength} ký tự
                        </Typography>
                    </Box>

                    <TextField
                        fullWidth
                        id="alert-dialog-slide-description"
                        placeholder="Nhập tên dịch vụ (ví dụ: Thuê xe máy, Tiệc nướng BBQ sân vườn...)"
                        {...register("tenDichVu")}
                        onChange={(e) => {
                            setValue(
                                "tenDichVu",
                                e.target.value.slice(0, maxLength),
                                {
                                    shouldValidate: true,
                                    shouldDirty: true
                                }
                            );
                        }}
                        error={!!errors.tenDichVu}
                        helperText={errors.tenDichVu?.message}
                        variant="outlined"
                        autoFocus
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                                bgcolor: '#f8fafc',
                                '& fieldset': { borderColor: '#e2e8f0' },
                                '&:hover fieldset': { borderColor: '#cbd5e1' },
                                '&.Mui-focused': {
                                    bgcolor: '#ffffff',
                                    '& fieldset': { borderColor: '#10b981' }
                                }
                            }
                        }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 1, color: '#64748b' }}>
                        <InfoOutlinedIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                            Tên ngắn gọn, rõ ràng hiển thị trực tiếp trong menu đặt dịch vụ của khách
                        </Typography>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2, pt: 1, gap: 1 }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            color: '#64748b',
                            bgcolor: '#f1f5f9',
                            px: 2.5,
                            '&:hover': { bgcolor: '#e2e8f0' }
                        }}
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        onClick={handleLuu}
                        variant="contained"
                        disabled={isSubmitting}
                        startIcon={<CheckRoundedIcon />}
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                            boxShadow: 'none',
                            px: 3,
                            '&:hover': {
                                background: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
                                boxShadow: 'none'
                            }
                        }}
                    >
                        {isSubmitting
                            ? "Đang lưu..."
                            : duLieuUpdate
                                ? "Cập nhật"
                                : "Lưu"}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ModalThemDichVu;