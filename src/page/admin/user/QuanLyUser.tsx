import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableUser from './TableUser';
import type { NguoiDung } from '../../../context/AuthContext';
import type { PageResponse } from '../../../services/api';
import { getThongTinNguoiDung } from '../../../services/nguoiDungService';
import type { NguoiDungQuanLy } from '../../../types/nguoiDung';

function QuanLyUser() {
      
    const [nguoiDungs, setNguoiDungs] = useState<NguoiDungQuanLy[]>([]);
    const [loading, setLoading] = useState(false);

    // Bộ lọc
    const [tuKhoa, setTuKhoa] = useState("");
    const [vaiTro, setVaiTro] = useState("");
    const [trangThai, setTrangThai] = useState("");
    const [tuKhoaDebounce, setTuKhoaDebounce] = useState("");


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalElements, setTotalElements] = useState(0);

    // Debounce tìm kiếm 400ms
    useEffect(() => {

        const timer = setTimeout(() => {
            setTuKhoaDebounce(tuKhoa);
        }, 400);

        return () => clearTimeout(timer);

    }, [tuKhoa]);


    useEffect(() => {

        const fetchNguoiDung = async () => {

            try {

                setLoading(true);

                const data: PageResponse<NguoiDungQuanLy> =
                    await getThongTinNguoiDung({
                        tuKhoa: tuKhoaDebounce,
                        vaiTro,
                        trangThai,
                        trang: page,
                        kichThuoc: rowsPerPage
                    });

                setNguoiDungs(data.content);
                setTotalElements(data.page.totalElements);

            } catch (error) {

                console.error("Lỗi lấy danh sách người dùng:", error);

            } finally {

                setLoading(false);

            }
        };

        fetchNguoiDung();

    }, [tuKhoaDebounce, vaiTro, trangThai, page, rowsPerPage]);

    // Tìm kiếm
    const handleSearchChange = (value: string) => {
        setTuKhoa(value);
        setPage(0);
    };

    // Lọc vai trò
    const handleVaiTroChange = (value: string) => {
        setVaiTro(value);
        setPage(0);
    };

    // Lọc trạng thái
    const handleTrangThaiChange = (value: string) => {
        setTrangThai(value);
        setPage(0);
    };

    // Chuyển trang
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    // Thay đổi số dòng
    const handleRowsPerPageChange = (value: number) => {
        setRowsPerPage(value);
        setPage(0);
    };
    return (
         <div className="p-6 bg-slate-50/50 min-h-screen">

            <Stack
                direction="row"
                sx={{
                    mb: 3,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                {/* Tiêu đề bảng */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        sx={{
                            fontSize: 20,
                            fontWeight: 800,
                            color: "#172554",
                            mb: 0.5,
                        }}
                    >
                        Quản lý thông tin User
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 13,
                            color: "#94a3b8",
                        }}
                    >
                        Quản lý và xem xét các thông tin
                    </Typography>
                </Box>

            </Stack>
            <TableUser   
            nguoiDungs={nguoiDungs}
                loading={loading}
                tuKhoa={tuKhoa}
                vaiTro={vaiTro}
                trangThai={trangThai}
                page={page}
                rowsPerPage={rowsPerPage}
                totalElements={totalElements}
                onSearchChange={handleSearchChange}
                onVaiTroChange={handleVaiTroChange}
                onTrangThaiChange={handleTrangThaiChange}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}  />

        </div>
    );
}

export default QuanLyUser;