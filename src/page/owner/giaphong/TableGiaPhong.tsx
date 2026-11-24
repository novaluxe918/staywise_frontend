import {
    Box,
    Chip,
    CircularProgress,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import { CalendarDays, FolderOpen, Pencil, Trash2 } from "lucide-react";
import React from "react";
import Pagination from "../../../components/common/Pagination";
import type { GiaPhong } from "../../../types/giaPhong";

interface Props {
    danhSachGiaPhong: GiaPhong[];
    loading: boolean;
    trang: number;
    kichThuoc: number;
    tongSoBanGhi: number;
    onChangePage: (trangMoi: number) => void;
    onChangeRowsPerPage: (kichThuocMoi: number) => void;
    onEdit?: (item: GiaPhong) => void;
    onDelete?: (item: GiaPhong) => void;
}

const formatGiaPhong = (gia: number) => {
    return new Intl.NumberFormat("vi-VN").format(gia) + " ₫";
};

const formatNgay = (ngay: string) => {
    if (!ngay) return "—";
    return new Date(ngay).toLocaleDateString("vi-VN");
};

const TableGiaPhong: React.FC<Props> = ({
    danhSachGiaPhong,
    loading,
    trang,
    kichThuoc,
    tongSoBanGhi,
    onChangePage,
    onChangeRowsPerPage,
    onEdit,
    onDelete,
}) => {
    return (
        <Box>
            <TableContainer>
                <Table sx={{ minWidth: 720 }}>
                    <TableHead>
                        <TableRow
                            sx={{
                                bgcolor: "#f8fafc",
                                "& th": {
                                    borderBottom: "1px solid #e2e8f0",
                                    color: "#475569",
                                    fontWeight: 700,
                                    fontSize: "0.75rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                    py: 1.75,
                                },
                            }}
                        >
                            <TableCell align="center" sx={{ width: 70 }}>
                                STT
                            </TableCell>
                            <TableCell>Tên phòng</TableCell>
                            <TableCell align="right">Giá phòng</TableCell>
                            <TableCell align="center">Ngày bắt đầu</TableCell>
                            <TableCell align="center">Ngày kết thúc</TableCell>
                            <TableCell align="center" sx={{ width: 120 }}>
                                Thao tác
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody
                        sx={{
                            "& tr:last-child td": { borderBottom: 0 },
                            "& td": {
                                borderBottom: "1px solid #f1f5f9",
                                py: 1.75,
                            },
                        }}
                    >
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 7 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 1.5,
                                        }}
                                    >
                                        <CircularProgress
                                            size={30}
                                            sx={{ color: "#00695c" }}
                                        />
                                        <Typography
                                            variant="body2"
                                            sx={{ color: "#64748b", fontWeight: 500 }}
                                        >
                                            Đang tải danh sách bảng giá...
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : danhSachGiaPhong.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 7 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: "12px",
                                                bgcolor: "#f1f5f9",
                                                color: "#94a3b8",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                mb: 0.5,
                                            }}
                                        >
                                            <FolderOpen size={24} />
                                        </Box>
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                color: "#334155",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            Chưa có dữ liệu bảng giá
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: "#94a3b8" }}
                                        >
                                            Thử thay đổi từ khóa tìm kiếm hoặc nhấn "Thêm mới" để tạo bảng giá.
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            danhSachGiaPhong.map((item, index) => (
                                <TableRow
                                    key={item.id}
                                    hover
                                    sx={{
                                        transition: "background-color 0.15s ease",
                                        "&:hover": {
                                            bgcolor: "#f8fafc",
                                        },
                                    }}
                                >
                                    {/* STT */}
                                    <TableCell align="center">
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: "#64748b",
                                            }}
                                        >
                                            {trang * kichThuoc + index + 1}
                                        </Typography>
                                    </TableCell>

                                    {/* Tên phòng */}
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                color: "#0f172a",
                                                fontSize: "0.925rem",
                                            }}
                                        >
                                            {item.tenPhong}
                                        </Typography>
                                    </TableCell>

                                    {/* Giá phòng */}
                                    <TableCell align="right">
                                        <Chip
                                            label={formatGiaPhong(item.giaPhong)}
                                            size="small"
                                            sx={{
                                                bgcolor: "#e0f2f1",
                                                color: "#00695c",
                                                fontWeight: 700,
                                                fontSize: "0.875rem",
                                                fontVariantNumeric: "tabular-nums",
                                                borderRadius: "8px",
                                                px: 0.5,
                                            }}
                                        />
                                    </TableCell>

                                    {/* Ngày bắt đầu */}
                                    <TableCell align="center">
                                        <Stack
                                            direction="row"
                                            spacing={0.75}
                                            sx={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "#475569",
                                            }}
                                        >
                                            <CalendarDays
                                                size={15}
                                                className="text-slate-400"
                                            />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 500,
                                                    fontVariantNumeric: "tabular-nums",
                                                }}
                                            >
                                                {formatNgay(item.ngayBatDau)}
                                            </Typography>
                                        </Stack>
                                    </TableCell>

                                    {/* Ngày kết thúc */}
                                    <TableCell align="center">
                                        <Stack
                                            direction="row"
                                            spacing={0.75}
                                            sx={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "#475569",
                                            }}
                                        >
                                            <CalendarDays
                                                size={15}
                                                className="text-slate-400"
                                            />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 500,
                                                    fontVariantNumeric: "tabular-nums",
                                                }}
                                            >
                                                {formatNgay(item.ngayKetThuc)}
                                            </Typography>
                                        </Stack>
                                    </TableCell>

                                    {/* Thao tác */}
                                    <TableCell align="center">
                                        <Stack
                                            direction="row"
                                            spacing={0.75}
                                            sx={{ justifyContent: "center" }}
                                        >
                                            <Tooltip title="Chỉnh sửa" arrow>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onEdit?.(item)}
                                                    sx={{
                                                        color: "#00695c",
                                                        bgcolor: "#f0fdfa",
                                                        borderRadius: "8px",
                                                        p: 0.85,
                                                        transition: "all 0.15s ease",
                                                        "&:hover": {
                                                            bgcolor: "#ccfbf1",
                                                            transform: "translateY(-1px)",
                                                        },
                                                    }}
                                                >
                                                    <Pencil size={16} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Xóa" arrow>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onDelete?.(item)}
                                                    sx={{
                                                        color: "#dc2626",
                                                        bgcolor: "#fef2f2",
                                                        borderRadius: "8px",
                                                        p: 0.85,
                                                        transition: "all 0.15s ease",
                                                        "&:hover": {
                                                            bgcolor: "#fee2e2",
                                                            transform: "translateY(-1px)",
                                                        },
                                                    }}
                                                >
                                                    <Trash2 size={16} />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                sx={{
                    px: 2.5,
                    py: 1.5,
                    borderTop: "1px solid #f1f5f9",
                    bgcolor: "#fcfdfd",
                }}
            >
                <Pagination
                    trang={trang}
                    kichThuoc={kichThuoc}
                    tongSoBanGhi={tongSoBanGhi}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    tenBanGhi="giá phòng"
                />
            </Box>
        </Box>
    );
};

export default TableGiaPhong;