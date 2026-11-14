
import {
  Search,
  Bell,
  ChevronDown,
  Building2,
  UserRound,
  Settings,
  LogOut,
  Home,
} from "lucide-react";

import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dangXuat as dangXuatAPI } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function HeaderOwner() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const moDropDown = Boolean(anchorEl);

  const {
    nguoiDung,
    dangXuat: xoaPhienDangNhap,
  } = useAuth();

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
      await dangXuatAPI();
    } catch (err) {
      console.error("Lỗi đăng xuất", err);
    } finally {
      xoaPhienDangNhap();
      navigate("/", { replace: true });
    }
  };

  const hoTen =
    nguoiDung?.hoTen?.replace(/\+/g, " ") || "Chủ HomeStay";

  const anhDaiDien = nguoiDung?.anhDaiDien || undefined;

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: { xs: 0, md: "288px" },
        right: 0,
        height: "72px",
        zIndex: 40,
        bgcolor: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #edf0f2",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 3 },
        gap: 2,
      }}
    >
      {/* BÊN TRÁI */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2.5,
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* Chọn cơ sở */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1,
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            bgcolor: "#fafcfb",
            minWidth: 220,
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              bgcolor: "#dcfce7",
              color: "#15803d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Building2 size={20} />
          </Box>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 700,
                color: "#9ca3af",
                letterSpacing: 0.7,
              }}
            >
              CƠ SỞ HIỆN TẠI
            </Typography>

            <select
              className="w-full cursor-pointer truncate bg-transparent text-sm font-semibold text-gray-800 outline-none"
            >
              <option value="HS1029">
                Pine Hill Serenity Villa
              </option>
              <option value="HS2041">
                Cloud Peak Bungalow
              </option>
            </select>
          </Box>

          <ChevronDown size={16} className="text-gray-400" />
        </Box>

        {/* Tìm kiếm */}
        <TextField
          placeholder="Tìm kiếm đặt phòng, khách hàng..."
          size="small"
          fullWidth
          sx={{
            maxWidth: 430,
            display: { xs: "none", lg: "flex" },
            "& .MuiOutlinedInput-root": {
              height: 42,
              borderRadius: "12px",
              bgcolor: "#f8fafc",
              fontSize: 13,
              "& fieldset": {
                borderColor: "#f1f5f9",
              },
              "&:hover fieldset": {
                borderColor: "#bbf7d0",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#16a34a",
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} color="#9ca3af" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* BÊN PHẢI */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {/* Thông báo */}
        <IconButton
          sx={{
            width: 42,
            height: 42,
            bgcolor: "#f8fafc",
            borderRadius: "12px",
            color: "#475569",
            "&:hover": {
              bgcolor: "#ecfdf5",
              color: "#15803d",
            },
          }}
        >
          <Badge
            badgeContent={3}
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: 9,
                minWidth: 16,
                height: 16,
              },
            }}
          >
            <Bell size={20} />
          </Badge>
        </IconButton>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 0.5, my: 1.5 }}
        />

        {/* Tài khoản */}
        <Button
          onClick={handleOpenMenu}
          disableRipple
          endIcon={
            <ChevronDown
              size={17}
              style={{
                transform: moDropDown ? "rotate(180deg)" : "none",
                transition: "0.2s",
              }}
            />
          }
          sx={{
            display: "flex",
            gap: 1.2,
            px: 1.2,
            py: 0.8,
            borderRadius: "12px",
            color: "#1f2937",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#f8fafc",
            },
          }}
        >
          <Avatar
            src={anhDaiDien}
            alt={hoTen}
            sx={{
              width: 38,
              height: 38,
              bgcolor: "#dcfce7",
              color: "#15803d",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            {hoTen.charAt(0).toUpperCase()}
          </Avatar>

          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              textAlign: "left",
              minWidth: 90,
              maxWidth: 160,
            }}
          >
            <Typography
              noWrap
              sx={{
                fontSize: 13,
                fontWeight: 700,
                color: "#1f2937",
              }}
            >
              {hoTen}
            </Typography>

            <Typography
              sx={{
                fontSize: 11,
                color: "#94a3b8",
                fontWeight: 500,
              }}
            >
              Chủ HomeStay
            </Typography>
          </Box>
        </Button>

        {/* Dropdown MUI */}
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
              Tài khoản chủ HomeStay
            </Typography>
          </Box>

          <Divider />

          <MenuItem
            onClick={() => {
              handleCloseMenu();
              navigate("/dang-ky-homestay");
            }}
            sx={{ py: 1.3, gap: 1.5, fontSize: 13 }}
          >
            <Home size={18} color="#64748b" />
            Đăng ký HomeStay
          </MenuItem>

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
      </Box>
    </Box>
  );
}
