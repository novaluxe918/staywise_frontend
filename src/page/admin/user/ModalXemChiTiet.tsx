
import {
    Avatar,
    Box,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import {
    Mail,
    Phone,
    CalendarDays,
    UserRound
} from "lucide-react";

import type { NguoiDungResponse } from "../../../types/nguoiDung";

interface Props {
    open: boolean;
    onClose: () => void;
    user: NguoiDungResponse | null;
}

function ModalXemChiTiet({ open, onClose, user }: Props) {

    if (!user) return null;

    const formatDate = (date: string | null) => {
        if (!date) return "Chưa cập nhật";

        return new Date(date).toLocaleDateString("vi-VN");
    };

    const getStatus = (status: string) => {
        switch (status) {
            case "DANG_HOAT_DONG":
                return { label: "Đang hoạt động", color: "success" as const };
            case "DA_KHOA":
                return { label: "Đã khóa", color: "error" as const };
            default:
                return { label: status, color: "default" as const };
        }
    };

    const status = getStatus(user.trangThaiUser);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Chi tiết người dùng
            </DialogTitle>

            <DialogContent dividers>
                {/* Thông tin tổng quan */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 2,
                        mb: 3
                    }}
                >
                    <Avatar
                        src={user.anhDaiDien || undefined}
                        sx={{ width: 64, height: 64 }}
                    >
                        {user.hoTen?.charAt(0)}
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
                            {user.hoTen}
                        </Typography>

                  

                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                            <Chip label={user.vaiTro} size="small" />
                            <Chip
                                label={status.label}
                                color={status.color}
                                size="small"
                            />
                        </Stack>
                    </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Typography sx={{ fontWeight: 700, mb: 2 }}>
                    Thông tin cá nhân
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={6}>
                        <InfoItem
                            icon={<UserRound size={18} />}
                            label="Họ và tên"
                            value={user.hoTen}
                        />
                    </Grid>

                    <Grid size={6}>
                        <InfoItem
                            icon={<Phone size={18} />}
                            label="Số điện thoại"
                            value={user.soDienThoai || "Chưa cập nhật"}
                        />
                    </Grid>

                    <Grid size={12}>
                        <InfoItem
                            icon={<Mail size={18} />}
                            label="Email"
                            value={user.email}
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography sx={{ fontWeight: 700, mb: 2 }}>
                    Thông tin tài khoản
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={6}>
                        <InfoItem
                            label="Vai trò"
                            value={user.vaiTro}
                        />
                    </Grid>

                    <Grid size={6}>
                        <InfoItem
                            label="Trạng thái"
                            value={status.label}
                        />
                    </Grid>

                    <Grid size={12}>
                        <InfoItem
                            icon={<CalendarDays size={18} />}
                            label="Ngày tạo tài khoản"
                            value={formatDate(user.ngayTao)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button
                    variant="outlined"
                    onClick={onClose}
                >
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
}

interface InfoItemProps {
    icon?: React.ReactNode;
    label: string;
    value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
    return (
        <Stack spacing={0.5}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                {icon}
                <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                    {label}
                </Typography>
            </Stack>

            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                {value}
            </Typography>
        </Stack>
    );
}

export default ModalXemChiTiet;
