import { Box, Stack, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import TableUser from './TableUser';
import type { NguoiDung } from '../../../context/AuthContext';
import type { PageResponse } from '../../../services/api';
import { capNhatTrangThaiUser, getThongTinNguoiDung } from '../../../services/nguoiDungService';
import type { NguoiDungResponse } from '../../../types/nguoiDung';
import ModalXemChiTiet from './ModalXemChiTiet';
import { toast } from '../../../utils/toast';
import ModalXacNhanTrangThai from './ModalXacNhanTrangThai';

function QuanLyUser() {
    const [openDetail, setOpenDetail] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(false);

    const [selectedUser, setSelectedUser] =
        useState<NguoiDungResponse | null>(null);

    const [nguoiDungs, setNguoiDungs] =
        useState<NguoiDungResponse[]>([]);

    const [loading, setLoading] = useState(false);

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


    const fetchNguoiDung = useCallback(async () => {
        try {
            setLoading(true);

            const data: PageResponse<NguoiDungResponse> =
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
            toast.error("Không thể tải danh sách người dùng");
        } finally {
            setLoading(false);
        }
    }, [tuKhoaDebounce, vaiTro, trangThai, page, rowsPerPage]);

    // Tự động lấy danh sách khi tìm kiếm, lọc hoặc chuyển trang
    useEffect(() => {
        fetchNguoiDung();
    }, [fetchNguoiDung]);

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

   
    const handleXemChiTiet = (user: NguoiDungResponse) => {
        setSelectedUser(user);
        setOpenDetail(true);
    };

    
    const handleOpenConfirm = (user: NguoiDungResponse) => {
        setSelectedUser(user);
        setOpenConfirm(true);
    };

    const handleConfirmStatus = async () => {
        if (!selectedUser) return;

        const isLocked =
            selectedUser.trangThaiUser === "BI_KHOA";

        const trangThaiMoi = isLocked
            ? "DANG_HOAT_DONG"
            : "BI_KHOA";

        try {
            setLoadingStatus(true);

            await capNhatTrangThaiUser(selectedUser.id, {
                trangThaiUser: trangThaiMoi
            });

            setOpenConfirm(false);
            setSelectedUser(null);

            toast.success(
                isLocked
                    ? "Mở khóa tài khoản thành công"
                    : "Khóa tài khoản thành công"
            );

            // Tải lại danh sách sau khi cập nhật
            await fetchNguoiDung();

        } catch (error) {
            console.error("Lỗi cập nhật trạng thái:", error);
            toast.error("Cập nhật trạng thái tài khoản thất bại");
        } finally {
            setLoadingStatus(false);
        }
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
                onRowsPerPageChange={handleRowsPerPageChange} handleXemChiTiet={handleXemChiTiet} handleOpenConfirm={handleOpenConfirm} />

            <ModalXemChiTiet user={selectedUser} open={openDetail} onClose={() => setOpenDetail(false)} />

            <ModalXacNhanTrangThai open={openConfirm} onClose={() => setOpenConfirm(false)} onConfirm={handleConfirmStatus}
                isLocked={selectedUser?.trangThaiUser === "BI_KHOA"}
                userName={selectedUser?.hoTen ?? ""}
                loading={loadingStatus} />

        </div>
    );
}

export default QuanLyUser;