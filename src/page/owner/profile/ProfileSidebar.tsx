import React from 'react';
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
    IconButton
} from '@mui/material';
import {
    CameraAlt as CameraAltIcon,
    Verified as VerifiedIcon,
    PersonOutlined as PersonOutlineIcon,
    BadgeOutlined as BadgeOutlinedIcon,
    LockOutlined as LockOutlinedIcon,
    AccountBalanceOutlined as AccountBalanceIcon,
    NotificationsNoneOutlined as NotificationsIcon,
    ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

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

    return (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <CardContent sx={{ textAlign: 'center', pt: 4, pb: 2 }}>
                {/* Avatar + Badge upload */}
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                    <Avatar
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
                        sx={{ width: 96, height: 96, mx: 'auto', border: '3px solid #e0f2fe' }}
                    />
                    <IconButton
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
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Hoàng Minh Trí</Typography>
                    <VerifiedIcon color="primary" sx={{ fontSize: 18 }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    Chủ cơ sở vận hành homestay
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mb: 2.5 }}>
                    <Chip label="Chủ HomeStay Chính Thức" size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
                    <Chip label="Đã xác thực 100%" size="small" color="success" sx={{ fontWeight: 600 }} />
                </Box>

                {/* Tóm tắt metadata */}
                <Box sx={{ bgcolor: 'grey.50', p: 1.5, borderRadius: 2, textAlign: 'left', mb: 2, fontSize: '0.85rem' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                        <Typography variant="caption" color="text.secondary">Mã chủ nhà:</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>#HS-HOST-1829</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                        <Typography variant="caption" color="text.secondary">Trạng thái:</Typography>
                        <Typography variant="caption" color="success.main" sx={{ fontWeight: 600 }}>
                            ● Đang hoạt động
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" color="text.secondary">Cơ sở trực thuộc:</Typography>
                        <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600 }}>Pine Hill Serenity</Typography>
                    </Box>
                </Box>
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