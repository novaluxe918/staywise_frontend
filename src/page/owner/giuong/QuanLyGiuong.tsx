import { Box, Button, Stack, Typography } from '@mui/material';
import { CirclePlus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import ModalThemLoaiGiuong from './ModalThemLoaiGiuong';
import type { PageResponse } from '../../../services/api';
import type { LoaiGiuong } from '../../../types/giuong';
import { showAllGiuong, xoaLoaiGiuong } from '../../../services/giuongService';
import TableGiuong from './TableGiuong';
import { toast } from '../../../utils/toast';
import Swal from 'sweetalert2';

function QuanLyGiuong() {
    const [open, setOpen] = useState(false);
    const [dataPage, setDataPage] =
        useState<PageResponse<LoaiGiuong> | null>(null);
    const [duLieuUpdate, setDuLieuUpdate] =
        useState<LoaiGiuong | null>(null);

    const [trang, setTrang] = useState(0);
    const [kichThuoc, setKichThuoc] = useState(5);

    const fetchData = useCallback(async () => {
        try {
            const data = await showAllGiuong("", trang, kichThuoc);
            setDataPage(data);
        } catch (error) {
            console.error(error);
        }
    }, [trang, kichThuoc]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleClickOpen = () => {
        setDuLieuUpdate(null);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleUpdate = (item: LoaiGiuong) => {
        setDuLieuUpdate(item);
        setOpen(true);
    }

    const handleChangePage = (trangMoi: number) => {
        setTrang(trangMoi);
    };

    const handleChangeRowsPerPage = (kichThuocMoi: number) => {
        setKichThuoc(kichThuocMoi);
        setTrang(0);
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "Xác nhận xóa?",
            text: "Bạn có chắc chắn muốn xóa loại giường này không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#64748b",
        });

        if (!result.isConfirmed) return;

        try {
            await xoaLoaiGiuong(id);

            toast.success("Xóa loại giường thành công!");
            if (dataPage?.content.length === 1 && trang > 0) {
                setTrang(prev => prev - 1);
            } else {
                await fetchData();
            }

        } catch (error: any) {
            console.error(error);

            toast.error(
                error.response?.data?.message || "Xóa loại giường thất bại!"
            );
        }
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
                        Quản lý giường Staywise
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

            <ModalThemLoaiGiuong open={open} onClose={handleClose} duLieuUpdate={duLieuUpdate}
                onSuccess={fetchData} />

            <TableGiuong
                danhSach={dataPage?.content ?? []}
                trang={dataPage?.page.number ?? 0}
                kichThuoc={dataPage?.page.size ?? kichThuoc}
                tongSoBanGhi={dataPage?.page.totalElements ?? 0}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />

        </div>
    );
}

export default QuanLyGiuong;