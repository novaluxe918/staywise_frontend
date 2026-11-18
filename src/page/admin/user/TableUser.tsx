import React, { useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Typography,
    Chip,
    IconButton,
    Tooltip,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    Pagination,
    Stack,
    CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import type { NguoiDungQuanLy } from '../../../types/nguoiDung';

interface Props {
    nguoiDungs: NguoiDungQuanLy[];
    loading: boolean;

    tuKhoa: string;
    vaiTro: string;
    trangThai: string;

    page: number;
    rowsPerPage: number;
    totalElements: number;

    onSearchChange: (value: string) => void;
    onVaiTroChange: (value: string) => void;
    onTrangThaiChange: (value: string) => void;
    onPageChange: (newPage: number) => void;
    onRowsPerPageChange: (value: number) => void;
}

// Lấy chữ cái đầu làm Avatar fallback
const getInitials = (name: string) => {
    if (!name?.trim()) return '?';

    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
        return parts[0][0].toUpperCase();
    }

    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();
};

// Badge vai trò
const getRoleBadge = (role: string) => {
    switch (role) {
        case 'ADMIN':
            return {
                label: 'Quản trị viên',
                bg: '#F3E8FF',
                color: '#7E22CE'
            };

        case 'OWNER':
            return {
                label: 'Chủ Homestay',
                bg: '#CCFBF1',
                color: '#0F766E'
            };

        default:
            return {
                label: 'Khách hàng',
                bg: '#F1F5F9',
                color: '#475569'
            };
    }
};

// Badge trạng thái
const getStatusBadge = (status: string) => {
    switch (status) {
        case 'DANG_HOAT_DONG':
            return {
                label: 'Đang hoạt động',
                color: 'success' as const
            };

        case 'DA_KHOA':
            return {
                label: 'Đã khóa',
                color: 'error' as const
            };

        default:
            return {
                label: status || 'Chưa xác định',
                color: 'default' as const
            };
    }
};

// Format ngày
const formatDate = (date: string | null) => {
    if (!date) return '---';

    return new Date(date).toLocaleDateString('vi-VN');
};

function TableUser({
    nguoiDungs,
    loading,
    tuKhoa,
    vaiTro,
    trangThai,
    page,
    rowsPerPage,
    totalElements,
    onSearchChange,
    onVaiTroChange,
    onTrangThaiChange,
    onPageChange,
    onRowsPerPageChange
}: Props) {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 3,
                border: '1px solid #E2E8F0',
                overflow: 'hidden',
                bgcolor: '#FFFFFF',
            }}
        >
            {/* Thanh công cụ tìm kiếm phía trên bảng */}
            <Box
                sx={{
                    p: 2.5,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #F1F5F9',
                }}
            >
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', fontSize: '1.05rem' }}>
                        Danh sách người dùng
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.825rem' }}>
                        Quản lý tài khoản khách hàng, chủ homestay và phân quyền hệ thống
                    </Typography>
                </Box>

                <TextField
                    size="small"
                    placeholder="Tìm theo họ tên, email, SĐT..."
                    value={tuKhoa}
                    onChange={(e) => onSearchChange(e.target.value)}
                    sx={{
                        width: { xs: '100%', sm: 320 },
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            bgcolor: '#F8FAFC',
                            fontSize: '0.875rem',
                            '& fieldset': { borderColor: '#E2E8F0' },
                            '&:hover fieldset': { borderColor: '#CBD5E1' },
                            '&.Mui-focused fieldset': { borderColor: '#0D9488' },
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#94A3B8', fontSize: 20 }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Box>

            {/* Bảng dữ liệu */}
            <TableContainer>
                <Table sx={{ minWidth: 900 }}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#F8FAFC' }}>
                            <TableCell
                                align="center"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    color: '#475569',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.04em',
                                    width: 70,
                                }}
                            >
                                STT
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    color: '#475569',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.04em',
                                }}
                            >
                                Ảnh đại diện & Họ tên
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    color: '#475569',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.04em',
                                }}
                            >
                                Email
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    color: '#475569',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.04em',
                                }}
                            >
                                Số điện thoại
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    color: '#475569',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.04em',
                                }}
                            >
                                Ngày tạo
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    color: '#475569',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.04em',
                                }}
                            >
                                Vai trò
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    color: '#475569',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.04em',
                                    pr: 3,
                                }}
                            >
                                Thao tác
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (

                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                                    <CircularProgress size={28} />
                                </TableCell>
                            </TableRow>

                        ) : (

                            <>
                                {nguoiDungs.map((user, index) => {

                                    const roleBadge = getRoleBadge(user.vaiTro);

                                    // Kiểm tra trạng thái tài khoản
                                    const isLocked = user.trangThaiUser === 'DA_KHOA';

                                    return (
                                        <TableRow
                                            key={user.id}
                                            hover
                                            sx={{
                                                bgcolor: isLocked ? '#FFF5F5' : 'inherit',
                                                '&:hover': {
                                                    bgcolor: isLocked
                                                        ? '#FEE2E2 !important'
                                                        : '#F8FAFC !important',
                                                },
                                                '& td': {
                                                    borderBottom: '1px solid #F1F5F9',
                                                    py: 1.75,
                                                },
                                            }}
                                        >
                                            {/* STT */}
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#64748B',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                {page * rowsPerPage + index + 1}
                                            </TableCell>

                                            {/* Ảnh đại diện + Họ tên */}
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        gap: 1.5
                                                    }}
                                                >
                                                    <Avatar
                                                        src={user.anhDaiDien || undefined}
                                                        alt={user.hoTen}
                                                        sx={{
                                                            width: 40,
                                                            height: 40,
                                                            bgcolor: '#E2E8F0',
                                                            color: '#475569',
                                                            fontSize: '0.85rem',
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        {getInitials(user.hoTen)}
                                                    </Avatar>

                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                fontWeight: 600,
                                                                color: '#0F172A',
                                                                fontSize: '0.9rem'
                                                            }}
                                                        >
                                                            {user.hoTen}
                                                        </Typography>

                                                        {isLocked && (
                                                            <Typography
                                                                sx={{
                                                                    fontSize: '0.75rem',
                                                                    color: '#DC2626',
                                                                    fontWeight: 500
                                                                }}
                                                            >
                                                                Tài khoản đang bị khóa
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </TableCell>

                                            {/* Email */}
                                            <TableCell
                                                sx={{
                                                    color: '#475569',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                {user.email}
                                            </TableCell>

                                            {/* Số điện thoại */}
                                            <TableCell
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#1E293B',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                {user.soDienThoai || '---'}
                                            </TableCell>

                                            {/* Ngày tạo */}
                                            <TableCell
                                                sx={{
                                                    color: '#64748B',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                {formatDate(user.ngayTao)}
                                            </TableCell>

                                            {/* Vai trò */}
                                            <TableCell>
                                                <Chip
                                                    label={
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 0.75
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    width: 6,
                                                                    height: 6,
                                                                    borderRadius: '50%',
                                                                    bgcolor: roleBadge.color,
                                                                }}
                                                            />
                                                            <span>{roleBadge.label}</span>
                                                        </Box>
                                                    }
                                                    size="small"
                                                    sx={{
                                                        bgcolor: roleBadge.bg,
                                                        color: roleBadge.color,
                                                        fontWeight: 600,
                                                        fontSize: '0.78rem',
                                                        borderRadius: '8px',
                                                        height: 26,
                                                    }}
                                                />
                                            </TableCell>

                                            {/* Thao tác */}
                                            <TableCell
                                                align="right"
                                                sx={{ pr: 2.5 }}
                                            >
                                                <Stack
                                                    direction="row"
                                                    spacing={0.5}
                                                    sx={{ justifyContent: 'flex-end' }}
                                                >
                                                    <Tooltip title="Xem chi tiết">
                                                        <IconButton
                                                            size="small"
                                                            sx={{
                                                                color: '#475569',
                                                                '&:hover': {
                                                                    bgcolor: '#F1F5F9',
                                                                    color: '#0F172A'
                                                                },
                                                            }}
                                                        >
                                                            <VisibilityOutlinedIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip
                                                        title={
                                                            isLocked
                                                                ? 'Mở khóa tài khoản'
                                                                : 'Khóa tài khoản'
                                                        }
                                                    >
                                                        <IconButton
                                                            size="small"
                                                            sx={{
                                                                color: isLocked
                                                                    ? '#DC2626'
                                                                    : '#0D9488',
                                                                '&:hover': {
                                                                    bgcolor: isLocked
                                                                        ? '#FEE2E2'
                                                                        : '#CCFBF1',
                                                                },
                                                            }}
                                                        >
                                                            {isLocked ? (
                                                                <LockOutlinedIcon fontSize="small" />
                                                            ) : (
                                                                <LockOpenOutlinedIcon fontSize="small" />
                                                            )}
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}

                                {/* Không có dữ liệu */}
                                {nguoiDungs.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            align="center"
                                            sx={{
                                                py: 5,
                                                color: '#94A3B8'
                                            }}
                                        >
                                            Không tìm thấy người dùng phù hợp
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>

                        )}
                    </TableBody>

                </Table>
            </TableContainer>


            {/* Thanh phân trang */}
            <Box
                sx={{
                    px: 2.5,
                    py: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #F1F5F9',
                    bgcolor: '#FFFFFF',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1.5
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#64748B',
                            fontSize: '0.85rem'
                        }}
                    >
                        Số hàng mỗi trang:
                    </Typography>

                    <Select
                        size="small"
                        value={rowsPerPage}
                        onChange={(e) =>
                            onRowsPerPageChange(Number(e.target.value))
                        }
                        sx={{
                            height: 32,
                            fontSize: '0.85rem',
                            borderRadius: 1.5,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#E2E8F0'
                            },
                        }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>

                    <Typography
                        variant="body2"
                        sx={{ color: '#94A3B8', px: 0.5 }}
                    >
                        |
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: '#64748B',
                            fontSize: '0.85rem'
                        }}
                    >
                        {totalElements === 0
                            ? 'Đang xem 0 bản ghi'
                            : `Đang xem ${page * rowsPerPage + 1} - ${Math.min(
                                (page + 1) * rowsPerPage,
                                totalElements
                            )} của ${totalElements} bản ghi`
                        }
                    </Typography>
                </Box>

                <Pagination
                    count={Math.max(1, Math.ceil(totalElements / rowsPerPage))}
                    page={page + 1}
                    onChange={(_, value) => onPageChange(value - 1)}
                    shape="rounded"
                    showFirstButton
                    showLastButton
                    disabled={loading || totalElements === 0}
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: '#475569',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                        },
                        '& .Mui-selected': {
                            bgcolor: '#0D9488 !important',
                            color: '#FFFFFF !important',
                        },
                    }}
                />
            </Box>

        </Paper>
    );
}

export default TableUser;