import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Chip,
} from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { ConciergeBell, HandPlatter, LifeBuoy } from 'lucide-react';
import logo from "../../assets/logo.png";

export const DRAWER_WIDTH = 260;


const menuItems = [
    {
        path: '/admin/tong-quan',
        text: 'Tổng quan',
        icon: <DashboardRoundedIcon fontSize="small" />
    },
    {
        path: '/admin/users',
        text: 'Quản lý tài khoản User',
        icon: <PeopleAltRoundedIcon fontSize="small" />
    },
    {
        path: '/admin/chu-homestay',
        text: 'Quản lý Chủ HomeStay',
        icon: <VerifiedUserRoundedIcon fontSize="small" />
    },
    {
        path: '/admin/homestays',
        text: 'Quản lý HomeStay',
        icon: <HomeWorkRoundedIcon fontSize="small" />
    },

    {
        path: '/admin/dich-vu',
        text: 'Quản lý Dịch vụ',
        icon: <HandPlatter size={18} />
    },
    {
        path: '/admin/tien-ich',
        text: 'Thể loại tiện ích',
        icon: <ConciergeBell size={18} />
    },

    {
        path: '/admin/tien-ichcs',
        text: 'Quản lý Tiện Ích',
        icon: <LifeBuoy size={18} />
    },

    {
        path: '/admin/danh-gia',
        text: 'Quản lý Đánh giá',
        icon: <RateReviewRoundedIcon fontSize="small" />
    }
];

function SidebarAdmin() {
    const location = useLocation();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box',
                    bgcolor: '#111827',
                    color: '#94a3b8',
                    borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                },
            }}
        >
            {/* Logo & Brand Header */}
            <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 45,
                            height: 45,
                            flexShrink: 0,
                            borderRadius: "50%",
                            overflow: "hidden",
                            bgcolor: "#fff",
                            border: "1px solid #00b894",
                        }}
                    >
                        <Box
                            component="img"
                            src={logo}
                            alt="StayWise Logo"
                            sx={{
                                width: 45,
                                height: 45,
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>
                        Stay<span style={{ color: '#00b894' }}>wise</span>
                    </Typography>
                </Box>
                <Chip
                    label="ADMIN"
                    size="small"
                    sx={{
                        bgcolor: '#00b894',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.68rem',
                        height: 22,
                        borderRadius: '6px',
                    }}
                />
            </Box>

            {/* Menu Header Label */}
            <Box sx={{ px: 2.5, mt: 2, mb: 1 }}>
                <Typography
                    variant="caption"
                    sx={{
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#64748b',
                    }}
                >
                    Quản trị hệ thống
                </Typography>
            </Box>

            {/* Menu Items */}
            <List sx={{ px: 1.5 }}>
                {menuItems.map((item) => {
                    // Kiểm tra route hiện tại để kích hoạt active
                    const isActive = location.pathname === item.path;

                    return (
                        <ListItem key={item.path} disablePadding sx={{ mb: 0.8 }}>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                sx={{
                                    borderRadius: '10px',
                                    px: 2,
                                    py: 1.2,
                                    bgcolor: isActive ? 'rgba(0, 184, 148, 0.15)' : 'transparent',
                                    color: isActive ? '#00b894' : '#94a3b8',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        bgcolor: isActive ? 'rgba(0, 184, 148, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                        color: '#fff',
                                        '& .MuiListItemIcon-root': {
                                            color: isActive ? '#00b894' : '#fff',
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 38,
                                        color: isActive ? '#00b894' : '#64748b',
                                        transition: 'color 0.2s',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            sx={{
                                                fontSize: '0.88rem',
                                                fontWeight: isActive ? 600 : 500,
                                                color: 'inherit',
                                            }}
                                        >
                                            {item.text}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}

export default SidebarAdmin;