
import React, { useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Typography,
    Stack,
    TextField,
    InputAdornment,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    alpha,
} from '@mui/material';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';

import type { OwnerRow } from '../../../types/nguoiDung';

// Thông tin hiển thị trạng thái
const getTrangThaiInfo = (trangThai?: string) => {
    switch (trangThai) {
        case 'CHUA_XAC_MINH':
            return {
                label: 'Chưa xác minh',
                color: '#64748B',
                bg: '#94A3B8',
            };

        case 'CHO_XAC_MINH':
            return {
                label: 'Chờ xác minh',
                color: '#D97706',
                bg: '#D97706',
            };

        case 'DA_XAC_MINH':
            return {
                label: 'Đã xác minh',
                color: '#059669',
                bg: '#059669',
            };

        case 'TU_CHOI':
            return {
                label: 'Từ chối',
                color: '#DC2626',
                bg: '#DC2626',
            };

        default:
            return {
                label: 'Không xác định',
                color: '#64748B',
                bg: '#94A3B8',
            };
    }
};

interface Props {
    owners?: OwnerRow[];
    onSearchChange?: (keyword: string) => void;
    handleXemGiayTo: (row: OwnerRow) => void;
    handleCapNhatTrangThai?: (row: OwnerRow) => void;
}

function TableOwner({
    owners = [],
    onSearchChange,
    handleXemGiayTo,
    handleCapNhatTrangThai,
}: Props) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Tìm kiếm
    const handleSearch = (value: string) => {
        setSearch(value);
        onSearchChange?.(value);
    };

    // Lọc dữ liệu
    const filteredOwners = owners.filter((row) => {
        const keyword = search.trim().toLowerCase();

        const matchKeyword =
            !keyword ||
            row.hoTen?.toLowerCase().includes(keyword) ||
            row.email?.toLowerCase().includes(keyword) ||
            row.soDienThoai?.toLowerCase().includes(keyword);

        const matchStatus =
            statusFilter === 'all' ||
            row.trangThaiXacMinh === statusFilter;

        return matchKeyword && matchStatus;
    });

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 3,
                border: '1px solid #E2E8F0',
                bgcolor: '#FFFFFF',
                boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04)',
                overflow: 'hidden',
            }}
        >
            {/* Thanh tìm kiếm và bộ lọc */}
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
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1.5}
                    sx={{ width: { xs: '100%', md: 'auto' } }}
                >
                    {/* Tìm kiếm */}
                    <TextField
                        size="small"
                        placeholder="Tìm tên, số điện thoại, email..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        sx={{
                            width: { xs: '100%', sm: 320 },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                bgcolor: '#F8FAFC',
                                fontSize: '0.875rem',

                                '& fieldset': {
                                    borderColor: '#E2E8F0',
                                },

                                '&:hover fieldset': {
                                    borderColor: '#CBD5E1',
                                },

                                '&.Mui-focused fieldset': {
                                    borderColor: '#0D9488',
                                },
                            },
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlinedIcon
                                            sx={{
                                                fontSize: 19,
                                                color: '#64748B',
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: search && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleSearch('')}
                                        >
                                            <CloseRoundedIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {/* Lọc trạng thái */}
                    <FormControl size="small">
                        <Select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            displayEmpty
                            startAdornment={
                                <FilterListRoundedIcon
                                    sx={{
                                        fontSize: 18,
                                        color: '#64748B',
                                        mr: 1,
                                    }}
                                />
                            }
                            sx={{
                                minWidth: 190,
                                borderRadius: 2,
                                bgcolor: '#F8FAFC',
                                fontSize: '0.875rem',
                                '& fieldset': {
                                    borderColor: '#E2E8F0',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#CBD5E1',
                                },
                            }}
                        >
                            <MenuItem value="all">Tất cả trạng thái</MenuItem>
                            <MenuItem value="CHUA_XAC_MINH">
                                Chưa xác minh
                            </MenuItem>
                            <MenuItem value="CHO_XAC_MINH">
                                Chờ xác minh
                            </MenuItem>
                            <MenuItem value="DA_XAC_MINH">
                                Đã xác minh
                            </MenuItem>
                            <MenuItem value="TU_CHOI">
                                Từ chối
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Typography
                    variant="body2"
                    sx={{
                        color: '#64748B',
                        fontSize: '0.8rem',
                    }}
                >
                    Tổng cộng: <strong>{filteredOwners.length}</strong> chủ Homestay
                </Typography>
            </Box>

            {/* Bảng dữ liệu */}
            <TableContainer sx={{ overflowX: 'auto' }}>
                <Table
                    sx={{
                        minWidth: 1000,
                        tableLayout: 'fixed',
                    }}
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                bgcolor: '#F8FAFC',
                                '& th': {
                                    py: 2,
                                    fontWeight: 700,
                                    fontSize: '0.72rem',
                                    letterSpacing: '0.04em',
                                    color: '#64748B',
                                    borderBottom: '1px solid #E2E8F0',
                                    whiteSpace: 'nowrap',
                                },
                            }}
                        >
                            <TableCell sx={{ width: 65, pl: 3 }}>
                                STT
                            </TableCell>

                            <TableCell sx={{ width: 230 }}>
                                Chủ Homestay
                            </TableCell>

                            <TableCell sx={{ width: 160 }}>
                                Số điện thoại
                            </TableCell>

                            <TableCell sx={{ width: 260 }}>
                                Email
                            </TableCell>

                            <TableCell sx={{ width: 180 }}>
                                Trạng thái
                            </TableCell>

                            <TableCell align="center" sx={{ width: 120 }}>
                                Thao tác
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredOwners.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    align="center"
                                    sx={{ py: 9, border: 0 }}
                                >
                                    <Stack
                                        spacing={1.5}
                                        sx={{ alignItems: 'center' }}
                                    >
                                        <Box
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: '50%',
                                                bgcolor: '#F1F5F9',
                                                border: '1px dashed #CBD5E1',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <InboxOutlinedIcon
                                                sx={{
                                                    fontSize: 28,
                                                    color: '#94A3B8',
                                                }}
                                            />
                                        </Box>

                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 700,
                                                color: '#334155',
                                            }}
                                        >
                                            Không tìm thấy chủ Homestay
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            sx={{ color: '#94A3B8' }}
                                        >
                                            Thử thay đổi từ khóa hoặc bộ lọc trạng thái
                                        </Typography>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredOwners.map((row, index) => {
                                const trangThai = getTrangThaiInfo(
                                    row.trangThaiXacMinh
                                );

                                return (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            transition: 'background-color 0.2s',
                                            '&:hover': {
                                                bgcolor: alpha('#0D9488', 0.035),
                                            },
                                            '& td': {
                                                py: 2,
                                                borderBottom: '1px solid #F1F5F9',
                                            },
                                            '&:last-child td': {
                                                borderBottom: 0,
                                            },
                                        }}
                                    >
                                        {/* STT */}
                                        <TableCell sx={{ pl: 3 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#64748B',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {index + 1}
                                            </Typography>
                                        </TableCell>

                                        {/* Chủ Homestay */}
                                        <TableCell>
                                            <Stack
                                                direction="row"
                                                spacing={1.5}
                                                sx={{ alignItems: 'center' }}
                                            >
                                                <Avatar
                                                    src={row.anhDaiDien || undefined}
                                                    alt={row.hoTen}
                                                    sx={{
                                                        width: 42,
                                                        height: 42,
                                                        bgcolor: '#CCFBF1',
                                                        color: '#0F766E',
                                                        fontWeight: 700,
                                                        fontSize: '0.95rem',
                                                        border: '1px solid #E2E8F0',
                                                    }}
                                                >
                                                    {row.hoTen?.charAt(0)?.toUpperCase()}
                                                </Avatar>

                                                <Box sx={{ minWidth: 0 }}>
                                                    <Typography
                                                        variant="body2"
                                                        noWrap
                                                        sx={{
                                                            fontWeight: 700,
                                                            color: '#0F172A',
                                                        }}
                                                    >
                                                        {row.hoTen}
                                                    </Typography>

                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: '#94A3B8',
                                                            fontFamily: 'monospace',
                                                        }}
                                                    >
                                                        #{row.id}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </TableCell>

                                        {/* Số điện thoại */}
                                        <TableCell>
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                sx={{ alignItems: 'center' }}
                                            >
                                                <PhoneOutlinedIcon
                                                    sx={{
                                                        fontSize: 17,
                                                        color: '#0D9488',
                                                    }}
                                                />

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: '#334155',
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {row.soDienThoai || 'Chưa cập nhật'}
                                                </Typography>
                                            </Stack>
                                        </TableCell>

                                        {/* Email */}
                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                                noWrap
                                                title={row.email}
                                                sx={{
                                                    color: '#334155',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {row.email || 'Chưa cập nhật'}
                                            </Typography>
                                        </TableCell>

                                        {/* Trạng thái */}
                                        <TableCell>
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                sx={{ alignItems: 'center' }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: '50%',
                                                        bgcolor: trangThai.bg,
                                                        flexShrink: 0,
                                                    }}
                                                />

                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: trangThai.color,
                                                        fontWeight: 600,
                                                        fontSize: '0.8rem',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {trangThai.label}
                                                </Typography>
                                            </Stack>
                                        </TableCell>

                                        {/* Thao tác */}
                                        <TableCell align="center">
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                sx={{ justifyContent: 'center' }}
                                            >
                                                {/* Xem giấy tờ */}
                                                <IconButton
                                                    size="small"
                                                    title="Xem giấy tờ"
                                                    onClick={() =>
                                                        handleXemGiayTo(row)
                                                    }
                                                    sx={{
                                                        color: '#0284C7',
                                                        bgcolor: '#F0F9FF',
                                                        borderRadius: 2,
                                                        '&:hover': {
                                                            bgcolor: '#E0F2FE',
                                                        },
                                                    }}
                                                >
                                                    <VisibilityOutlinedIcon fontSize="small" />
                                                </IconButton>

                                                {/* Cập nhật trạng thái */}
                                                <IconButton
                                                    size="small"
                                                    title="Cập nhật trạng thái"
                                                    
                                                    onClick={() =>
                                                        handleCapNhatTrangThai?.(row)
                                                    }
                                                    sx={{
                                                        color: '#0D9488',
                                                        bgcolor: '#F0FDFA',
                                                        borderRadius: 2,
                                                        '&:hover': {
                                                            bgcolor: '#CCFBF1',
                                                        },
                                                    }}
                                                >
                                                    <EditOutlinedIcon fontSize="small" />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default TableOwner;
