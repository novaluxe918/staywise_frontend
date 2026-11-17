import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import TableHomeStay from './TableHomeStay';

function QuanLyHomeStay() {
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
                        Quản lý HomeStay
                    </Typography>
                </Box>
            </Stack>

            <TableHomeStay />


        </div>
    );
}

export default QuanLyHomeStay;