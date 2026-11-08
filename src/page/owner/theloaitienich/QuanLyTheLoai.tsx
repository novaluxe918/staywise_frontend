import React, { useEffect, useState } from 'react';
import TableTheLoaiTienIch from './TableTheLoaiTienIch';
import ModalThemTheLoai from './ModalThemTheLoai';
import Button from '@mui/material/Button';
import { Box, Stack, Typography } from '@mui/material';
import { CirclePlus } from 'lucide-react';
import type { TheLoaiTienIch } from '../../../types/theLoaiTienIch';

function QuanLyTheLoai() {
    const [open, setOpen] = React.useState(false);
    const [reloadTrigger, setReloadTrigger] = useState(0);
    const [updateTheLoai, setUpdateTheLoai] = useState<TheLoaiTienIch | null>(null);
    
    const handleClickOpen = () => {
        setUpdateTheLoai(null);
        setOpen(true);
    };

    const handleUpdate = (item: TheLoaiTienIch) => {
         setUpdateTheLoai(item);
         setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSuccsess = () => {
        handleClose();
        setReloadTrigger((prev) => prev + 1);
    }
    
    return (
        <div className="p-6 bg-slate-50/50 min-h-screen">
            {/* Thanh tiêu đề và nút Thêm mới */}
            <Stack
                direction="row"
                sx={{ mb: 3, justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        Quản lý thể loại tiện ích
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                        Danh sách và cấu hình các nhóm tiện ích trong hệ thống
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

            {/* Hiển thị bảng danh sách */}
            <TableTheLoaiTienIch reloadTrigger={reloadTrigger} handleUpdate={handleUpdate} />

            {/* Dialog / Modal Thêm mới */}
            <ModalThemTheLoai open={open} handleClose={handleClose} onSuccess={handleSuccsess} duLieuUpdate={updateTheLoai} />
        </div>
    );
}

export default QuanLyTheLoai;