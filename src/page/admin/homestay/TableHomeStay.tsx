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
    Typography,
    Stack,
    IconButton,
    Tooltip,
    Chip,
    Avatar,
    CircularProgress,
    TextField,
    InputAdornment,
} from "@mui/material";

import {
    CheckCircleOutlineOutlined,
    CloseRounded,
    DeleteOutlineOutlined,
    HomeOutlined,
    LocationOnOutlined,
    PauseCircleOutlineOutlined,
    PersonOutlineOutlined,
    PlayCircleOutlineOutlined,
    SearchRounded,
} from "@mui/icons-material";
import type { PageResponse } from "../../../services/api";
import type { HomeStay } from "../../../types/homestay";
import { getDanhSachHomeStay } from "../../../services/homestayService";
import Pagination from "../../../components/common/Pagination";

const DanhSachTooltip = ({
    danhSach,
    tieuDe,
}: {
    danhSach: string[];
    tieuDe: string;
}) => {
    if (!danhSach || danhSach.length === 0) {
        return (
            <Typography sx={{ fontSize: 12, fontStyle: "italic" }} color="text.disabled">
                Chưa có
            </Typography>
        );
    }

    return (
        <Tooltip
            arrow
            placement="top"
            slotProps={{
                tooltip: {
                    sx: {
                        bgcolor: "#1e293b",
                        borderRadius: 2,
                        p: 1.5,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    },
                },
                arrow: {
                    sx: { color: "#1e293b" },
                },
            }}
            title={
                <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 12, mb: 1, color: "#f8fafc" }}>
                        Danh sách {tieuDe.toLowerCase()} ({danhSach.length})
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.6,
                            maxWidth: 260,
                        }}
                    >
                        {danhSach.map((item, index) => (
                            <Chip
                                key={`${item}-${index}`}
                                label={item}
                                size="small"
                                sx={{
                                    bgcolor: "rgba(59, 130, 246, 0.2)",
                                    color: "#93c5fd",
                                    border: "1px solid rgba(59, 130, 246, 0.3)",
                                    fontSize: 11,
                                    height: 22,
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
                    border: "1px solid #dbeafe",
                    fontWeight: 600,
                    fontSize: 11.5,
                    transition: "all 0.2s",
                    "&:hover": {
                        bgcolor: "#dbeafe",
                        transform: "translateY(-1px)",
                    },
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
                color: "#d97706",
                bg: "#fef3c7",
                border: "#fde68a",
                dot: "#f59e0b",
            };
        case "DA_DUYET":
            return {
                label: "Đã duyệt",
                color: "#059669",
                bg: "#d1fae5",
                border: "#a7f3d0",
                dot: "#10b981",
            };
        case "TU_CHOI":
            return {
                label: "Từ chối",
                color: "#dc2626",
                bg: "#fee2e2",
                border: "#fecaca",
                dot: "#ef4444",
            };
        case "TAM_NGUNG":
            return {
                label: "Tạm ngưng",
                color: "#d97706",
                bg: "#ffedd5",
                border: "#fed7aa",
                dot: "#f97316",
            };
        case "DONG_CUA":
            return {
                label: "Đóng cửa",
                color: "#475569",
                bg: "#f1f5f9",
                border: "#e2e8f0",
                dot: "#64748b",
            };
        case "DA_XOA":
            return {
                label: "Đã xóa",
                color: "#dc2626",
                bg: "#fee2e2",
                border: "#fecaca",
                dot: "#ef4444",
            };
        default:
            return {
                label: "Không xác định",
                color: "#64748b",
                bg: "#f1f5f9",
                border: "#e2e8f0",
                dot: "#94a3b8",
            };
    }
};

interface Props {
    reloadTrigger: number;
    handleXetDuyet: (item: HomeStay) => void;
}

function TableHomeStay({ handleXetDuyet, reloadTrigger }: Props) {
    const [dataPage, setDataPage] = useState<PageResponse<HomeStay> | null>(null);
    const [loading, setLoading] = useState(false);
    const [tuKhoa, setTuKhoa] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchHomeStay = async () => {
            try {
                setLoading(true);
                const data = await getDanhSachHomeStay(tuKhoa, page, rowsPerPage);
                setDataPage(data);
            } catch (error) {
                console.error("Lỗi lấy danh sách HomeStay:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeStay();
    }, [tuKhoa, page, rowsPerPage, reloadTrigger]);

    const handleChangeRowsPerPage = (kichThuocMoi: number) => {
        setRowsPerPage(kichThuocMoi);
        setPage(0);
    };

    return (
        <Box sx={{ width: "100%" }}>
            {/* Thanh công cụ Tìm kiếm */}
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    mb: 2.5,
                    borderRadius: 3,
                    border: "1px solid #e2e8f0",
                    bgcolor: "#ffffff",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.03)",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                <TextField
                    size="small"
                    placeholder="Tìm kiếm theo tên HomeStay..."
                    value={tuKhoa}
                    onChange={(e) => {
                        setTuKhoa(e.target.value);
                    }}
                    sx={{
                        width: { xs: "100%", sm: 380 },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2.5,
                            bgcolor: "#f8fafc",
                            fontSize: 13.5,
                            transition: "all 0.2s",
                            "& fieldset": {
                                borderColor: "#e2e8f0",
                            },
                            "&:hover fieldset": {
                                borderColor: "#cbd5e1",
                            },
                            "&.Mui-focused": {
                                bgcolor: "#ffffff",
                                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                            },
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRounded sx={{ fontSize: 20, color: "#94a3b8" }} />
                                </InputAdornment>
                            ),
                            endAdornment: tuKhoa ? (
                                <InputAdornment position="end">
                                    <Tooltip title="Xóa tìm kiếm">
                                        <IconButton
                                            size="small"
                                            onClick={() => setTuKhoa("")}
                                            sx={{ color: "#94a3b8", "&:hover": { color: "#475569" } }}
                                        >
                                            <CloseRounded sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ) : null,
                        },
                    }}
                />

                {/* Hiển thị tổng số bản ghi nhanh */}
                <Typography sx={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>
                    Tổng cộng:{" "}
                    <Box component="span" sx={{ fontWeight: 700, color: "#0f172a" }}>
                        {dataPage?.page?.totalElements ?? 0}
                    </Box>{" "}
                    HomeStay
                </Typography>
            </Paper>

            {/* Bảng dữ liệu */}
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    border: "1px solid #e2e8f0",
                    borderRadius: 3,
                    bgcolor: "#ffffff",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -2px rgba(0, 0, 0, 0.03)",
                    overflow: "hidden",
                }}
            >
                <Box sx={{ overflowX: "auto" }}>
                    <Table sx={{ minWidth: 1150 }}>
                        {/* Header */}
                        <TableHead>
                            <TableRow
                                sx={{
                                    backgroundColor: "#f8fafc",
                                    "& th": {
                                        fontSize: 11.5,
                                        fontWeight: 700,
                                        letterSpacing: "0.04em",
                                        color: "#475569",
                                        py: 1.8,
                                        whiteSpace: "nowrap",
                                        borderBottom: "1px solid #e2e8f0",
                                    },
                                }}
                            >
                                <TableCell align="center" sx={{ width: 60 }}>
                                    STT
                                </TableCell>
                                <TableCell sx={{ minWidth: 220 }}>HOMESTAY</TableCell>
                                <TableCell sx={{ minWidth: 160 }}>CHỦ HOMESTAY</TableCell>
                                <TableCell sx={{ minWidth: 220 }}>MÔ TẢ</TableCell>
                                <TableCell sx={{ minWidth: 190 }}>ĐỊA CHỈ</TableCell>
                                <TableCell align="center">TIỆN ÍCH</TableCell>
                                <TableCell align="center">DỊCH VỤ</TableCell>
                                <TableCell align="center">TRẠNG THÁI</TableCell>
                                <TableCell align="right" sx={{ pr: 3 }}>
                                    THAO TÁC
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody
                            sx={{
                                "& tr": {
                                    transition: "background-color 0.15s ease",
                                    "&:hover": {
                                        backgroundColor: "#f8fafc",
                                    },
                                    "& td": {
                                        borderBottom: "1px solid #f1f5f9",
                                        py: 1.75,
                                        fontSize: 13.5,
                                        color: "#334155",
                                    },
                                },
                            }}
                        >
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                gap: 1.5,
                                            }}
                                        >
                                            <CircularProgress size={32} thickness={4} sx={{ color: "#3b82f6" }} />
                                            <Typography sx={{ fontSize: 13, color: "#64748b" }}>
                                                Đang tải dữ liệu HomeStay...
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ) : dataPage?.content && dataPage.content.length > 0 ? (
                                dataPage.content.map((item, index) => {
                                    const trangThai = getTrangThaiHomeStayInfo(item.trangThaiHomeStay);

                                    return (
                                        <TableRow key={item.id}>
                                            {/* STT */}
                                            <TableCell align="center">
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: 13,
                                                        color: "#64748b",
                                                    }}
                                                >
                                                    {page * rowsPerPage + index + 1}
                                                </Typography>
                                            </TableCell>

                                            {/* Tên HomeStay */}
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        gap: 1.5,
                                                    }}
                                                >

                                                    <Typography
                                                        sx={{
                                                            fontWeight: 700,
                                                            fontSize: 13.5,
                                                            color: "#0f172a",
                                                            lineHeight: 1.4,
                                                        }}
                                                    >
                                                        {item.tenHomeStay}
                                                    </Typography>
                                                </Box>
                                            </TableCell>

                                            {/* Chủ HomeStay */}
                                            <TableCell>
                                                <Stack direction="row" spacing={0.8} sx={{ alignItems: "center" }}>
                                                    <PersonOutlineOutlined
                                                        sx={{ fontSize: 16, color: "#94a3b8" }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            fontSize: 13,
                                                            fontWeight: 500,
                                                            color: item.tenChuHomeStay ? "#334155" : "#94a3b8",
                                                        }}
                                                    >
                                                        {item.tenChuHomeStay || "Chưa cập nhật"}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>

                                            {/* Mô tả rút gọn */}
                                            <TableCell>
                                                <Tooltip title={item.moTa || ""} arrow placement="top">
                                                    <Typography
                                                        sx={{
                                                            maxWidth: 220,
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: "vertical",
                                                            fontSize: 12.5,
                                                            lineHeight: 1.5,
                                                            color: item.moTa ? "#475569" : "#94a3b8",
                                                            cursor: item.moTa ? "pointer" : "default",
                                                        }}
                                                    >
                                                        {item.moTa || "Chưa có mô tả"}
                                                    </Typography>
                                                </Tooltip>
                                            </TableCell>


                                            <TableCell>
                                                <Stack direction="row" spacing={0.8} sx={{ alignItems: "flex-start" }}>
                                                    <LocationOnOutlined
                                                        sx={{ fontSize: 16, color: "#ef4444", mt: 0.2 }}
                                                    />
                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                fontSize: 13,
                                                                fontWeight: 600,
                                                                color: "#1e293b",
                                                            }}
                                                        >
                                                            {item.tinhThanh}
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                fontSize: 12,
                                                                color: "#64748b",
                                                            }}
                                                        >
                                                            {item.phuongXa}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </TableCell>

                                            {/* Tiện ích */}
                                            <TableCell align="center">
                                                <DanhSachTooltip
                                                    danhSach={item.tienIchHienThi}
                                                    tieuDe="Tiện ích"
                                                />
                                            </TableCell>

                                            {/* Dịch vụ */}
                                            <TableCell align="center">
                                                <DanhSachTooltip
                                                    danhSach={item.dichVuHienThi}
                                                    tieuDe="Dịch vụ"
                                                />
                                            </TableCell>

                                            {/* Trạng thái */}
                                            <TableCell align="center">
                                                <Chip
                                                    label={
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 0.8,
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    width: 6,
                                                                    height: 6,
                                                                    borderRadius: "50%",
                                                                    bgcolor: trangThai.dot,
                                                                }}
                                                            />
                                                            <span>{trangThai.label}</span>
                                                        </Box>
                                                    }
                                                    size="small"
                                                    sx={{
                                                        color: trangThai.color,
                                                        backgroundColor: trangThai.bg,
                                                        border: `1px solid ${trangThai.border}`,
                                                        fontWeight: 600,
                                                        fontSize: 12,
                                                        borderRadius: "8px",
                                                        height: 26,
                                                    }}
                                                />
                                            </TableCell>

                                            {/* Thao tác */}
                                            <TableCell align="right" sx={{ pr: 2.5 }}>
                                                <Stack
                                                    direction="row"
                                                    spacing={0.8}
                                                    sx={{ justifyContent: "flex-end" }}
                                                >
                                                    {/* Chờ duyệt */}
                                                    {item.trangThaiHomeStay === "CHO_DUYET" && (
                                                        <Tooltip title="Xét duyệt HomeStay" arrow>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleXetDuyet(item)}
                                                                sx={{
                                                                    color: "#059669",
                                                                    bgcolor: "#ecfdf5",
                                                                    border: "1px solid #d1fae5",
                                                                    borderRadius: "8px",
                                                                    transition: "all 0.2s",
                                                                    "&:hover": {
                                                                        bgcolor: "#d1fae5",
                                                                        transform: "scale(1.05)",
                                                                    },
                                                                }}
                                                            >
                                                                <CheckCircleOutlineOutlined fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}

                                                    {item.trangThaiHomeStay === "DA_DUYET" && (
                                                        <Tooltip title="Tạm ngưng kinh doanh" arrow>
                                                            <IconButton
                                                                size="small"
                                                                // onClick={() => handleTamNgung(item)}
                                                                sx={{
                                                                    color: "#d97706",
                                                                    bgcolor: "#fffbeb",
                                                                    border: "1px solid #fef3c7",
                                                                    borderRadius: "8px",
                                                                    transition: "all 0.2s",
                                                                    "&:hover": {
                                                                        bgcolor: "#fef3c7",
                                                                        transform: "scale(1.05)",
                                                                    },
                                                                }}
                                                            >
                                                                <PauseCircleOutlineOutlined fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}


                                                    {item.trangThaiHomeStay === "TAM_NGUNG" && (
                                                        <Tooltip title="Mở lại kinh doanh" arrow>
                                                            <IconButton
                                                                size="small"
                                                                // onClick={() => handleMoLai(item)}
                                                                sx={{
                                                                    color: "#059669",
                                                                    bgcolor: "#ecfdf5",
                                                                    border: "1px solid #d1fae5",
                                                                    borderRadius: "8px",
                                                                    transition: "all 0.2s",
                                                                    "&:hover": {
                                                                        bgcolor: "#d1fae5",
                                                                        transform: "scale(1.05)",
                                                                    },
                                                                }}
                                                            >
                                                                <PlayCircleOutlineOutlined fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}

                                                    {/* Xóa */}
                                                    <Tooltip title="Xóa HomeStay" arrow>
                                                        <IconButton
                                                            size="small"
                                                            sx={{
                                                                color: "#64748b",
                                                                bgcolor: "#f8fafc",
                                                                border: "1px solid #e2e8f0",
                                                                borderRadius: "8px",
                                                                transition: "all 0.2s",
                                                                "&:hover": {
                                                                    bgcolor: "#fee2e2",
                                                                    borderColor: "#fecaca",
                                                                    color: "#dc2626",
                                                                    transform: "scale(1.05)",
                                                                },
                                                            }}
                                                        >
                                                            <DeleteOutlineOutlined fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
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
                                                    border: "1px dashed #93c5fd",
                                                }}
                                            >
                                                <HomeOutlined sx={{ fontSize: 32 }} />
                                            </Avatar>

                                            <Typography sx={{ fontWeight: 700, color: "#1e293b", mb: 0.5 }}>
                                                Chưa có dữ liệu HomeStay
                                            </Typography>

                                            <Typography sx={{ fontSize: 13 }} color="text.secondary">
                                                Danh sách HomeStay sẽ được hiển thị tại đây khi có dữ liệu
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Box>

                <Box
                    sx={{
                        borderTop: "1px solid #e2e8f0",
                        backgroundColor: "#f8fafc",
                    }}
                >
                    <Pagination
                        trang={page}
                        kichThuoc={rowsPerPage}
                        tongSoBanGhi={dataPage?.page.totalElements ?? 0}
                        onChangePage={setPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Box>
            </TableContainer>
        </Box>
    );
}

export default TableHomeStay;