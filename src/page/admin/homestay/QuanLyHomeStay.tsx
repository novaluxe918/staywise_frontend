import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import TableHomeStay from './TableHomeStay';
import type { HomeStay } from '../../../types/homestay';
import ModalXetDuyet from './ModalXetDuyet';

function QuanLyHomeStay() {

    const [openApprove, setOpenApprove] = useState(false);
    const [homeStaySelected, setHomeStaySelected] =
        useState<HomeStay | null>(null);
    const [reloadTrigger, setReloadTrigger] = useState(0);

    const handleReload = () => {
        setReloadTrigger(prev => prev + 1);
    };


    const handleXetDuyet = (item: HomeStay) => {
        setHomeStaySelected(item);
        setOpenApprove(true);
    }

    const handleDongApprove = () => {
        setOpenApprove(false);
        setHomeStaySelected(null);
    }

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
                        Danh sách HomeStay
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 13,
                            color: "#94a3b8",
                        }}
                    >
                        Quản lý và xét duyệt thông tin các cơ sở lưu trú
                    </Typography>
                </Box>

            </Stack>

            <TableHomeStay handleXetDuyet={handleXetDuyet}  reloadTrigger={reloadTrigger}/>

            <ModalXetDuyet open={openApprove} onClose={handleDongApprove} homeStay={homeStaySelected}  onSuccess={handleReload} />

        </div>
    );
}

export default QuanLyHomeStay;