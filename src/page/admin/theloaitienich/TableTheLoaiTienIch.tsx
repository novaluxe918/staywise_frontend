import React, { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    TextField,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    Button,
    Typography,
    Pagination,
    PaginationItem,
    Avatar,
    Stack,
    type SelectChangeEvent,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { searchTheLoai, type TheLoaiTienIch } from '../../../types/theLoaiTienIch';
import type { PageResponse } from '../../../services/api';

interface Props {
    reloadTrigger?: number;
}
export default function TableTheLoaiTienIch({ reloadTrigger = 0 }: Props) {
    const [tuKhoaInput, setTuKhoaInput] = useState<string>('');
    const [tuKhoaDebounce, setTuKhoaDebounce] = useState<string>('');
    const [trangHienTai, setTrangHienTai] = useState<number>(0);
    const [soDongMoiTrang, setSoDongMoiTrang] = useState<number>(5);
    const [dataPage, setDataPage] = useState<PageResponse<TheLoaiTienIch> | null>(null);
    const [dangTai, setDangTai] = useState<boolean>(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            setTuKhoaDebounce(tuKhoaInput.trim());
        }, 400);
        return () => clearTimeout(timer);
    }, [tuKhoaInput]);

    const taiDuLieu = useCallback(async () => {
        setDangTai(true);

        try {
            const res = await searchTheLoai(
                tuKhoaDebounce,
                trangHienTai,
                soDongMoiTrang
            );

            setDataPage(res);

        } catch (error) {
            console.error("Lỗi nạp dữ liệu:", error);
        } finally {
            setDangTai(false);
        }
    }, [tuKhoaDebounce, trangHienTai, soDongMoiTrang]);


    useEffect(() => {
        taiDuLieu();
    }, [taiDuLieu, reloadTrigger]);
 

    const handleChangePage = (_: unknown, newPage: number) => {
        setTrangHienTai(newPage - 1);
    };

    const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
        setSoDongMoiTrang(Number(event.target.value));
        setTrangHienTai(0);
    };

   const totalElements = dataPage?.page.totalElements ?? 0;
const totalPages = dataPage?.page.totalPages ?? 0;

    const fromIndex =
        totalElements === 0 ? 0 : trangHienTai * soDongMoiTrang + 1;
    const toIndex = Math.min((trangHienTai + 1) * soDongMoiTrang, totalElements);

    return (
        <Box sx={{ p: { xs: 2, md: 3.5 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
            {/* 1. Header Toolbar */}
            <Stack
                direction="row"
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 3,
                }}
            >
                <Stack direction="row" spacing={2} sx={{ flexGrow: 1, maxWidth: { xs: '100%', md: 680 } }}>
                    <TextField
                        size="small"
                        placeholder="Tìm kiếm theo tên thể loại, mã TL..."
                        fullWidth
                        value={tuKhoaInput}
                        onChange={(e) => setTuKhoaInput(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: '12px',
                                    bgcolor: '#fff',
                                    fontSize: '0.875rem',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                                    '& fieldset': { borderColor: '#e2e8f0', transition: 'border-color 0.2s' },
                                    '&:hover fieldset': { borderColor: '#cbd5e1' },
                                    '&.Mui-focused fieldset': { borderColor: '#00695c', borderWidth: '1.5px' },
                                },
                            },
                        }}
                    />
                    <FormControl size="small" sx={{ minWidth: 170 }}>
                        <Select
                            defaultValue="all"
                            sx={{
                                borderRadius: '12px',
                                bgcolor: '#fff',
                                fontSize: '0.875rem',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                                '& fieldset': { borderColor: '#e2e8f0' },
                                '&:hover fieldset': { borderColor: '#cbd5e1' },
                                '&.Mui-focused fieldset': { borderColor: '#00695c' },
                            }}
                        >
                            <MenuItem value="all">Tất cả trạng thái</MenuItem>
                            <MenuItem value="active">Hoạt động</MenuItem>
                            <MenuItem value="inactive">Tạm dừng</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Stack direction="row" spacing={1.5}>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon sx={{ fontSize: 18 }} />}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '10px',
                            color: '#475569',
                            borderColor: '#e2e8f0',
                            bgcolor: '#fff',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            px: 2,
                            boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor: '#f1f5f9',
                                borderColor: '#cbd5e1',
                                color: '#1e293b'
                            },
                        }}
                    >
                        Làm mới
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<FileUploadOutlinedIcon sx={{ fontSize: 18 }} />}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '10px',
                            color: '#475569',
                            borderColor: '#e2e8f0',
                            bgcolor: '#fff',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            px: 2,
                            boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor: '#f1f5f9',
                                borderColor: '#cbd5e1',
                                color: '#1e293b'
                            },
                        }}
                    >
                        Xuất file
                    </Button>
                </Stack>
            </Stack>

            <Card
                elevation={0}
                sx={{
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04)',
                    bgcolor: '#fff',
                    overflow: 'hidden',
                }}
            >
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: '#f8fafc' }}>
                            <TableRow>
                                <TableCell sx={{ color: '#64748b', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0' }}>
                                    STT
                                </TableCell>
                                <TableCell sx={{ color: '#64748b', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0' }}>
                                    Hình ảnh & Tên thể loại
                                </TableCell>
                                <TableCell align="center" sx={{ color: '#64748b', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0' }}>
                                    Trạng thái
                                </TableCell>
                                <TableCell align="right" sx={{ pr: 3, color: '#64748b', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0' }}>
                                    Thao tác
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dangTai ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 6, color: '#64748b', fontSize: '0.875rem' }}>
                                        Đang tải dữ liệu...
                                    </TableCell>
                                </TableRow>
                            ) : !dataPage || dataPage.content.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 6, color: '#94a3b8', fontSize: '0.875rem' }}>
                                        Chưa có thể loại tiện ích nào.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                dataPage.content.map((item: TheLoaiTienIch, index: number) => (
                                    <TableRow
                                        key={item.id}
                                        hover
                                        sx={{
                                            transition: 'background-color 0.15s ease',
                                            '&:hover': { bgcolor: '#f8fafc' },
                                            '&:last-child td': { borderBottom: 0 }
                                        }}
                                    >
                                        <TableCell sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.875rem', borderBottom: '1px solid #f1f5f9' }}>
                                            {String(trangHienTai * soDongMoiTrang + index + 1).padStart(2, '0')}
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar
                                                    src={item.hinhAnh}
                                                    variant="rounded"
                                                    sx={{
                                                        width: 44,
                                                        height: 44,
                                                        borderRadius: '10px',
                                                        bgcolor: '#e0f2fe',
                                                        color: '#0369a1',
                                                        fontWeight: 700,
                                                        border: '1px solid #e2e8f0',
                                                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                                                    }}
                                                >
                                                    {item.tenTheLoai?.charAt(0)}
                                                </Avatar>

                                                <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>
                                                    {item.tenTheLoai}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <Chip
                                                label={
                                                    item.trangThai === "DANG_HOAT_DONG"
                                                        ? "Đang hoạt động"
                                                        : "Đã xóa"
                                                }
                                                size="small"
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: '0.75rem',
                                                    borderRadius: '8px',
                                                    px: 0.5,
                                                    bgcolor: item.trangThai === "DANG_HOAT_DONG" ? '#ecfdf5' : '#f1f5f9',
                                                    color: item.trangThai === "DANG_HOAT_DONG" ? '#047857' : '#64748b',
                                                    border: `1px solid ${item.trangThai === "DANG_HOAT_DONG" ? '#a7f3d0' : '#e2e8f0'}`,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right" sx={{ pr: 2.5, borderBottom: '1px solid #f1f5f9' }}>
                                            <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                                                <IconButton
                                                    size="small"
                                                    title="Xem chi tiết"
                                                    onClick={() => console.log("Xem chi tiết:", item.id)}
                                                    sx={{
                                                        color: '#64748b',
                                                        borderRadius: '8px',
                                                        '&:hover': { bgcolor: '#e0f2fe', color: '#0284c7' }
                                                    }}
                                                >
                                                    <VisibilityOutlinedIcon fontSize="small" />
                                                </IconButton>

                                                <IconButton
                                                    size="small"
                                                    title="Chỉnh sửa"
                                                    onClick={() => console.log("Sửa:", item.id)}
                                                    sx={{
                                                        color: '#64748b',
                                                        borderRadius: '8px',
                                                        '&:hover': { bgcolor: '#fef3c7', color: '#d97706' }
                                                    }}
                                                >
                                                    <EditOutlinedIcon fontSize="small" />
                                                </IconButton>

                                                <IconButton
                                                    size="small"
                                                    title="Xóa"
                                                    onClick={() => console.log("Xóa:", item.id)}
                                                    sx={{
                                                        color: '#64748b',
                                                        borderRadius: '8px',
                                                        '&:hover': { bgcolor: '#fee2e2', color: '#dc2626' }
                                                    }}
                                                >
                                                    <DeleteOutlineOutlinedIcon fontSize="small" />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>



                <Stack
                    direction="row"
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 3,
                        py: 2,
                        borderTop: '1px solid #f1f5f9',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    {/* Hiển thị thông tin */}
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>

                        <Typography
                            variant="body2"
                            sx={{ color: '#64748b', fontSize: '0.85rem' }}
                        >
                            Hiển thị <strong>{fromIndex} - {toIndex}</strong>
                            {' '}trong tổng số{' '}
                            <strong>{totalElements}</strong> thể loại tiện ích
                        </Typography>

                        <FormControl size="small" sx={{ minWidth: 110 }}>
                            <Select
                                value={soDongMoiTrang}
                                onChange={handleChangeRowsPerPage}
                                sx={{
                                    borderRadius: '8px',
                                    bgcolor: '#fff',
                                    fontSize: '0.8125rem',
                                    height: 32,
                                }}
                            >
                                <MenuItem value={5}>5 dòng</MenuItem>
                                <MenuItem value={10}>10 dòng</MenuItem>
                                <MenuItem value={20}>20 dòng</MenuItem>
                            </Select>
                        </FormControl>

                    </Stack>

                    <Pagination
                        count={totalPages}
                        page={trangHienTai + 1}
                        onChange={handleChangePage}
                        disabled={dangTai || totalPages === 0}
                        renderItem={(item) => (
                            <PaginationItem
                                {...item}
                                sx={{
                                    borderRadius: '8px',
                                    fontWeight: 600,

                                    '&.Mui-selected': {
                                        bgcolor: '#00695c',
                                        color: '#fff',
                                        '&:hover': {
                                            bgcolor: '#004d40',
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                </Stack>
            </Card>
        </Box>
    );
}