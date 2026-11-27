
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AppBar, Avatar, Box, Button, Container, Divider, Drawer,
  IconButton, List, ListItem, ListItemButton, ListItemText,
  Menu, MenuItem, Stack, Toolbar, Tooltip, Typography, alpha,
} from "@mui/material";
import {
  Heart, LogIn, LogOut, Menu as MenuIcon,
  UserRound, X, ShieldCheck, ChevronDown,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const GREEN = "#15803D";
const DARK = "#14532D";
const TEXT = "#1e293b";
const MUTED = "#64748b";

const NAV_ITEMS = [
  { label: "Trang chủ", path: "/" },
  { label: "Khám phá", path: "/kham-pha" },
  { label: "Ưu đãi", path: "/uu-dai" },
  { label: "Về chúng tôi", path: "/ve-chung-toi" },
];

const ACCOUNT_ITEMS = [
  { label: "Hồ sơ của tôi", path: "/tai-khoan", icon: <UserRound size={18} /> },
  { label: "Phòng yêu thích", path: "/yeu-thich", icon: <Heart size={18} /> },
];

const buttonStyle = {
  borderRadius: "12px",
  textTransform: "none" as const,
  fontWeight: 700,
  py: 1.1,
};

const navStyle = {
  ...buttonStyle,
  px: 2,
  color: TEXT,
  fontSize: "0.92rem",
  "&:hover": { color: GREEN, bgcolor: alpha(GREEN, 0.06) },
  "&.active": { color: GREEN, bgcolor: alpha(GREEN, 0.08) },
};

const paperStyle = {
  mt: 1.5,
  minWidth: 230,
  borderRadius: "16px",
  bgcolor: "#fff",
  color: TEXT,
  border: "none",
  outline: "none",
  boxShadow: "0 12px 35px rgba(15,23,42,0.12)",
};

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { nguoiDung, dangXuat } = useAuth();
  const navigate = useNavigate();

  const tenNguoiDung =
    nguoiDung?.hoTen || nguoiDung?.email || "Tài khoản";

  const dongDrawer = () => setMobileOpen(false);
  const dongMenu = () => setAnchorEl(null);

  const handleLogout = async () => {
    dongMenu();
    dongDrawer();
    await dangXuat();
    navigate("/");
  };

  // LOGO
  const Logo = () => (
    <Box
      component={Link}
      to="/"
      sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}
    >
      <Box
        component="img"
        src={logo}
        alt="StayWise Homestay"
        sx={{
          width: 145,
          height: 68,
          objectFit: "contain",
          objectPosition: "left center",
          display: "block",
        }}
      />
    </Box>
  );

  // AVATAR
  const AvatarUser = ({ size = 36 }: { size?: number }) => (
    <Avatar
      src={nguoiDung?.anhDaiDien || undefined}
      sx={{
        width: size,
        height: size,
        bgcolor: GREEN,
        fontWeight: 700,
      }}
    >
      {tenNguoiDung.charAt(0).toUpperCase()}
    </Avatar>
  );

  
  const AuthButtons = ({ mobile = false }: { mobile?: boolean }) => (
    <Stack direction={mobile ? "column" : "row"} spacing={1.5}>
      <Button
        component={Link}
        to="/dang-nhap"
        onClick={mobile ? dongDrawer : undefined}
        startIcon={<LogIn size={17} />}
        sx={{
          ...buttonStyle,
          px: 2,
          color: TEXT,
          border: mobile ? "1px solid #e2e8f0" : "none",
          "&:hover": { color: GREEN, bgcolor: alpha(GREEN, 0.06) },
        }}
      >
        Đăng nhập
      </Button>

      <Button
        component={Link}
        to="/dang-ky"
        onClick={mobile ? dongDrawer : undefined}
        variant="contained"
        sx={{
          ...buttonStyle,
          px: 2.5,
          color: "#fff",
          bgcolor: GREEN,
          boxShadow: "0 4px 12px rgba(21,128,61,0.18)",
          "&:hover": { bgcolor: DARK },
        }}
      >
        {mobile ? "Đăng ký ngay" : "Đăng ký"}
      </Button>
    </Stack>
  );

  // DANH SÁCH TÀI KHOẢN
  const AccountLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {ACCOUNT_ITEMS.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          onClick={mobile ? dongDrawer : dongMenu}
          startIcon={item.icon}
          fullWidth={mobile}
          sx={{
            ...buttonStyle,
            justifyContent: "flex-start",
            color: mobile ? TEXT : GREEN,
            "&:hover": { bgcolor: alpha(GREEN, 0.06) },
          }}
        >
          {item.label}
        </Button>
      ))}
    </>
  );

  // MENU TÀI KHOẢN DESKTOP
  const UserMenu = () => (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={dongMenu}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      slotProps={{ paper: { sx: paperStyle } }}
    >
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography sx={{ fontWeight: 700 }} variant="body2" noWrap>
          {tenNguoiDung}
        </Typography>
        <Typography variant="caption" color={MUTED}>
          Tài khoản StayWise
        </Typography>
      </Box>

      <Divider />

      {ACCOUNT_ITEMS.map((item) => (
        <MenuItem
          key={item.path}
          component={Link}
          to={item.path}
          onClick={dongMenu}
          sx={{ py: 1.3, gap: 1.5 }}
        >
          <Box sx={{ color: GREEN, display: "flex" }}>{item.icon}</Box>
          {item.label}
        </MenuItem>
      ))}

      <Divider />

      <MenuItem onClick={handleLogout} sx={{ py: 1.3, gap: 1.5, color: "#e11d48" }}>
        <LogOut size={18} />
        Đăng xuất
      </MenuItem>
    </Menu>
  );

  // NÚT TÀI KHOẢN MOBILE
  const MobileUser = () => (
    <Stack spacing={1.5}>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          p: 1.5,
          borderRadius: "14px",
          bgcolor: alpha(GREEN, 0.05),
          alignItems: "center",
        }}
      >
        <AvatarUser size={42} />
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700 }} noWrap>{tenNguoiDung}</Typography>
          <Typography variant="caption" color={MUTED}>
            Thành viên StayWise
          </Typography>
        </Box>
      </Stack>

      <AccountLinks mobile />

      <Button
        onClick={handleLogout}
        startIcon={<LogOut size={18} />}
        sx={{ ...buttonStyle, justifyContent: "flex-start", color: "#e11d48" }}
      >
        Đăng xuất
      </Button>
    </Stack>
  );

  return (
    <>
      {/* HEADER */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          color: TEXT,
          borderBottom: "1px solid #e2e8f0",
          boxShadow: "0 3px 15px rgba(15,23,42,0.04)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: "82px !important" }}>
            <Logo />

            {/* MENU DESKTOP */}
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ display: { xs: "none", md: "flex" }, ml: 4 }}
            >
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  end={item.path === "/"}
                  sx={navStyle}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>

            {/* ACTION DESKTOP */}
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                display: { xs: "none", md: "flex" },
                ml: "auto",
                alignItems: "center",
              }}
            >
              <Tooltip title="Phòng yêu thích">
                <IconButton
                  component={Link}
                  to="/yeu-thich"
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "12px",
                    color: MUTED,
                    bgcolor: "#f8fafc",
                    "&:hover": { color: "#e11d48", bgcolor: "#fff1f2" },
                  }}
                >
                  <Heart size={19} />
                </IconButton>
              </Tooltip>

              {nguoiDung ? (
                <>
                  <Button
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    endIcon={<ChevronDown size={16} />}
                    sx={{
                      ...buttonStyle,
                      color: TEXT,
                      bgcolor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      px: 1.5,
                      "&:hover": { bgcolor: alpha(GREEN, 0.05) },
                    }}
                  >
                    <AvatarUser />
                    <Typography sx={{ ml: 1.2, maxWidth: 130, fontWeight: 600 }} noWrap>
                      {tenNguoiDung}
                    </Typography>
                  </Button>
                  <UserMenu />
                </>
              ) : (
                <AuthButtons />
              )}
            </Stack>

            {/* ACTION MOBILE */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}
            >
              <IconButton component={Link} to="/yeu-thich" sx={{ color: MUTED }}>
                <Heart size={20} />
              </IconButton>

              <IconButton
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{
                  color: GREEN,
                  borderRadius: "12px",
                  bgcolor: alpha(GREEN, 0.06),
                }}
              >
                {mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* DRAWER MOBILE */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={dongDrawer}
        slotProps={{
          paper: {
            sx: {
              width: { xs: "85%", sm: 320 },
              maxWidth: 360,
              bgcolor: "#fff",
              color: TEXT,
              px: 2.5,
              pt: 3,
              borderLeft: "1px solid #e2e8f0",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Logo />
          <IconButton onClick={dongDrawer} sx={{ color: MUTED }}>
            <X size={20} />
          </IconButton>
        </Box>

        <Typography variant="caption" sx={{ px: 1, mb: 1, fontWeight: 700, color: MUTED }}>
          ĐIỀU HƯỚNG
        </Typography>

        <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end={item.path === "/"}
                onClick={dongDrawer}
                sx={{
                  borderRadius: "12px",
                  py: 1.3,
                  color: MUTED,
                  "&:hover": { bgcolor: alpha(GREEN, 0.05), color: GREEN },
                  "&.active": { bgcolor: alpha(GREEN, 0.08), color: GREEN },
                }}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { sx: { fontWeight: 600, fontSize: "0.95rem" } } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="caption" color={MUTED} sx={{ px: 1, mb: 1.5, fontWeight: 700 }}>
          TÀI KHOẢN
        </Typography>

        {nguoiDung ? <MobileUser /> : <AuthButtons mobile />}

        <Box sx={{ mt: "auto", py: 3 }}>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 1 }}>
            <ShieldCheck size={16} color={GREEN} />
            <Typography variant="caption" color={MUTED}>
              Khám phá và tận hưởng kỳ nghỉ
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Header
