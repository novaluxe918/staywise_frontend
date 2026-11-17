import React, { useEffect } from 'react';
import {
    Card,
    CardContent,
    Avatar,
    Typography,
    Box,
    Chip,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Badge,
    IconButton,
    Button
} from '@mui/material';
import {
    CameraAlt as CameraAltIcon,
    Verified as VerifiedIcon,
    PersonOutlined as PersonOutlineIcon,
    BadgeOutlined as BadgeOutlinedIcon,
    LockOutlined as LockOutlinedIcon,
    AccountBalanceOutlined as AccountBalanceIcon,
    NotificationsNoneOutlined as NotificationsIcon,
    ChevronRight as ChevronRightIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { useUploadAnh } from '../../../hooks/useUploadAnh';
import { useAuth } from '../../../context/AuthContext';
import { toast } from '../../../utils/toast';
import { capNhatAnhDaiDien, layThongTinNguoiDung } from '../../../services/nguoiDungService';

interface ProfileSidebarProps {
    activeTab: string;
    onTabChange: (tabKey: string) => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab, onTabChange }) => {


    const menuItems = [
        { key: 'personal', label: 'Thông tin cá nhân & Liên hệ', icon: <PersonOutlineIcon fontSize="small" /> },
        { key: 'legal', label: 'Giấy tờ pháp lý & Kinh doanh', icon: <BadgeOutlinedIcon fontSize="small" /> },
        { key: 'security', label: 'Bảo mật & Đăng nhập', icon: <LockOutlinedIcon fontSize="small" /> },
        { key: 'bank', label: 'Tài khoản ngân hàng nhận tiền', icon: <AccountBalanceIcon fontSize="small" /> },
        { key: 'notifications', label: 'Cài đặt thông báo vận hành', icon: <NotificationsIcon fontSize="small" /> }
    ];

    const { nguoiDung, capNhatNguoiDung } = useAuth();
    const {
        fileAnh,
        previewAnh,
        handleChonAnh,
        xoaAnh
    } = useUploadAnh();

    useEffect(() => {
        const layThongTin = async () => {
            try {
                const data = await layThongTinNguoiDung();
                
                capNhatNguoiDung({
                    anhDaiDien: data.anhDaiDien
                });

            } catch (error) {
                console.error("Lỗi lấy thông tin người dùng:", error);
            }
        };

        layThongTin();
    }, []);

    const handleLuuAnh = async () => {
        if (!fileAnh) {
            toast.warning("Vui lòng chọn ảnh đại diện");
            return;
        }

        try {
            await capNhatAnhDaiDien(fileAnh);

            const data = await layThongTinNguoiDung();

            capNhatNguoiDung({
                anhDaiDien: data.anhDaiDien
            });

            toast.success("Cập nhật ảnh đại diện thành công!");

            xoaAnh();

        } catch (error) {
            console.error(error);
            toast.error("Cập nhật ảnh đại diện thất bại!");
        }
    };

    return (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <CardContent sx={{ textAlign: 'center', pt: 4, pb: 2 }}>
                {/* Avatar + Badge upload */}
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>

                    <Avatar
                        src={
                            previewAnh ||
                            nguoiDung?.anhDaiDien ||
                            ""
                        }
                        sx={{
                            width: 96,
                            height: 96,
                            mx: 'auto',
                            border: '3px solid #e0f2fe'
                        }}
                    />
                    <IconButton
                        component="label"
                        size="small"
                        sx={{
                            position: 'absolute',
                            bottom: 2,
                            right: 2,
                            bgcolor: 'primary.main',
                            color: '#fff',
                            '&:hover': { bgcolor: 'primary.dark' }
                        }}
                    >


                        <CameraAltIcon fontSize="small" />
                        <input hidden type="file" accept="image/*" onChange={handleChonAnh} />
                    </IconButton>
                    {fileAnh && (
                        <IconButton
                            size="small"
                            aria-label="Xóa ảnh đại diện"
                            onClick={() => xoaAnh()}
                            sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'background.paper' }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    )}

                </Box>

                {fileAnh && (
                    <Box sx={{ mb: 2 }}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleLuuAnh}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600
                            }}
                        >
                            Lưu ảnh đại diện
                        </Button>
                    </Box>
                )}



                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{nguoiDung?.hoTen?.replace(/\+/g, " ").trim() || "Người dùng"}</Typography>
                    <VerifiedIcon color="primary" sx={{ fontSize: 18 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    Chủ cơ sở vận hành homestay
                </Typography>



            </CardContent>

            <Divider />

            {/* Navigation tabs */}
            <List sx={{ px: 1, py: 1.5 }}>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.key}
                        selected={activeTab === item.key}
                        onClick={() => onTabChange(item.key)}
                        sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            '&.Mui-selected': { bgcolor: 'primary.50', color: 'primary.main', fontWeight: 600 }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 36, color: activeTab === item.key ? 'primary.main' : 'inherit' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            sx={{ '& .MuiListItemText-primary': { fontSize: '0.875rem' } }}
                        />
                        <ChevronRightIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                    </ListItemButton>
                ))}
            </List>
        </Card>
    );
};