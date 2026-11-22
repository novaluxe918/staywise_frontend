import React, { useEffect, useState } from 'react';
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
    InputAdornment,
    IconButton,
    Typography,
    Chip,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import type { PageResponse } from '../../../services/api';
import type { DichVu } from '../../../types/dichVu';
import { searchDichVu } from '../../../services/dichVuService';
import { toast } from '../../../utils/toast';
import Pagination from '../../../components/common/Pagination';

interface Props {
    reloadTrigger: number;
    handleUpdate: (item: DichVu) => void;
}

function TableDichVu({ reloadTrigger, handleUpdate }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [dataPage, setDataPage] = useState<PageResponse<DichVu> | null>(null);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const dataList = dataPage?.content ?? [];
    const totalCount = dataPage?.page.totalElements ?? 0;


    const handleResetSearch = () => {
        setSearchTerm('');
        setPage(0);
    };

    useEffect(() => {
        const fetchDichVu = async () => {
            try {
                setLoading(true);

                const response = await searchDichVu(
                    searchTerm,
                    page,
                    rowsPerPage
                );

                setDataPage(response);

            } catch (error) {
                toast.error("Không thể tải danh sách dịch vụ!");
            } finally {
                setLoading(false);
            }
        };

        fetchDichVu();
    }, [searchTerm, page, rowsPerPage, reloadTrigger]);
    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                bgcolor: '#ffffff',
                boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.05)'
            }}
        >

            <Box
                sx={{
                    p: 2.5,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #f1f5f9'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: '280px', maxWidth: '460px' }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Tìm kiếm theo tên dịch vụ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchRoundedIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                                bgcolor: '#f8fafc',
                                '& fieldset': { borderColor: '#e2e8f0' },
                                '&:hover fieldset': { borderColor: '#cbd5e1' },
                                '&.Mui-focused': {
                                    bgcolor: '#ffffff',
                                    boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.12)',
                                    '& fieldset': { borderColor: '#10b981' }
                                }
                            }
                        }}
                    />

                    <IconButton
                        onClick={handleResetSearch}
                        sx={{
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            p: '8px',
                            color: '#64748b',
                            '&:hover': { bgcolor: '#f8fafc', color: '#10b981' }
                        }}
                        title="Làm mới tìm kiếm"
                    >
                        <RefreshRoundedIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            {/* Table Container */}
            <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f8fafc' }}>
                            <TableCell sx={{ fontWeight: 700, color: '#475569', py: 1.8, width: 80, textAlign: 'center' }}>
                                STT
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700, color: '#475569', py: 1.8 }}>
                                Tên dịch vụ
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700, color: '#475569', py: 1.8, width: 180, textAlign: 'center' }}>
                                Trạng thái
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700, color: '#475569', py: 1.8, width: 140, textAlign: 'center' }}>
                                Thao tác
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {dataList.length > 0 ? (

                            dataList.map((item, index) => (
                                <TableRow key={item.id || index} hover>
                                    <TableCell sx={{ textAlign: 'center' }}>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>{item.tenDichVu}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Chip
                                            label={
                                                item.trangThai === "DANG_HOAT_DONG"
                                                    ? "Đang hoạt động"
                                                    : "Đã xóa"
                                            }
                                            size="small"
                                            color={
                                                item.trangThai === "DANG_HOAT_DONG"
                                                    ? "success"
                                                    : "default"
                                            }
                                            variant="outlined"
                                        />
                                    </TableCell>

                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <IconButton
                                            size="small"
                                            title="Chỉnh sửa"
                                            onClick={() => handleUpdate(item)}
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
                                            // onClick={() => handleXoa(item.id)}
                                            sx={{
                                                color: '#64748b',
                                                borderRadius: '8px',
                                                '&:hover': { bgcolor: '#fee2e2', color: '#dc2626' }
                                            }}
                                        >
                                            <DeleteOutlineOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} sx={{ py: 8, textAlign: 'center' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                        <Box
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: '50%',
                                                bgcolor: '#f1f5f9',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#94a3b8',
                                                mb: 0.5
                                            }}
                                        >
                                            <InboxOutlinedIcon sx={{ fontSize: 32 }} />
                                        </Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#334155' }}>
                                            Chưa có dịch vụ nào
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#94a3b8', maxWidth: 360 }}>
                                            Hiện tại chưa có dữ liệu dịch vụ cơ sở để hiển thị. Bạn có thể bấm &quot;Thêm dịch vụ&quot; để tạo mới.
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination
                trang={page}
                kichThuoc={rowsPerPage}
                tongSoBanGhi={totalCount}
                onChangePage={setPage}
                onChangeRowsPerPage={(kichThuocMoi) => {
                    setRowsPerPage(kichThuocMoi);
                    setPage(0);
                }}
            />
        </Paper>
    );
}

export default TableDichVu;