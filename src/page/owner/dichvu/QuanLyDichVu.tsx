import { Box, Button, Stack, Typography } from '@mui/material';
import { CirclePlus } from 'lucide-react';
import React from 'react';
import ModalThemDichVu from './ModalThemDichVu';
import TableDichVu from './TableDichVu';

function QuanLyDichVu() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                        Quản lý Dịch Vụ
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

            <TableDichVu />

            <ModalThemDichVu open={open} handleClose={handleClose} />

        </div>
    );
}

export default QuanLyDichVu;