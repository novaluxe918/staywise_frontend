import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    InputBase,
    IconButton,
    Badge,
    Avatar,
    Typography,
    Chip,
    Tooltip,
    MenuItem,
    Divider,
    Menu
} from '@mui/material';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { DRAWER_WIDTH } from './SidebarAdmin';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { dangXuat } from '../../services/authService';
import { ChevronDown, LogOut, UserRound } from 'lucide-react';

function HeaderAdmin() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const moDropDown = Boolean(anchorEl);

    const { nguoiDung, dangXuat: xoaPhienDangNhap } = useAuth();

    const navigate = useNavigate();

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleCloseMenu();

        try {
            await dangXuat();
        } catch (err) {
            console.error("Lỗi đăng xuất", err);
        } finally {
            await xoaPhienDangNhap();
            navigate("/", { replace: true });
        }
    };

    const hoTen = nguoiDung?.hoTen?.replace(/\+/g, " ") || "Quản trị viên";

    const anhDaiDien = nguoiDung?.anhDaiDien || undefined;
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                zIndex: 1000,
                width: `calc(100% - ${DRAWER_WIDTH}px)`,
                ml: `${DRAWER_WIDTH}px`,
                bgcolor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid #eef2f6',
                color: '#1e293b',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', height: 72, px: { xs: 2, md: 3 } }}>
                {/* Search Bar */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: '#f1f5f9',
                        borderRadius: '24px',
                        px: 2,
                        py: 0.7,
                        width: { xs: 240, md: 380 },
                        transition: 'all 0.2s ease',
                        border: '1px solid transparent',
                        '&:hover, &:focus-within': {
                            bgcolor: '#fff',
                            border: '1px solid #cbd5e1',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        },
                    }}
                >
                    <SearchIcon sx={{ color: '#94a3b8', mr: 1, fontSize: 20 }} />
                    <InputBase
                        placeholder="Tìm kiếm homestay, người dùng, đánh giá..."
                        fullWidth
                        sx={{
                            fontSize: '0.85rem',
                            color: '#334155',
                            '& input::placeholder': { color: '#94a3b8', opacity: 1 },
                        }}
                    />
                </Box>

                {/* Right Section Tools & Profile */}
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                    {/* Status / Feature Chip */}
                    <Chip
                        icon={<AutoAwesomeRoundedIcon sx={{ fontSize: '15px !important', color: '#6366f1 !important' }} />}
                        label="Live Algorithm"
                        sx={{
                            bgcolor: '#eef2ff',
                            color: '#4f46e5',
                            fontWeight: 600,
                            fontSize: '0.78rem',
                            height: 32,
                            border: '1px solid #e0e7ff',
                            display: { xs: 'none', sm: 'inline-flex' },
                        }}
                    />

                    {/* Notifications */}
                    <Tooltip title="Thông báo">
                        <IconButton
                            size="medium"
                            sx={{
                                bgcolor: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                '&:hover': { bgcolor: '#f1f5f9' },
                            }}
                        >
                            <Badge
                                variant="dot"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        bgcolor: '#ef4444',
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                    },
                                }}
                            >
                                <NotificationsNoneRoundedIcon fontSize="small" sx={{ color: '#64748b' }} />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    {/* Settings / Filters */}
                    <Tooltip title="Cài đặt nhanh">
                        <IconButton
                            size="medium"
                            sx={{
                                bgcolor: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                '&:hover': { bgcolor: '#f1f5f9' },
                            }}
                        >
                            <TuneRoundedIcon fontSize="small" sx={{ color: '#64748b' }} />
                        </IconButton>
                    </Tooltip>


                    {/* User Account Info */}
                    <Stack
                        direction="row"
                        spacing={1.2}
                        onClick={handleOpenMenu}
                        sx={{
                            alignItems: "center",
                            pl: 1,
                            cursor: "pointer",
                            py: 0.5,
                            px: 1,
                            borderRadius: "12px",
                            transition: "0.2s",
                            "&:hover": { bgcolor: "#f8fafc" },
                        }}
                    >
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            variant="dot"
                            sx={{
                                "& .MuiBadge-badge": {
                                    bgcolor: "#10b981",
                                    border: "2px solid #fff",
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                },
                            }}
                        >
                            <Avatar
                                alt={hoTen}
                                src={anhDaiDien}
                                sx={{
                                    width: 38,
                                    height: 38,
                                    bgcolor: "#dcfce7",
                                    color: "#15803d",
                                    fontWeight: 700,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                }}
                            >
                                {hoTen.charAt(0).toUpperCase()}
                            </Avatar>
                        </Badge>

                        <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "left" }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 700,
                                    color: "#1e293b",
                                    lineHeight: 1.2,
                                }}
                            >
                                {hoTen}
                            </Typography>

                            <Typography
                                variant="caption"
                                sx={{
                                    color: "#64748b",
                                    fontSize: "0.72rem",
                                    fontWeight: 500,
                                }}
                            >
                                Super Admin
                            </Typography>
                        </Box>

                        <ChevronDown
                            size={16}
                            style={{
                                transform: moDropDown ? "rotate(180deg)" : "none",
                                transition: "0.2s",
                            }}
                        />
                    </Stack>

                    {/* Dropdown tài khoản */}
                    <Menu
                        anchorEl={anchorEl}
                        open={moDropDown}
                        onClose={handleCloseMenu}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        slotProps={{
                            paper: {
                                sx: {
                                    mt: 1.5,
                                    width: 250,
                                    borderRadius: "14px",
                                    border: "1px solid #f1f5f9",
                                    boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
                                    overflow: "hidden",
                                },
                            },
                        }}
                    >
                        {/* Thông tin tài khoản */}
                        <Box sx={{ px: 2, py: 1.8 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                                {hoTen}
                            </Typography>

                            <Typography sx={{ color: "#94a3b8", fontSize: 12 }}>
                                {nguoiDung?.email}
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Cập nhật thông tin */}
                        <MenuItem
                            onClick={() => {
                                handleCloseMenu();
                                navigate("/cap-nhat-thong-tin");
                            }}
                            sx={{ py: 1.3, gap: 1.5, fontSize: 13 }}
                        >
                            <UserRound size={18} color="#64748b" />
                            Cập nhật thông tin
                        </MenuItem>

                        <Divider />

                        {/* Đăng xuất */}
                        <MenuItem
                            onClick={handleLogout}
                            sx={{
                                py: 1.3,
                                gap: 1.5,
                                fontSize: 13,
                                color: "#dc2626",
                                "&:hover": {
                                    bgcolor: "#fef2f2",
                                },
                            }}
                        >
                            <LogOut size={18} />
                            Đăng xuất
                        </MenuItem>
                    </Menu>

                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default HeaderAdmin;