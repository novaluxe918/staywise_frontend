import { Box, Button, Stack, Typography } from '@mui/material';
import { CirclePlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ModalThemPhong from './ModalThemPhong';
import { useHomeStay } from '../../../context/HomeStayContext';
import type { Phong } from '../../../types/phong';
import { toast } from '../../../utils/toast';
import { showAllPhong } from '../../../services/phongService';
import TablePhong from './TablePhong';

function QuanLyPhong() {
    const [open, setOpen] = useState(false);
    const {
        homeStayDangChon
    } = useHomeStay();
    const [danhSachPhong, setDanhSachPhong] = useState<Phong[]>([]);

    // Trạng thái loading
    const [loading, setLoading] = useState(false);

    // Phân trang
    const [trang, setTrang] = useState(0);
    const [kichThuoc, setKichThuoc] = useState(5);
    const [tongSoBanGhi, setTongSoBanGhi] = useState(0);

    // Lấy danh sách phòng
    const layDanhSachPhong = async () => {
        try {
            setLoading(true);

            const response = await showAllPhong(trang, kichThuoc);

            setDanhSachPhong(response.content);
            setTongSoBanGhi(response.content.length);

        } catch (error) {
            console.error("Lỗi lấy danh sách phòng:", error);
            toast.error("Không thể tải danh sách phòng!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        layDanhSachPhong();
    }, [trang, kichThuoc]);

    // Chuyển trang
    const handleChangePage = (trangMoi: number) => {
        setTrang(trangMoi);
    };

    // Thay đổi số dòng
    const handleChangeRowsPerPage = (kichThuocMoi: number) => {
        setKichThuoc(kichThuocMoi);
        setTrang(0);
    };

    // Xem chi tiết
    const handleView = (phong: Phong) => {
        console.log("Xem phòng:", phong);
    };

    // Chỉnh sửa
    const handleEdit = (phong: Phong) => {
        console.log("Sửa phòng:", phong);
    };

    // Xóa
    const handleDelete = (phong: Phong) => {
        console.log("Xóa phòng:", phong);
    };


    const handleClickOpen = () => {
        setOpen(true);
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
                        Quản lý phòng
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

            <TablePhong
                danhSachPhong={danhSachPhong}
                loading={loading}
                trang={trang}
                kichThuoc={kichThuoc}
                tongSoBanGhi={tongSoBanGhi}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {typeof homeStayDangChon === "number" && (
                <ModalThemPhong
                    open={open}
                    onClose={() => setOpen(false)}
                    maHomeStay={homeStayDangChon}
                />
            )}


        </div>
    );
}

export default QuanLyPhong;