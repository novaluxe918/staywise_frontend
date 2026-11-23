import React from "react";

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
    Chip,
    IconButton,
    Tooltip,
    Stack,
    CircularProgress,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

import type { Phong } from "../../../types/phong";
import Pagination from "../../../components/common/Pagination";

interface Props {
    danhSachPhong: Phong[];
    loading: boolean;

    trang: number;
    kichThuoc: number;
    tongSoBanGhi: number;

    onChangePage: (trangMoi: number) => void;
    onChangeRowsPerPage: (kichThuocMoi: number) => void;

    onEdit: (phong: Phong) => void;
    onDelete: (phong: Phong) => void;
}

function TablePhong({
    danhSachPhong,
    loading,
    trang,
    kichThuoc,
    tongSoBanGhi,
    onChangePage,
    onChangeRowsPerPage,
    onEdit,
    onDelete,
}: Props) {


    const layTenLoaiPhong = (loaiPhong: string) => {
        const danhSach: Record<string, string> = {
            PHONG_DON: "Phòng đơn",
            PHONG_DOI: "Phòng đôi",
            PHONG_GIA_DINH: "Phòng gia đình",
            PHONG_DORM: "Phòng Dorm",
            PHONG_VIP: "Phòng VIP",
            PHONG_STUDIO: "Phòng Studio",
            PHONG_BUNGALOW: "Bungalow",
        };

        return danhSach[loaiPhong] || loaiPhong;
    };

   
    const laySoNguoi = (
        phong: Phong,
        loaiNguoi: "NGUOI_LON" | "TRE_EM"
    ) => {
        const phongCoDanhSachNguoi = phong as Phong & {
            danhSachSoNguoi?: Array<{
                theLoaiNguoi: "NGUOI_LON" | "TRE_EM";
                soLuong: number;
            }>;
        };

        return phongCoDanhSachNguoi.danhSachSoNguoi
            ?.find(item => item.theLoaiNguoi === loaiNguoi)
            ?.soLuong ?? 0;
    };

    // Lấy tên trạng thái
    const layTrangThai = (trangThai: string) => {
        switch (trangThai) {
            case "HOAT_DONG":
                return {
                    ten: "Hoạt động",
                    mau: "success" as const,
                };

            case "NGUNG_HOAT_DONG":
                return {
                    ten: "Ngừng hoạt động",
                    mau: "default" as const,
                };

            default:
                return {
                    ten: trangThai,
                    mau: "default" as const,
                };
        }
    };

   
    const hienThiGiuong = (phong: Phong) => {
        const phongCoDanhSachGiuong = phong as Phong & {
            danhSachGiuong?: Array<{
                tenGiuong: string;
                soLuong: number;
            }>;
        };

        if (!phongCoDanhSachGiuong.danhSachGiuong?.length) {
            return "Chưa có giường";
        }

        return phongCoDanhSachGiuong.danhSachGiuong
            .map(giuong => `${giuong.soLuong} × ${giuong.tenGiuong}`)
            .join(", ");
    };

    return (
        <Box>

            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 2,
                }}
            >
                <Table sx={{ minWidth: 1200 }}>

                    {/* Tiêu đề bảng */}
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                            {[
                                "STT",
                                "Tên phòng",
                                "Loại phòng",
                                "Mô tả",
                                "Diện tích",
                                "Sức chứa",
                                "Giường",
                                "Thao tác",
                            ].map((title) => (
                                <TableCell
                                    key={title}
                                    sx={{
                                        fontWeight: 700,
                                        color: "#475569",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    {/* Nội dung bảng */}
                    <TableBody>

                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    <CircularProgress size={28} />
                                </TableCell>
                            </TableRow>
                        ) : danhSachPhong.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    <Typography color="text.secondary" sx={{ py: 3 }}>
                                        Chưa có phòng nào
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            danhSachPhong.map((phong, index) => {

                       
                                return (
                                    <TableRow
                                        key={phong.id}
                                        hover
                                    >

                                        {/* STT */}
                                        <TableCell>
                                            {trang * kichThuoc + index + 1}
                                        </TableCell>

                                        {/* Tên phòng */}
                                        <TableCell>
                                            <Typography sx={{ fontWeight: 600 }}>
                                                {phong.tenPhong}
                                            </Typography>
                                        </TableCell>

                                        {/* Loại phòng */}
                                        <TableCell>
                                            <Chip
                                                label={layTenLoaiPhong(phong.loaiPhong)}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </TableCell>

                                        {/* Mô tả */}
                                        <TableCell sx={{ maxWidth: 180 }}>
                                            <Tooltip title={phong.moTa || ""}>
                                                <Typography
                                                    noWrap
                                                    sx={{ maxWidth: 180 }}
                                                    color="text.secondary"
                                                >
                                                    {phong.moTa || "Chưa có mô tả"}
                                                </Typography>
                                            </Tooltip>
                                        </TableCell>

                                        {/* Diện tích */}
                                        <TableCell>
                                            {phong.dienTich} m²
                                        </TableCell>

                                        {/* Sức chứa */}
                                        <TableCell>
                                            <Stack spacing={0.5}>
                                                <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                                                    <PeopleOutlinedIcon fontSize="small" />
                                                    <Typography sx={{ fontSize: 13 }}>
                                                        {laySoNguoi(phong, "NGUOI_LON")} người lớn
                                                    </Typography>
                                                </Stack>

                                                <Typography sx={{ fontSize: 13 }} color="text.secondary">
                                                    {laySoNguoi(phong, "TRE_EM")} trẻ em
                                                </Typography>
                                            </Stack>
                                        </TableCell>

                                        {/* Giường */}
                                        <TableCell sx={{ maxWidth: 200 }}>
                                            <Tooltip title={hienThiGiuong(phong)}>
                                                <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                                                    <KingBedOutlinedIcon
                                                        fontSize="small"
                                                        color="action"
                                                    />

                                                    <Typography
                                                        noWrap
                                                        sx={{ fontSize: 13, maxWidth: 160 }}
                                                    >
                                                        {hienThiGiuong(phong)}
                                                    </Typography>
                                                </Stack>
                                            </Tooltip>
                                        </TableCell>

                            

                                        {/* Thao tác */}
                                        <TableCell>
                                            <Stack direction="row" spacing={0.5}>

                                                <Tooltip title="Chỉnh sửa">
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        onClick={() => onEdit(phong)}
                                                    >
                                                        <EditOutlinedIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Xóa phòng">
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() => onDelete(phong)}
                                                    >
                                                        <DeleteOutlineOutlinedIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>

                                    </TableRow>
                                );
                            })
                        )}

                    </TableBody>
                </Table>
            </TableContainer>

            {/* Phân trang */}
            <Box sx={{ mt: 2 }}>
                <Pagination
                    trang={trang}
                    kichThuoc={kichThuoc}
                    tongSoBanGhi={tongSoBanGhi}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    tenBanGhi="phòng"
                />
            </Box>

        </Box>
    );
}

export default TablePhong;