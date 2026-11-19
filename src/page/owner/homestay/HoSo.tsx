
import React, { useEffect, useState } from "react";

import {
    Box,
    Paper,
    Typography,
    CircularProgress,
    Alert,
    Grid,
    Divider,
    Chip,
} from "@mui/material";
import type { HomeStay } from "../../../types/homestay";
import { layThongTinHomeStay } from "../../../services/homestayService";
import { useHomeStay } from "../../../context/HomeStayContext";


function HoSo() {

    // Lấy ID HomeStay đang chọn trên Header
    const { homeStayDangChon, dangTaiHomeStay } = useHomeStay();

    console.log("ID HomeStay đang chọn:", homeStayDangChon);
    console.log("Kiểu dữ liệu:", typeof homeStayDangChon);
    console.log("Đang tải danh sách:", dangTaiHomeStay);

    // Lưu thông tin HomeStay
    const [homeStay, setHomeStay] =
        useState<HomeStay | null>(null);

    const [dangTai, setDangTai] = useState(false);

    const [loi, setLoi] = useState("");

    // Mỗi khi đổi HomeStay trên Header thì tải lại thông tin
    useEffect(() => {

        const layDuLieu = async () => {

            if (dangTaiHomeStay) return;

            if (!homeStayDangChon) {
                setHomeStay(null);
                setLoi("");
                return;
            }

            try {
                setDangTai(true);
                setLoi("");

                const data = await layThongTinHomeStay(homeStayDangChon);

                setHomeStay(data);

            } catch (error) {
                console.error(error);
                setLoi("Không thể tải thông tin HomeStay!");
                setHomeStay(null);

            } finally {
                setDangTai(false);
            }
        };

        layDuLieu();

    }, [homeStayDangChon, dangTaiHomeStay]);


    if (dangTaiHomeStay || dangTai) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (loi) {
        return <Alert severity="error">{loi}</Alert>;
    }


    if (!homeStayDangChon) {
        return (
            <Alert severity="info">
                Bạn chưa có HomeStay được duyệt.
            </Alert>
        );
    }

    if (!homeStay) {
        return (
            <Alert severity="warning">
                Không tìm thấy thông tin HomeStay.
            </Alert>
        );
    }

    return (
        <Box sx={{ p: 3 }}>

            {/* Tiêu đề */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Hồ sơ HomeStay
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Quản lý thông tin cơ sở lưu trú của bạn.
                </Typography>
            </Box>

            {/* Thông tin cơ bản */}
            <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                    Thông tin cơ bản
                </Typography>

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography color="text.secondary">
                            Tên HomeStay
                        </Typography>

                        <Typography sx={{ fontWeight: 600 }}>
                            {homeStay.tenHomeStay}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography color="text.secondary">
                            Thể loại
                        </Typography>

                        <Typography sx={{ fontWeight: 600 }}>
                            {homeStay.theLoaiHomeStay}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography color="text.secondary">
                            Số điện thoại
                        </Typography>

                        <Typography sx={{ fontWeight: 600 }}>
                            {homeStay.soDienThoai}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography color="text.secondary">
                            Email
                        </Typography>

                        <Typography sx={{ fontWeight: 600 }}>
                            {homeStay.email}
                        </Typography>
                    </Grid>

                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography sx={{ fontWeight: 600 }}>
                    Mô tả
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                    {homeStay.moTa || "Chưa có mô tả"}
                </Typography>

            </Paper>

            {/* Địa chỉ */}
            <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                    Địa chỉ HomeStay
                </Typography>

                <Typography>
                    {homeStay.diaChi}
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 1 }}>
                    {homeStay.phuongXa}, {homeStay.tinhThanh}
                </Typography>

            </Paper>

            {/* Tiện ích */}
            <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Tiện ích
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {homeStay.tienIchHienThi?.length > 0
                        ? homeStay.tienIchHienThi.map((item, index) => (
                            <Chip key={index} label={item} />
                        ))
                        : "Chưa có tiện ích"}
                </Box>

            </Paper>

            {/* Dịch vụ */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Dịch vụ
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {homeStay.dichVuHienThi?.length > 0
                        ? homeStay.dichVuHienThi.map((item, index) => (
                            <Chip key={index} label={item} />
                        ))
                        : "Chưa có dịch vụ"}
                </Box>

            </Paper>

        </Box>
    );
}

export default HoSo;
