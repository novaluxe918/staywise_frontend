
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
    Avatar,
    Tooltip,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";


import Pagination from "../../../components/common/Pagination";
import type { LoaiGiuong } from "../../../types/giuong";

interface Props {
    danhSach: LoaiGiuong[];
    trang: number;
    kichThuoc: number;
    tongSoBanGhi: number;

    handleUpdate: (item: LoaiGiuong) => void;
    handleDelete: (id: number) => void;

    handleChangePage: (trangMoi: number) => void;
    handleChangeRowsPerPage: (kichThuocMoi: number) => void;
}

function TableGiuong({
    danhSach,
    trang,
    kichThuoc,
    tongSoBanGhi,
    handleUpdate,
    handleDelete,
    handleChangePage,
    handleChangeRowsPerPage,
}: Props) {

    return (
        <Paper
            elevation={0}
            sx={{
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                overflow: "hidden",
            }}
        >
            <TableContainer>
                <Table>
                    {/* HEADER */}
                    <TableHead>
                        <TableRow
                            sx={{
                                bgcolor: "#F1F8F2",
                            }}
                        >
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 700, width: 80 }}
                            >
                                STT
                            </TableCell>

                            <TableCell sx={{ fontWeight: 700 }}>
                                Tên giường
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontWeight: 700, width: 160 }}
                            >
                                Hình ảnh
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontWeight: 700, width: 180 }}
                            >
                                Trạng thái
                            </TableCell>

                            <TableCell
                                align="center"
                                sx={{ fontWeight: 700, width: 140 }}
                            >
                                Thao tác
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    {/* BODY */}
                    <TableBody>
                        {danhSach.length > 0 ? (
                            danhSach.map((item, index) => (
                                <TableRow
                                    key={item.id}
                                    hover
                                    sx={{
                                        "&:last-child td": {
                                            borderBottom: 0,
                                        },
                                    }}
                                >
                                    {/* STT */}
                                    <TableCell align="center">
                                        {trang * kichThuoc + index + 1}
                                    </TableCell>

                                    {/* TÊN GIƯỜNG */}
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                color: "#263238",
                                            }}
                                        >
                                            {item.tenGiuong}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="center" sx={{ width: 130, py: 1 }}>
                                        <Box
                                            sx={{
                                                width: 108,
                                                height: 76,
                                                mx: "auto",
                                                p: 0.5, 
                                                borderRadius: "10px",
                                                bgcolor: "#F1F8F2", 
                                                border: "1px solid #dcfce7",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={item.hinhAnh}
                                                alt={item.tenGiuong}
                                                sx={{
                                                    maxWidth: "100%",
                                                    maxHeight: "100%",
                                                    width: "auto",
                                                    height: "auto",
                                                    objectFit: "contain", 
                                                    borderRadius: "6px",
                                                }}
                                            />
                                        </Box>
                                    </TableCell>

                                    {/* TRẠNG THÁI */}
                                    <TableCell align="center">
                                        <Chip
                                            label={
                                                item.trangThai === "DANG_HOAT_DONG"
                                                    ? "Đang hoạt động"
                                                    : "Đã xóa"
                                            }
                                            color={
                                                item.trangThai === "DANG_HOAT_DONG"
                                                    ? "success"
                                                    : "default"
                                            }
                                            size="small"
                                            sx={{
                                                fontWeight: 600,
                                            }}
                                        />
                                    </TableCell>

                                    {/* THAO TÁC */}
                                    <TableCell align="center">
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <Tooltip title="Chỉnh sửa">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleUpdate(item)}
                                                    sx={{
                                                        color: "#1976D2",
                                                        bgcolor: "#E3F2FD",
                                                        "&:hover": {
                                                            bgcolor: "#BBDEFB",
                                                        },
                                                    }}
                                                >
                                                    <EditRoundedIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Xóa">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDelete(item.id)}
                                                    sx={{
                                                        color: "#D32F2F",
                                                        bgcolor: "#FFEBEE",
                                                        "&:hover": {
                                                            bgcolor: "#FFCDD2",
                                                        },
                                                    }}
                                                >
                                                    <DeleteRoundedIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography
                                        color="text.secondary"
                                        sx={{ py: 5 }}
                                    >
                                        Không tìm thấy loại giường nào!
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* PHÂN TRANG */}
            <Pagination
                trang={trang}
                kichThuoc={kichThuoc}
                tongSoBanGhi={tongSoBanGhi}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default TableGiuong;
