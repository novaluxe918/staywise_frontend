
import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableOwner from './TableOwner';
import type { CapNhatTrangThaiXacMinhRequest, OwnerRow } from '../../../types/nguoiDung';
import { capNhatTrangThaiXacMinh, getDanhSachOwners } from '../../../services/nguoiDungService';
import ModalXemGiayTo from './ModalXemGiayTo';
import ModalThamDinh from './ModalThamDinh';
import { toast } from '../../../utils/toast';

function QuanLyOwner() {
    const [owner, setOwner] = useState<OwnerRow[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [openGiayTo, setOpenGiayTo] = useState(false);
    const [ownerDangXem, setOwnerDangXem] = useState<OwnerRow | null>(null);
    const [openThamDinh, setOpenThamDinh] = useState(false);
    const [ownerThamDinh, setOwnerThamDinh] =
        useState<OwnerRow | null>(null);

    const fetchOwners = async (
        tuKhoa: string = search,
        trang: number = 0,
        kichThuoc: number = 5
    ) => {
        try {
            setLoading(true);

            const data = await getDanhSachOwners({
                tuKhoa,
                trang,
                kichThuoc
            });

            
            setOwner(data.content);

            
            setTotalElements(data.page.totalElements);

        } catch (error) {
            console.error('Lỗi lấy danh sách Owner:', error);
        } finally {
            setLoading(false);
        }
    };

    // Tìm kiếm
    const handleSearchChange = (keyword: string) => {
        setSearch(keyword);
        fetchOwners(keyword, 0, 5);
    };

    // Chuyển trang
    const handlePageChange = (newPage: number, rowsPerPage: number) => {
        fetchOwners(search, newPage, rowsPerPage);
    };



    const handleXemGiayTo = (row: OwnerRow) => {
        setOwnerDangXem(row);
        setOpenGiayTo(true);
    };

    // Đóng modal
    const handleDongGiayTo = () => {
        setOpenGiayTo(false);
        setOwnerDangXem(null);
    };

    const handleCapNhatTrangThai = (row: OwnerRow) => {
        setOwnerThamDinh(row);
        setOpenThamDinh(true);
    };

    const handleSubmitThamDinh = async (
        id: number,
        data: CapNhatTrangThaiXacMinhRequest
    ) => {
        try {
            await capNhatTrangThaiXacMinh(id, data);

            toast.success("Cập nhật trạng thái xác minh thành công!");


            setOpenThamDinh(false);
            setOwnerThamDinh(null);


            await fetchOwners();

        } catch (error) {
            console.error("Lỗi cập nhật trạng thái:", error);
            toast.error("Cập nhật trạng thái xác minh thất bại!");
        }
    };
    useEffect(() => {
        fetchOwners('', 0, 5);
    }, []);


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
                <Box>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: '#0f172a' }}
                    >
                        Quản lý Chủ HomeStay & Thẩm định Hồ sơ
                    </Typography>
                </Box>
            </Stack>

            <TableOwner
                owners={owner}
                totalElements={totalElements}
                onSearchChange={handleSearchChange}
                onPageChange={handlePageChange}
                handleXemGiayTo={handleXemGiayTo}
                handleCapNhatTrangThai={handleCapNhatTrangThai}
            />

            <ModalXemGiayTo
                open={openGiayTo}
                onClose={handleDongGiayTo}
                owner={ownerDangXem}
            />

            <ModalThamDinh open={openThamDinh}
                onClose={() => setOpenThamDinh(false)}
                owner={ownerThamDinh}
                onSubmit={handleSubmitThamDinh}
            />

        </div>
    );
}

export default QuanLyOwner;
