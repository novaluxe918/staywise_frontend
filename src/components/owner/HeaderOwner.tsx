
import {
  Search,
  Bell,
  ChevronDown,
  Building2,
  UserRound,
  Settings,
  LogOut,
  Home,
  CheckCircle,
  AlertCircle,
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
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dangXuat as dangXuatAPI } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { getThongTinHoSo, layThongTinNguoiDung } from "../../services/nguoiDungService";
import { toast } from "../../utils/toast";
import type { NguoiDungResponse } from "../../types/nguoiDung";

export default function HeaderOwner() {
  const [thongtinXacMinh, setThongTinXacMinh] = useState<NguoiDungResponse | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorThongBao, setAnchorThongBao] =
    useState<HTMLElement | null>(null);
const openThongBao = Boolean(anchorThongBao);
  const moDropDown = Boolean(anchorEl);
  const trangThai = thongtinXacMinh?.trangThaiXacMinh;
  const coThongBao =
    trangThai === "DA_XAC_MINH" || trangThai === "TU_CHOI";

  useEffect(() => {
    const fetchThongTinXacMinh = async () => {
      try {
        const data = await layThongTinNguoiDung();
        setThongTinXacMinh(data);
      } catch (error) {
        console.error("Lỗi lấy thông tin xác minh:", error);
      }
    };

    fetchThongTinXacMinh();

    const interval = setInterval(fetchThongTinXacMinh, 30000);

    return () => clearInterval(interval);
  }, []);

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

  const handleDangKyHomeStay = async () => {
    handleCloseMenu();

    try {
      const hoSo = await getThongTinHoSo();

      if (hoSo.trangThaiXacMinh === "DA_XAC_MINH") {
        navigate("/dang-ky-homestay");
        return;
      }

      if (hoSo.trangThaiXacMinh === "CHUA_XAC_MINH") {
        toast.warning("Bạn chưa có hồ sơ xác minh!");
      } else if (hoSo.trangThaiXacMinh === "CHO_XAC_MINH") {
        toast.info("Hồ sơ của bạn đang chờ quản trị viên xét duyệt!");
      } else if (hoSo.trangThaiXacMinh === "TU_CHOI") {
        toast.error(
          hoSo.lyDoTuChoiXacMinh
            ? `Hồ sơ bị từ chối: ${hoSo.lyDoTuChoiXacMinh}`
            : "Hồ sơ của bạn đã bị từ chối!"
        );
      }

    } catch (error) {
      toast.error("Không thể kiểm tra hồ sơ. Vui lòng thử lại!");
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
          onClick={(event) => setAnchorThongBao(event.currentTarget)}
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
            badgeContent={coThongBao ? 1 : 0}
            color="error"
            invisible={!coThongBao}
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

        <Menu
          anchorEl={anchorEl}
          open={openThongBao}
          onClose={() => setAnchorThongBao(null)}
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
                width: 340,
                maxWidth: "calc(100vw - 32px)",
                mt: 1,
                borderRadius: 3,
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              },
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
              Thông báo
            </Typography>
          </Box>

          <Divider />

          {trangThai === "DA_XAC_MINH" && (
            <MenuItem
              sx={{
                whiteSpace: "normal",
                py: 2,
                alignItems: "flex-start",
              }}
            >
              <Stack direction="row" spacing={1.5}>
                <CheckCircle color="#16a34a" size={22} />

                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 13 }}>
                    Xác minh thành công
                  </Typography>

                  <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                    Hồ sơ của bạn đã được Admin xét duyệt thành công.
                    Bạn có thể tiếp tục sử dụng các chức năng dành cho chủ HomeStay.
                  </Typography>
                </Box>
              </Stack>
            </MenuItem>
          )}

          {trangThai === "TU_CHOI" && (
            <MenuItem
              sx={{
                whiteSpace: "normal",
                py: 2,
                alignItems: "flex-start",
              }}
            >
              <Stack direction="row" spacing={1.5}>
                <AlertCircle color="#dc2626" size={22} />

                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 13 }}>
                    Hồ sơ chưa được duyệt
                  </Typography>

                  <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                    {thongtinXacMinh?.lyDoTuChoiXacMinh ||
                      "Vui lòng kiểm tra lại hồ sơ của bạn."}
                  </Typography>
                </Box>
              </Stack>
            </MenuItem>
          )}

          {trangThai === "CHUA_XAC_MINH" && (
            <MenuItem>
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                Hồ sơ của bạn đang chờ Admin xét duyệt.
              </Typography>
            </MenuItem>
          )}
        </Menu>
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
              handleDangKyHomeStay();
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
