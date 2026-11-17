
import React, { useEffect, useState } from "react";

import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Typography,
    Stack,
    IconButton,
    Tooltip,
    Chip,
    Avatar,

    CircularProgress,
} from "@mui/material";

import {
    VisibilityOutlined,
    DeleteOutlineOutlined,
    HomeOutlined,
} from "@mui/icons-material";
import type { PageResponse } from "../../../services/api";
import type { HomeStay } from "../../../types/homestay";
import { getDanhSachHomeStay } from "../../../services/homestayService";
import { CheckCircleIcon } from "lucide-react";


const DanhSachTooltip = ({
    danhSach,
    tieuDe,
}: {
    danhSach: string[];
    tieuDe: string;
}) => {
    if (!danhSach || danhSach.length === 0) {
        return (
            <Typography sx={{ fontSize: 12 }} color="text.secondary">
                Chưa có
            </Typography>
        );
    }

    return (
        <Tooltip
            arrow
            placement="top"
            title={
                <Box sx={{ p: 0.5 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1 }}>
                        {tieuDe}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.7,
                            maxWidth: 260,
                        }}
                    >
                        {danhSach.map((item, index) => (
                            <Chip
                                key={`${item}-${index}`}
                                label={item}
                                size="small"
                                sx={{
                                    bgcolor: "#eff6ff",
                                    color: "#1d4ed8",
                                    fontSize: 11,
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            }
        >
            <Chip
                label={`${danhSach.length} ${tieuDe.toLowerCase()}`}
                size="small"
                sx={{
                    cursor: "pointer",
                    bgcolor: "#eff6ff",
                    color: "#2563eb",
                    fontWeight: 700,
                    fontSize: 11,
                }}
            />
        </Tooltip>
    );
};


const getTrangThaiHomeStayInfo = (trangThai?: string) => {
    switch (trangThai) {
        case "CHO_DUYET":
            return {
                label: "Chờ duyệt",
                color: "#D97706",
                bg: "#FEF3C7",
            };

        case "DA_DUYET":
            return {
                label: "Đã duyệt",
                color: "#059669",
                bg: "#D1FAE5",
            };

        case "TU_CHOI":
            return {
                label: "Từ chối",
                color: "#DC2626",
                bg: "#FEE2E2",
            };

        case "TAM_NGUNG":
            return {
                label: "Tạm ngưng",
                color: "#D97706",
                bg: "#FEF3C7",
            };

        case "DONG_CUA":
            return {
                label: "Đóng cửa",
                color: "#64748B",
                bg: "#E2E8F0",
            };

        case "DA_XOA":
            return {
                label: "Đã xóa",
                color: "#DC2626",
                bg: "#FEE2E2",
            };

        default:
            return {
                label: "Không xác định",
                color: "#64748B",
                bg: "#E2E8F0",
            };
    }
};


interface Props {
      reloadTrigger: number;
   handleXetDuyet: (item: HomeStay) => void;
}
function TableHomeStay({ handleXetDuyet, reloadTrigger}: Props) {

    const [dataPage, setDataPage] = useState<PageResponse<HomeStay> | null>(null);
    const [loading, setLoading] = useState(false);
    const [tuKhoa, setTuKhoa] = useState("");

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchHomeStay = async () => {
            try {
                setLoading(true);

                const data = await getDanhSachHomeStay(
                    tuKhoa,
                    page,
                    rowsPerPage
                );


                setDataPage(data);

            } catch (error) {
                console.error("Lỗi lấy danh sách HomeStay:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeStay();

    }, [tuKhoa, page, rowsPerPage, reloadTrigger]);

    const handleChangePage = (
        _event: unknown,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ width: "100%" }}>

            {/* Bảng */}
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    border: "1px solid #e8edf5",
                    borderRadius: 3,
                    overflowX: "auto",
                }}
            >
                <Table sx={{ minWidth: 1250 }}>

                    {/* Header */}
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: "#f8fafc",
                                "& th": {
                                    fontSize: 12,
                                    fontWeight: 800,
                                    color: "#64748b",
                                    py: 2,
                                    whiteSpace: "nowrap",
                                    borderBottom: "1px solid #e2e8f0",
                                },
                            }}
                        >   
                             <TableCell>STT</TableCell>
                            <TableCell>HOMESTAY</TableCell>
                            <TableCell>CHỦ HOMESTAY</TableCell>
                            <TableCell>MÔ TẢ</TableCell>
                            <TableCell>PHƯỜNG / XÃ</TableCell>
                            <TableCell>TỈNH / THÀNH</TableCell>
                            <TableCell>TIỆN ÍCH</TableCell>
                            <TableCell>DỊCH VỤ</TableCell>
                            <TableCell>TRẠNG THÁI</TableCell>
                            <TableCell align="center">THAO TÁC</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    <CircularProgress size={30} />
                                </TableCell>
                            </TableRow>
                        ) : dataPage?.content && dataPage.content.length > 0 ? (

                            dataPage.content.map((item, index) => (
                                <TableRow key={item.id} hover>
                                    
                                     <TableCell>
                                        <Typography sx={{ fontWeight: 700, fontSize: 13 }}>
                                              {index + 1}
                                        </Typography>
                                    </TableCell>
                                    {/* Tên HomeStay */}
                                    <TableCell>
                                        <Typography sx={{ fontWeight: 700, fontSize: 13 }}>
                                            {item.tenHomeStay}
                                        </Typography>
                                    </TableCell>

                                    {/* Chủ HomeStay */}
                                    <TableCell>
                                        {item.tenChuHomeStay || "Chưa cập nhật"}
                                    </TableCell>

                                    {/* Mô tả rút gọn */}
                                    <TableCell>
                                        <Tooltip title={item.moTa || ""} arrow>
                                            <Typography
                                                sx={{
                                                    maxWidth: 200,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    fontSize: 12,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {item.moTa || "Chưa có mô tả"}
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>

                                    {/* Phường xã */}
                                    <TableCell>
                                        {item.phuongXa}
                                    </TableCell>

                                    {/* Tỉnh thành */}
                                    <TableCell>
                                        {item.tinhThanh}
                                    </TableCell>

                                    {/* Tiện ích */}
                                    <TableCell>
                                        <DanhSachTooltip
                                            danhSach={item.tienIchHienThi}
                                            tieuDe="Tiện ích"
                                        />
                                    </TableCell>

                                    {/* Dịch vụ */}
                                    <TableCell>
                                        <DanhSachTooltip
                                            danhSach={item.dichVuHienThi}
                                            tieuDe="Dịch vụ"
                                        />
                                    </TableCell>

                                    {/* Trạng thái */}
                                    <TableCell>
                                        {(() => {
                                            const trangThai = getTrangThaiHomeStayInfo(
                                                item.trangThaiHomeStay
                                            );

                                            return (
                                                <Chip
                                                    label={trangThai.label}
                                                    size="small"
                                                    sx={{
                                                        color: trangThai.color,
                                                        backgroundColor: trangThai.bg,
                                                        fontWeight: 600,
                                                        borderRadius: "8px",
                                                    }}
                                                />
                                            );
                                        })()}
                                    </TableCell>

                                    {/* Thao tác */}
                                    <TableCell align="right" sx={{ pr: 2.5, borderBottom: '1px solid #f1f5f9' }}>
                                        <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>


                                            <IconButton
                                                size="small"
                                        
                                                onClick={() => handleXetDuyet(item)}
                                                sx={{
                                                    color: '#64748b',
                                                    borderRadius: '8px',
                                                    '&:hover': { bgcolor: '#fef3c7', color: '#d97706' }
                                                }}
                                            >
                                                <CheckCircleIcon fontSize="small" />
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
                                                <DeleteOutlineOutlined fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>

                                </TableRow>
                            ))

                        ) : (

                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    <Box sx={{ py: 8 }}>
                                        <Avatar
                                            sx={{
                                                width: 64,
                                                height: 64,
                                                bgcolor: "#eff6ff",
                                                color: "#3b82f6",
                                                mx: "auto",
                                                mb: 2,
                                            }}
                                        >
                                            <HomeOutlined sx={{ fontSize: 32 }} />
                                        </Avatar>

                                        <Typography sx={{ fontWeight: 700 }}>
                                            Chưa có dữ liệu HomeStay
                                        </Typography>

                                        <Typography sx={{ fontSize: 13 }} color="text.secondary">
                                            Danh sách HomeStay sẽ được hiển thị tại đây
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>

                {/* Pagination */}
                <Box
                    sx={{
                        borderTop: "1px solid #edf0f5",
                        backgroundColor: "#fff",
                    }}
                >
                    <TablePagination
                        component="div"
                        count={dataPage?.page.totalElements ?? 0}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 20]}
                        labelRowsPerPage="Số dòng:"
                        labelDisplayedRows={({ from, to, count }) =>
                            `${from}-${to} trên ${count}`
                        }
                        sx={{
                            "& .MuiTablePagination-toolbar": {
                                minHeight: 60,
                            },
                            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                                fontSize: 12,
                                color: "#64748b",
                            },
                        }}
                    />
                </Box>
            </TableContainer>

        </Box>
    );
}

export default TableHomeStay;
