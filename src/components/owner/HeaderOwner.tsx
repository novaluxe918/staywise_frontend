import {
  Search,
  Bell,
  ChevronDown,
  Building2,
  UserRound,
  LogOut,
  Home,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dangXuat as dangXuatAPI } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import {
  getThongTinHoSo,
  layThongTinNguoiDung,
} from "../../services/nguoiDungService";
import { toast } from "../../utils/toast";
import type { NguoiDungResponse } from "../../types/nguoiDung";
import { useHomeStay } from "../../context/HomeStayContext";

export default function HeaderOwner() {
  const {
    danhSachHomeStay,
    homeStayDangChon,
    setHomeStayDangChon,
    dangTaiHomeStay,
  } = useHomeStay();

  const [thongtinXacMinh, setThongTinXacMinh] =
    useState<NguoiDungResponse | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorThongBao, setAnchorThongBao] = useState<null | HTMLElement>(
    null
  );

  const openThongBao = Boolean(anchorThongBao);
  const moDropDown = Boolean(anchorEl);
  const trangThai = thongtinXacMinh?.trangThaiXacMinh;
  const coThongBao = trangThai === "DA_XAC_MINH" || trangThai === "TU_CHOI";

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

  const hoTen = nguoiDung?.hoTen?.replace(/\+/g, " ") || "Chủ HomeStay";
  const anhDaiDien = nguoiDung?.anhDaiDien || undefined;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        left: { xs: 0, md: "288px" },
        width: { xs: "100%", md: "calc(100% - 288px)" },
        bgcolor: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Toolbar
        sx={{
          height: 76,
          px: { xs: 2, md: 3.5 },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* BÊN TRÁI: Chọn cơ sở & Tìm kiếm */}
        <Stack
          direction="row"
          spacing={2.5}
          sx={{ flex: 1, minWidth: 0, alignItems: "center" }}
        >
          {/* Card chọn cơ sở tinh gọn */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 1.5,
              px: 1.5,
              py: 0.75,
              borderRadius: "14px",
              bgcolor: "#f8fafc",
              border: "1px solid #e2e8f0",
              minWidth: 240,
              maxWidth: 300,
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#86efac",
                bgcolor: "#ffffff",
                boxShadow: "0 4px 12px rgba(22, 163, 74, 0.06)",
              },
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                color: "#15803d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Building2 size={19} />
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#64748b",
                  letterSpacing: 0.8,
                  lineHeight: 1.2,
                  mb: 0.2,
                }}
              >
                CƠ SỞ HIỆN TẠI
              </Typography>

              <Select
                variant="standard"
                disableUnderline
                fullWidth
                value={homeStayDangChon}
                displayEmpty
                disabled={dangTaiHomeStay || danhSachHomeStay.length === 0}
                onChange={(event: SelectChangeEvent<number | "">) => {
                  setHomeStayDangChon(event.target.value as number | "");
                }}
                IconComponent={(props) => (
                  <ChevronDown
                    size={16}
                    {...props}
                    style={{ color: "#64748b", right: 0 }}
                  />
                )}
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#0f172a",
                  "& .MuiSelect-select": {
                    py: 0,
                    pr: "24px !important",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                }}
              >
                {danhSachHomeStay.length === 0 && (
                  <MenuItem value="" disabled sx={{ fontSize: 13 }}>
                    {dangTaiHomeStay
                      ? "Đang tải HomeStay..."
                      : "Chưa có HomeStay được duyệt"}
                  </MenuItem>
                )}

                {danhSachHomeStay.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                    sx={{ fontSize: 14, fontWeight: 500 }}
                  >
                    {item.tenHomeStay}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          <TextField
            placeholder="Tìm kiếm đặt phòng, khách hàng..."
            size="small"
            fullWidth
            sx={{
              maxWidth: 400,
              display: { xs: "none", lg: "flex" },
              "& .MuiOutlinedInput-root": {
                height: 44,
                borderRadius: "14px",
                bgcolor: "#f8fafc",
                fontSize: 13.5,
                transition: "all 0.2s ease",
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover": {
                  bgcolor: "#f1f5f9",
                },
                "&.Mui-focused": {
                  bgcolor: "#ffffff",
                  boxShadow: "0 4px 14px rgba(22, 163, 74, 0.08)",
                  "& fieldset": {
                    borderColor: "#22c55e",
                    borderWidth: "1.5px",
                  },
                },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color="#94a3b8" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>

        {/* BÊN PHẢI: Thông báo & Tài khoản */}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: "center" }}
        >
          {/* Nút thông báo */}
          <IconButton
            onClick={(event) => setAnchorThongBao(event.currentTarget)}
            sx={{
              width: 44,
              height: 44,
              bgcolor: openThongBao ? "#ecfdf5" : "#f8fafc",
              border: "1px solid",
              borderColor: openThongBao ? "#bbf7d0" : "#e2e8f0",
              borderRadius: "12px",
              color: openThongBao ? "#15803d" : "#475569",
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: "#ecfdf5",
                borderColor: "#bbf7d0",
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
                  fontSize: 10,
                  fontWeight: 700,
                  minWidth: 17,
                  height: 17,
                  border: "2px solid #fff",
                },
              }}
            >
              <Bell size={20} />
            </Badge>
          </IconButton>

          {/* Popover Menu Thông báo (Đã sửa anchorEl={anchorThongBao}) */}
          <Menu
            anchorEl={anchorThongBao}
            open={openThongBao}
            onClose={() => setAnchorThongBao(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
              paper: {
                sx: {
                  width: 360,
                  maxWidth: "calc(100vw - 32px)",
                  mt: 1.5,
                  borderRadius: "16px",
                  border: "1px solid #f1f5f9",
                  boxShadow: "0 12px 36px rgba(15, 23, 42, 0.1)",
                },
              },
            }}
          >
            <Box
              sx={{
                px: 2.5,
                py: 1.8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>
                Thông báo
              </Typography>
              {coThongBao && (
                <Box
                  sx={{
                    px: 1,
                    py: 0.2,
                    borderRadius: "6px",
                    bgcolor: "#fef2f2",
                    color: "#dc2626",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  1 mới
                </Box>
              )}
            </Box>

            <Divider />

            {trangThai === "DA_XAC_MINH" && (
              <MenuItem
                onClick={() => setAnchorThongBao(null)}
                sx={{ whiteSpace: "normal", py: 2, px: 2.5, alignItems: "flex-start" }}
              >
                <Stack direction="row" spacing={1.5}>
                  <Box
                    sx={{
                      p: 0.8,
                      borderRadius: "10px",
                      bgcolor: "#dcfce7",
                      color: "#16a34a",
                      display: "flex",
                    }}
                  >
                    <CheckCircle size={20} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: "#0f172a" }}>
                      Xác minh thành công
                    </Typography>
                    <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: 0.3, lineHeight: 1.5 }}>
                      Hồ sơ của bạn đã được Admin xét duyệt. Bạn có thể đăng ký và quản lý HomeStay ngay bây giờ.
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            )}

            {trangThai === "TU_CHOI" && (
              <MenuItem
                onClick={() => setAnchorThongBao(null)}
                sx={{ whiteSpace: "normal", py: 2, px: 2.5, alignItems: "flex-start" }}
              >
                <Stack direction="row" spacing={1.5}>
                  <Box
                    sx={{
                      p: 0.8,
                      borderRadius: "10px",
                      bgcolor: "#fee2e2",
                      color: "#dc2626",
                      display: "flex",
                    }}
                  >
                    <AlertCircle size={20} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: "#0f172a" }}>
                      Hồ sơ chưa được duyệt
                    </Typography>
                    <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: 0.3, lineHeight: 1.5 }}>
                      {thongtinXacMinh?.lyDoTuChoiXacMinh ||
                        "Vui lòng kiểm tra và cập nhật lại thông tin hồ sơ của bạn."}
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            )}

            {(trangThai === "CHUA_XAC_MINH" || trangThai === "CHO_XAC_MINH") && (
              <MenuItem
                onClick={() => setAnchorThongBao(null)}
                sx={{ whiteSpace: "normal", py: 2, px: 2.5, alignItems: "flex-start" }}
              >
                <Stack direction="row" spacing={1.5}>
                  <Box
                    sx={{
                      p: 0.8,
                      borderRadius: "10px",
                      bgcolor: "#fef3c7",
                      color: "#d97706",
                      display: "flex",
                    }}
                  >
                    <Clock size={20} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: "#0f172a" }}>
                      Đang chờ xét duyệt
                    </Typography>
                    <Typography sx={{ fontSize: 12.5, color: "text.secondary", mt: 0.3, lineHeight: 1.5 }}>
                      Hồ sơ chủ HomeStay của bạn đang được quản trị viên kiểm tra.
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            )}
          </Menu>

          <Divider orientation="vertical" flexItem sx={{ my: 2, borderColor: "#e2e8f0" }} />

          {/* Nút Tài khoản */}
          <Button
            onClick={handleOpenMenu}
            disableRipple
            endIcon={
              <ChevronDown
                size={16}
                style={{
                  color: "#64748b",
                  transform: moDropDown ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s ease",
                }}
              />
            }
            sx={{
              display: "flex",
              gap: 1.2,
              px: 1.2,
              py: 0.7,
              borderRadius: "14px",
              border: "1px solid",
              borderColor: moDropDown ? "#bbf7d0" : "transparent",
              bgcolor: moDropDown ? "#f0fdf4" : "transparent",
              color: "#0f172a",
              textTransform: "none",
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: "#f8fafc",
                borderColor: "#e2e8f0",
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
                border: "2px solid #ffffff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              {hoTen.charAt(0).toUpperCase()}
            </Avatar>

            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                textAlign: "left",
                minWidth: 90,
                maxWidth: 150,
              }}
            >
              <Typography
                noWrap
                sx={{
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: "#0f172a",
                  lineHeight: 1.3,
                }}
              >
                {hoTen}
              </Typography>

              <Typography
                sx={{
                  fontSize: 11.5,
                  color: "#64748b",
                  fontWeight: 500,
                }}
              >
                Chủ HomeStay
              </Typography>
            </Box>
          </Button>

          {/* Dropdown Menu Tài khoản */}
          <Menu
            anchorEl={anchorEl}
            open={moDropDown}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1.5,
                  width: 240,
                  borderRadius: "16px",
                  border: "1px solid #f1f5f9",
                  boxShadow: "0 12px 36px rgba(15, 23, 42, 0.1)",
                  p: 0.8,
                },
              },
            }}
          >
            <Box sx={{ px: 1.5, py: 1.2 }}>
              <Typography noWrap sx={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>
                {hoTen}
              </Typography>
              <Typography sx={{ color: "#64748b", fontSize: 12 }}>
                Tài khoản chủ HomeStay
              </Typography>
            </Box>

            <Divider sx={{ my: 0.8 }} />

            <MenuItem
              onClick={handleDangKyHomeStay}
              sx={{
                py: 1.2,
                px: 1.5,
                borderRadius: "10px",
                gap: 1.5,
                fontSize: 13.5,
                fontWeight: 500,
                "&:hover": { bgcolor: "#f0fdf4", color: "#15803d" },
              }}
            >
              <Home size={18} />
              Đăng ký HomeStay
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleCloseMenu();
                navigate("/cap-nhat-thong-tin");
              }}
              sx={{
                py: 1.2,
                px: 1.5,
                borderRadius: "10px",
                gap: 1.5,
                fontSize: 13.5,
                fontWeight: 500,
                "&:hover": { bgcolor: "#f8fafc" },
              }}
            >
              <UserRound size={18} />
              Cập nhật thông tin
            </MenuItem>

            <Divider sx={{ my: 0.8 }} />

            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 1.2,
                px: 1.5,
                borderRadius: "10px",
                gap: 1.5,
                fontSize: 13.5,
                fontWeight: 600,
                color: "#dc2626",
                "&:hover": { bgcolor: "#fef2f2" },
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