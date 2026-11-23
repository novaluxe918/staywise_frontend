import { Box, Button, Stack, Typography } from '@mui/material';
import { CirclePlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ModalThemPhong from './ModalThemPhong';
import { useHomeStay } from '../../../context/HomeStayContext';
import type { Phong } from '../../../types/phong';
import { toast } from '../../../utils/toast';
import { showAllPhong, xoaPhong } from '../../../services/phongService';
import TablePhong from './TablePhong';
import Swal from 'sweetalert2';

function QuanLyPhong() {
    const [open, setOpen] = useState(false);
    const {
        homeStayDangChon
    } = useHomeStay();
    const [danhSachPhong, setDanhSachPhong] = useState<Phong[]>([]);
    const [updatePhong, setUpdatePhong] = useState<Phong | null>(null);


    const [loading, setLoading] = useState(false);


    const [trang, setTrang] = useState(0);
    const [kichThuoc, setKichThuoc] = useState(5);
    const [tongSoBanGhi, setTongSoBanGhi] = useState(0);


    const layDanhSachPhong = async () => {
        try {
            setLoading(true);

            const response = await showAllPhong(trang, kichThuoc);

            setDanhSachPhong(response.content);
            setTongSoBanGhi(response.page.totalElements);

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


    const handleChangePage = (trangMoi: number) => {
        setTrang(trangMoi);
    };


    const handleChangeRowsPerPage = (kichThuocMoi: number) => {
        setKichThuoc(kichThuocMoi);
        setTrang(0);
    };




    const handleEdit = (phong: Phong) => {
        setUpdatePhong(phong);
        setOpen(true);
    };


    const handleDelete = async (phong: Phong) => {
        const result = await Swal.fire({
            title: "Xác nhận xóa phòng?",
            text: `Bạn có chắc chắn muốn xóa ${phong.tenPhong} không?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa phòng",
            cancelButtonText: "Hủy",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#64748b",
        });

        if (!result.isConfirmed) return;

        try {
            setLoading(true);

            await xoaPhong(phong.id);

            toast.success("Xóa phòng thành công!");

            if (danhSachPhong.length === 1 && trang > 0) {
                setTrang(prev => prev - 1);
            } else {
                await layDanhSachPhong();
            }

        } catch (error: any) {
            console.error("Lỗi xóa phòng:", error);
            toast.error(
                error.response?.data || "Xóa phòng thất bại!"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClickOpen = () => {
        setUpdatePhong(null)
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

            {typeof homeStayDangChon === "number" && (
                <>
                    <TablePhong
                        danhSachPhong={danhSachPhong}
                        loading={loading}
                        trang={trang}
                        kichThuoc={kichThuoc}
                        tongSoBanGhi={tongSoBanGhi}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    <ModalThemPhong
                        open={open}
                        onClose={() => setOpen(false)}
                        maHomeStay={homeStayDangChon}
                        duLieuUpdate={updatePhong}
                        onSuccess={layDanhSachPhong}
                    />
                </>
            )}


        </div>
    );
}

export default QuanLyPhong;