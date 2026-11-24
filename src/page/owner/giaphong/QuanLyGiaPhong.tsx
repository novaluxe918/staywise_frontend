import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { CirclePlus, SearchIcon, X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import ModalThemGiaPhong from './ModalThemGiaPhong';
import type { GiaPhong, GiaPhongRequest } from '../../../types/giaPhong';
import { usePhong } from '../../../context/PhongContext';
import { deleteGiaPhong, saveGiaPhong, showAllGiaPhong } from '../../../services/giaPhongservice';
import { toast } from '../../../utils/toast';
import type { PageResponse } from '../../../services/api';
import TableGiaPhong from './TableGiaPhong';
import Swal from 'sweetalert2';

function QuanLyGiaPhong() {
    const [open, setOpen] = useState(false);
    const [dataPage, setDataPage] = useState<PageResponse<GiaPhong> | null>(null);
    const [updateGiaPhong, setUpdateGiaPhong] = useState<GiaPhong | null>(null)
    const [tuKhoa, setTuKhoa] = useState('');
    const [trang, setTrang] = useState(0);
    const [kichThuoc, setKichThuoc] = useState(5);
    const [loading, setLoading] = useState(false);
    const { danhSachPhong } = usePhong();
    const [reloadTrigger, setReloadTrigger] = useState(0);

    const handleClickOpen = () => {
        setUpdateGiaPhong(null);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const handleEdit = (item: GiaPhong) => {
        setUpdateGiaPhong(item);
        setOpen(true);
    };

    const fetchDanhSachGiaPhong = useCallback(async () => {
        try {
            setLoading(true);
            const response = await showAllGiaPhong(tuKhoa, trang, kichThuoc);
            setDataPage(response);
        } catch (error) {
            console.error('Lỗi lấy danh sách giá phòng:', error);
            toast.error('Không thể tải danh sách giá phòng');
        } finally {
            setLoading(false);
        }
    }, [tuKhoa, trang, kichThuoc]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDanhSachGiaPhong();
        }, 400);

        return () => clearTimeout(timer);
    }, [fetchDanhSachGiaPhong]);

    const handleSubmit = async (data: GiaPhongRequest) => {
        try {
            const response = await saveGiaPhong(data);
            toast.success(response);
            handleClose();
            fetchDanhSachGiaPhong(); // Reload lại bảng ngay sau khi thêm
        } catch (error) {
            console.error('Lỗi thêm giá phòng:', error);
            toast.error('Thêm giá phòng thất bại');
            throw error;
        }
    };

    const handleSearch = (value: string) => {
        setTuKhoa(value);
        setTrang(0);
    };

    const handleChangePage = (trangMoi: number) => {
        setTrang(trangMoi);
    };

    const handleChangeRowsPerPage = (kichThuocMoi: number) => {
        setKichThuoc(kichThuocMoi);
        setTrang(0);
    };

    const handleDelete = async (item: GiaPhong) => {
    const result = await Swal.fire({
        title: "Xóa giá phòng?",
        text: `Bạn có chắc muốn xóa giá phòng của "${item.tenPhong}" không?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#64748b",
    });

    if (!result.isConfirmed) return;

    try {
        const response = await deleteGiaPhong(item.id);

        toast.success(response);
        setReloadTrigger(prev => prev + 1);
    } catch (error) {
        console.error("Lỗi xóa giá phòng:", error);
        toast.error("Xóa giá phòng thất bại");
    }
};

    const tongSoBanGhi = dataPage?.page.totalElements ?? 0;

    return (
        <div className="p-6 md:p-8 bg-slate-50/70 min-h-screen">
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2}
                sx={{
                    mb: 3.5,
                    justifyContent: 'space-between',
                    alignItems: { xs: 'stretch', md: 'center' },
                }}
            >
                <Box>
                    <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                color: '#0f172a',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            Quản lý bảng giá
                        </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: '#64748b', mt: 0.3 }}>
                        Quản lý mức giá áp dụng theo từng loại phòng
                    </Typography>
                </Box>

                <TextField
                    fullWidth
                    size="small"
                    placeholder="Tìm kiếm theo tên phòng..."
                    value={tuKhoa}
                    onChange={(e) => handleSearch(e.target.value)}
                    sx={{
                        maxWidth: { xs: '100%', md: 380 },
                        '& .MuiOutlinedInput-root': {
                            bgcolor: '#ffffff',
                            borderRadius: '12px',
                            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
                            transition: 'all 0.2s ease',
                            '& fieldset': {
                                borderColor: '#e2e8f0',
                            },
                            '&:hover fieldset': {
                                borderColor: '#cbd5e1',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#00695c',
                                borderWidth: '1.5px',
                            },
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon size={18} className="text-slate-400" />
                                </InputAdornment>
                            ),
                            endAdornment: tuKhoa && (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleSearch('')}
                                        edge="end"
                                    >
                                        <X size={16} className="text-slate-400" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Button
                    variant="contained"
                    startIcon={<CirclePlus size={18} />}
                    onClick={handleClickOpen}
                    sx={{
                        textTransform: 'none',
                        bgcolor: '#00695c',
                        fontWeight: 600,
                        borderRadius: '12px',
                        px: 2.75,
                        py: 1.05,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 14px rgba(0, 105, 92, 0.25)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            bgcolor: '#004d40',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 6px 18px rgba(0, 105, 92, 0.35)',
                        },
                    }}
                >
                    Thêm mới
                </Button>
            </Stack>

            <ModalThemGiaPhong
                open={open}
                onClose={handleClose}
                danhSachPhong={danhSachPhong}
                onSubmit={handleSubmit}
                  duLieuUpdate={updateGiaPhong}
            />

            <Paper
                elevation={0}
                sx={{
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    bgcolor: '#ffffff',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04)',
                }}
            >
                <TableGiaPhong
                    danhSachGiaPhong={dataPage?.content ?? []}
                    loading={loading}
                    trang={trang}
                    kichThuoc={kichThuoc}
                    tongSoBanGhi={tongSoBanGhi}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Paper>
        </div>
    );
}

export default QuanLyGiaPhong;