import React, { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    IconButton,
    Chip,
    Tooltip,
    Typography,
    InputAdornment,
    CircularProgress,
    Pagination,
    type SelectChangeEvent,
} from '@mui/material';
import {
    Search as SearchIcon,
    Clear as ClearIcon,
    Refresh as RefreshIcon,
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    DeleteOutlined as DeleteOutlineIcon,
    FilterListOff as FilterListOffIcon,
    Spa as SpaIcon,
} from '@mui/icons-material';
import type { TienIch } from '../../../types/tienIch';
import { getAllTienIch } from '../../../services/tienIchService';

function TableTienIch() {
    const [danhSachTienIch, setDsTienIch] = useState<TienIch[]>([]);
    const [tongSoLuong, setTongSoLuong] = useState<number>(0);
    const [tongSoTrang, setTongSoTrang] = useState<number>(0);

    const [dangTai, setDangTai] = useState<boolean>(false);

    const [tuKhoa, setTuKhoa] = useState<string>('');
    const [tuKhoaDebounce, setTuKhoaDebounce] = useState<string>('');

    const [trang, setTrang] = useState<number>(0);
    const [soDongMoiTrang, setSoDongMoiTrang] = useState<number>(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTuKhoaDebounce(tuKhoa.trim());
            setTrang(0);
        }, 400);

        return () => clearTimeout(timer);
    }, [tuKhoa]);

    const taiDuLieu = useCallback(async () => {
        setDangTai(true);

        try {
            const data = await getAllTienIch(
                tuKhoaDebounce,
                trang,
                soDongMoiTrang
            );

            console.log("API tiện ích:", data);

            setDsTienIch(data.content ?? []);
            setTongSoLuong(data.page.totalElements ?? 0);
            setTongSoTrang(data.page.totalPages ?? 0);

        } catch (error) {
            console.error('Lỗi khi tải danh sách tiện ích:', error);

            setDsTienIch([]);
            setTongSoLuong(0);
            setTongSoTrang(0);

        } finally {
            setDangTai(false);
        }
    }, [tuKhoaDebounce, trang, soDongMoiTrang]);

    useEffect(() => {
        taiDuLieu();
    }, [taiDuLieu]);


    const handleChangePage = (
        _event: React.ChangeEvent<unknown>,
        newPage: number
    ) => {
        setTrang(newPage - 1);
    };

    // Thay đổi số dòng mỗi trang
    const handleChangeRowsPerPage = (
        event: SelectChangeEvent<number>
    ) => {
        setSoDongMoiTrang(Number(event.target.value));
        setTrang(0);
    };


    const handleLamMoi = () => {
        setTuKhoa('');
        setTuKhoaDebounce('');
        setTrang(0);
    };
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* 1. Thanh công cụ tìm kiếm và Bộ lọc */}
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                {/* Input Tìm kiếm */}
                <TextField
                    size="small"
                    placeholder="Tìm kiếm tên tiện ích, từ khóa mô tả..."
                    value={tuKhoa}
                    onChange={(e) => {
                        setTuKhoa(e.target.value)
                    }}
                    sx={{ flex: { xs: '1 1 100%', md: 2 } }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                </InputAdornment>
                            ),
                            endAdornment: tuKhoa ? (
                                <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => setTuKhoa('')}>
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ) : null,
                        },
                    }}
                />

                {/* Dropdown Lọc Thể loại */}
                <FormControl size="small" sx={{ minWidth: 180, flex: { xs: '1 1 100%', sm: 1 } }}>
                    <InputLabel id="category-filter-label">Thể loại</InputLabel>
                    <Select
                        labelId="category-filter-label"
                        id="category-filter"
                        // value={selectedCategory}
                        label="Thể loại"
                    // onChange={(e) => {
                    //     setSelectedCategory(e.target.value);
                    //     setPage(0);
                    // }}
                    >
                        <option style={{ display: 'none' }} />
                        <MenuItem value="ALL">Tất cả thể loại</MenuItem>
                        <MenuItem value="PHONG_TAM">Phòng tắm & Thư giãn</MenuItem>
                        <MenuItem value="BEP">Bếp & Ăn uống</MenuItem>
                        <MenuItem value="GIAI_TRI">Giải trí & Công nghệ</MenuItem>
                        <MenuItem value="NGOAI_TROI">Ngoài trời & Sân vườn</MenuItem>
                    </Select>
                </FormControl>

                {/* Dropdown Lọc Trạng thái */}
                <FormControl size="small" sx={{ minWidth: 160, flex: { xs: '1 1 100%', sm: 1 } }}>
                    <InputLabel id="status-filter-label">Trạng thái</InputLabel>
                    <Select
                        labelId="status-filter-label"
                        id="status-filter"

                        label="Trạng thái"
                    // onChange={(e) => {
                    //     setSelectedStatus(e.target.value);
                    //     setPage(0);
                    // }}
                    >
                        <MenuItem value="ALL">Mọi trạng thái</MenuItem>
                        <MenuItem value="active">Đang áp dụng</MenuItem>
                        <MenuItem value="hidden">Tạm ẩn</MenuItem>
                    </Select>
                </FormControl>

                {/* Nút Reset Bộ lọc */}
                <Tooltip title="Làm mới bộ lọc">
                    <IconButton
                        onClick={handleLamMoi}
                        sx={{
                            border: '1px solid',
                            borderColor: 'grey.300',
                            borderRadius: 2,
                            p: 1,
                        }}
                    >
                        <RefreshIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Paper>

            {/* 2. Bảng Dữ Liệu MUI (Không có Checkbox, Không Xuất Excel) */}
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    overflow: 'hidden',
                }}
            >
                <Table sx={{ minWidth: 800 }}>
                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', py: 2 }}>
                                STT
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', py: 2 }}>
                                Tên tiện ích
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', py: 2 }}>
                                Thể loại
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', py: 2 }}>
                                Mô tả tiện nghi
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', py: 2 }}>
                                Ngày tạo
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', py: 2 }}>
                                Trạng thái
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', py: 2, width: 120 }}>
                                Thao tác
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {dangTai ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                                    <CircularProgress size={32} />
                                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                                        Đang tải dữ liệu từ máy chủ...
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : danhSachTienIch.length > 0 ? (
                            danhSachTienIch.map((item, index) => {
                                return (
                                    <TableRow
                                        key={item.id}
                                        hover
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {/* 1. STT: Đếm lại từ 1 theo từng trang */}
                                        <TableCell sx={{ fontWeight: 600, color: 'text.secondary', width: 60 }}>
                                            {trang * soDongMoiTrang + index + 1}
                                        </TableCell>

                                        {/* 2. Tên tiện ích */}
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {item.tenTienIch}
                                            </Typography>
                                        </TableCell>

                                        {/* 3. Thể loại */}
                                        <TableCell>
                                            <Chip
                                                label={item.theLoaiTienIch?.tenTheLoai || 'Chung'}
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    fontWeight: 500,
                                                    fontSize: '0.75rem',
                                                    borderColor: 'teal.200',
                                                    bgcolor: 'teal.50',
                                                    color: 'teal.800',
                                                }}
                                            />
                                        </TableCell>

                                        {/* 4. Mô tả */}
                                        <TableCell sx={{ maxWidth: 280 }}>
                                            <Typography
                                                variant="body2"
                                                title={item.moTa}
                                                sx={{
                                                    color: 'text.secondary',
                                                    fontSize: '0.8125rem',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {item.moTa || 'Chưa có mô tả'}
                                            </Typography>
                                        </TableCell>

                                        {/* 5. Ngày tạo */}
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                                                {item.ngayTao ? new Date(item.ngayTao).toLocaleDateString('vi-VN') : '-'}
                                            </Typography>
                                        </TableCell>



                                        <TableCell>
                                            <Chip
                                                label={item.trangThai === 'DANG_HOAT_DONG' ? 'Đang áp dụng' : 'Tạm ẩn'}
                                                size="small"
                                                color={item.trangThai === 'DANG_HOAT_DONG' ? 'success' : 'default'}
                                                variant={item.trangThai === 'DANG_HOAT_DONG' ? 'filled' : 'outlined'}
                                                sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                                            />
                                        </TableCell>


                                        {/* 7. Thao tác */}
                                        <TableCell align="center">
                                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                                                <Tooltip title="Xem chi tiết">
                                                    <IconButton size="small" color="primary">
                                                        <VisibilityIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Chỉnh sửa">
                                                    <IconButton size="small" color="warning">
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Xóa">
                                                    <IconButton size="small" color="error">
                                                        <DeleteOutlineIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                        <FilterListOffIcon sx={{ fontSize: 44, color: 'text.disabled' }} />
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                            Không có tiện ích nào
                                        </Typography>
                                        <Typography variant="caption" color="text.disabled">
                                            Thử nhập từ khóa khác để tìm kiếm
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 2,
                        py: 1,
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    {/* Thông tin hiển thị */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            Đang hiển thị{' '}
                            <strong>
                                {tongSoLuong === 0 ? 0 : trang * soDongMoiTrang + 1}
                                {' - '}
                                {Math.min((trang + 1) * soDongMoiTrang, tongSoLuong)}
                            </strong>
                            {' '}trên tổng số{' '}
                            <strong>{tongSoLuong}</strong> tiện ích
                        </Typography>
                        <FormControl size="small" sx={{ minWidth: 110 }}>
                            <Select
                                value={soDongMoiTrang}
                                onChange={handleChangeRowsPerPage}
                            >
                                <MenuItem value={5}>5 dòng</MenuItem>
                                <MenuItem value={10}>10 dòng</MenuItem>
                                <MenuItem value={20}>20 dòng</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Các nút số trang */}
                    <Pagination
                        count={Math.max(1, Math.ceil(tongSoLuong / soDongMoiTrang))}
                        page={trang + 1}
                        onChange={handleChangePage}
                        disabled={dangTai}
                        color="primary"
                        shape="rounded"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            </TableContainer>
        </Box>
    );
}

export default TableTienIch;