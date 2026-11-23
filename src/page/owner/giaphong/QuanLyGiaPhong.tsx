import { Box, Button, Stack, Typography } from '@mui/material';
import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react';
import ModalThemGiaPhong from './ModalThemGiaPhong';
import type { GiaPhongRequest } from '../../../types/giaPhong';

function QuanLyGiaPhong() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }
    const danhSachPhong = [
        { id: 1, tenPhong: "Phòng Family 01" },
        { id: 2, tenPhong: "Phòng Deluxe 02" },
        { id: 3, tenPhong: "Phòng đơn 03" },
        { id: 4, tenPhong: "Phòng VIP 04" },
        { id: 5, tenPhong: "Phòng Studio 05" },
    ];



    const handleClose = () => {
        setOpen(false);
    };

    // Hàm submit tạm thời để xem giao diện
    const handleSubmit = async (data: GiaPhongRequest) => {
        console.log("Dữ liệu giá phòng:", data);

        alert("Dữ liệu đã được ghi nhận!");
    };
    return (
        <div className="p-6 bg-slate-50/50 min-h-screen">
            {/* Thanh tiêu đề và nút Thêm mới */}
            <Stack
                direction="row"
                sx={{ mb: 3, justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        Quản lý bảng giá
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<CirclePlus />}
                    onClick={handleClickOpen}
                    sx={{
                        textTransform: 'none',
                        bgcolor: '#00695c',
                        fontWeight: 600,
                        borderRadius: '10px',
                        px: 2.5,
                        py: 1,
                        boxShadow: '0 4px 12px rgba(0, 105, 92, 0.25)',
                        '&:hover': {
                            bgcolor: '#004d40',
                        },
                    }}
                >
                    Thêm mới
                </Button>
            </Stack>

            <ModalThemGiaPhong open={open} onClose={handleClose} danhSachPhong={danhSachPhong}
                onSubmit={handleSubmit} />

        </div>
    );
}

export default QuanLyGiaPhong;