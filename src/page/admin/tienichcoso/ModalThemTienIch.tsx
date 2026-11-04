import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, Select, Slide, TextField, Typography } from '@mui/material';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SubjectIcon from '@mui/icons-material/Subject';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import type { TransitionProps } from '@mui/material/transitions';
import React, { useEffect, useState } from 'react';
import { CheckIcon } from 'lucide-react';
import type { TienIchRequest } from '../../../types/tienIch';
import type { TheLoaiTienIch } from '../../../types/theLoaiTienIch';
import { getAllTheLoai } from '../../../services/theLoaiTienIchService';
import Swal from 'sweetalert2';
import { saveTienIch } from '../../../services/tienIchService';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function ModalThemTienIch({ open, handleClose }: { open: boolean; handleClose: () => void }) {
    const initialForm: TienIchRequest = {
        tenTienIch: "",
        moTa: "",
        matheloai: ""
    };

    const [formData, setFormData] =
        useState<TienIchRequest>(initialForm);

    const [danhSachTheLoai, setDanhSachTheLoai] = useState<TheLoaiTienIch[]>([])

    const [dangLuu, setDangLuu] = useState(false);
    const layDanhSachTheLoai = async () => {
        try {
            const data = await getAllTheLoai();

            setDanhSachTheLoai(data);
        } catch (error) {
            console.error("Lỗi lấy thể loại:", error);
        }
    };
    useEffect(() => {
        if (open) {
            layDanhSachTheLoai();
        }
    }, [open]);



    const handleChange = (field: keyof TienIchRequest) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: unknown } }) => {
            const value = event.target.value as TienIchRequest[keyof TienIchRequest];
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        };

    const handleSubmit = async () => {
       
        console.log(formData);

        try {
            setDangLuu(true);

            const dto: TienIchRequest = {
                tenTienIch: formData.tenTienIch.trim(),
                moTa: formData.moTa.trim(),
                matheloai: Number(formData.matheloai)
            };

            await saveTienIch(dto);

            await Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Thêm tiện ích thành công!",
                text: "Tiện ích mới đã được lưu vào hệ thống.",
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
            });

            // Reset form
            setFormData(initialForm);

            // Đóng modal
            handleClose();
        } catch (error: any) {
            console.error("Loi them tien ich", error)
            Swal.fire({
                icon: "error",
                title: "Thêm tiện ích thất bại!",
                text: typeof error.response?.data === "string"
                    ? error.response.data
                    : "Đã xảy ra lỗi khi thêm tiện ích. Vui lòng thử lại.",
                confirmButtonText: "Đóng",
                confirmButtonColor: "#dc2626"
            });
        } finally {
            setDangLuu(false)
        }
    }

    return (
        <Dialog
            open={open}
            slots={{
                transition: Transition,
            }}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 3,
                        p: 1
                    }
                }
            }}
        >
            {/* Header */}
            <DialogTitle sx={{ pb: 1.5, pt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                bgcolor: '#d1fae5',
                                borderRadius: 2.5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#0d9488'
                            }}
                        >
                            <AutoAwesomeOutlinedIcon />
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#111827' }}>
                                Thông tin tiện ích cơ sở
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                Khai báo thông tin chi tiết tiện nghi phục vụ khách tại homestay
                            </Typography>
                        </Box>
                    </Box>
                    <Chip
                        label="BẮT BUỘC"
                        size="small"
                        sx={{
                            bgcolor: '#eef2ff',
                            color: '#6366f1',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            borderRadius: 1
                        }}
                    />
                </Box>
            </DialogTitle>

            {/* Body Form */}
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '10px !important' }}>
                {/* Field 1: Thể loại tiện ích */}
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                        <Typography variant="body2" color="#1f2937" sx={{ fontWeight: 600 }}>
                            Thể loại tiện ích <span style={{ color: '#ef4444' }}>*</span>
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#0d9488', cursor: 'pointer', fontWeight: 600 }}>
                            Phân loại chuẩn Staywise
                        </Typography>
                    </Box>
                    <FormControl fullWidth size="small">
                        <Select
                            displayEmpty
                            value={formData.matheloai}
                            onChange={(event) => {
                                setFormData(prev => ({
                                    ...prev,
                                    matheloai: String(event.target.value) === ""
                                        ? ""
                                        : Number(event.target.value)
                                }));
                            }}
                            renderValue={(selected) => {
                                if (!selected) {
                                    return (
                                        <Typography color="text.disabled">
                                            Chọn thể loại tiện ích
                                        </Typography>
                                    );
                                }
                                const theLoai = danhSachTheLoai.find(
                                    item => item.id === selected
                                );

                                return theLoai?.tenTheLoai ?? "";
                            }}
                            sx={{
                                borderRadius: 2,
                                bgcolor: '#f9fafb',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d1d5db' }
                            }}
                        >
                            <MenuItem value="">
                                Chọn thể loại tiện ích
                            </MenuItem>

                            {danhSachTheLoai.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.tenTheLoai}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.75, color: '#0d9488' }}>
                        <VerifiedUserOutlinedIcon sx={{ fontSize: 16 }} />
                        <Typography variant="caption" color="text.secondary">
                            Giúp đồng bộ với bộ lọc tìm kiếm và thuật toán gợi ý của khách lưu trú
                        </Typography>
                    </Box>
                </Box>

                {/* Field 2: Tên tiện ích */}
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }} color="#1f2937">
                            Tên tiện ích  <span style={{ color: '#ef4444' }}>*</span>
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {formData.tenTienIch.length}/60
                        </Typography>
                    </Box>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Ví dụ: Bồn tắm gỗ Pơ-mu ngâm thảo mộc"
                        value={formData.tenTienIch}
                        onChange={handleChange('tenTienIch')}
                        slotProps={{ htmlInput: { maxLength: 60 } }}
                        sx={{
                            bgcolor: '#f9fafb',
                            '& .MuiOutlinedInput-root': { borderRadius: 2 }
                        }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.75, color: 'text.secondary' }}>
                        <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                        <Typography variant="caption">
                            Tên ngắn gọn, rõ ràng hiển thị trên trang danh sách phòng và chi tiết biệt thự
                        </Typography>
                    </Box>
                </Box>

                {/* Field 3: Mô tả tiện nghi */}
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }} color="#1f2937">
                            Mô tả tiện nghi
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {formData.moTa.length} / 500 ký tự
                        </Typography>
                    </Box>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Nhập mô tả chi tiết về tiện ích này..."
                        value={formData.moTa}
                        onChange={handleChange('moTa')}
                        slotProps={{ htmlInput: { maxLength: 500 } }}
                        sx={{
                            bgcolor: '#f9fafb',
                            '& .MuiOutlinedInput-root': { borderRadius: 2 }
                        }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.75, color: 'text.secondary' }}>
                        <SubjectIcon sx={{ fontSize: 16 }} />
                        <Typography variant="caption">
                            Thông tin mô tả sẽ hiển thị trong mục chi tiết tiện nghi khi khách tìm hiểu
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>

            {/* Footer Actions (Đã bỏ checkbox và nút lưu nháp) */}
            <DialogActions sx={{ px: 3, pb: 2, pt: 1, display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                <Button
                    onClick={handleClose}
                    sx={{
                        color: '#374151',
                        bgcolor: '#f3f4f6',
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 2.5,
                        py: 1,
                        borderRadius: 2,
                        '&:hover': { bgcolor: '#e5e7eb' }
                    }}
                >
                    Hủy bỏ
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={dangLuu}
                    variant="contained"
                    startIcon={<CheckIcon />}
                    sx={{
                        bgcolor: '#0d9488',
                        color: '#fff',
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 2.5,
                        py: 1,
                        borderRadius: 2,
                        boxShadow: 'none',
                        '&:hover': { bgcolor: '#0f766e', boxShadow: 'none' }
                    }}
                >
                    {dangLuu ? "Đang lưu..." : "Lưu tiện ích mới"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalThemTienIch;