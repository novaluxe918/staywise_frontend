
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  Star,
  Building2,
  CalendarDays,
  ShieldCheck,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

import {
  Box,
  Typography,
  Chip,
  Stack,
  Paper,
} from "@mui/material";

import logo from "../../assets/logo.png";

const menus = [
  {
    title: "Nghiệp vụ vận hành",
    items: [
      { name: "Tổng quan", path: "/tong-quan", icon: LayoutDashboard },
      { name: "Quản lý Phòng", path: "/quan-ly-phong", icon: BedDouble },
      { name: "Bảng giá & Mùa vụ", path: "/bang-gia", icon: CalendarDays },
      { name: "Quản lý Đặt phòng", path: "/quan-ly-dat-phong", icon: CalendarCheck },
    ],
  },
  {
    title: "Khách hàng & Cơ sở",
    items: [
      { name: "Đánh giá từ khách", path: "/admin/danh-gia-tu-khach", icon: Star },
      { name: "Hồ sơ Homestay", path: "/ho-so", icon: Building2 },
      {
        name: "Đề xuất tiện ích / dịch vụ",
        path: "/de-xuat",
        icon: MessageCircle,
      },
    ],
  },
];

export default function OwnerSidebar() {
  return (
    <Box
      component="aside"
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1200,
        width: 288,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#FFFFFF",
        borderRight: "1px solid #E2E8F0",
        boxShadow: "2px 0 12px rgba(15, 23, 42, 0.03)",
      }}
    >
      {/* Brand Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1.5,
          px: 3,
          py: 2.5,
          minHeight: 85,
          borderBottom: "1px solid #F1F5F9",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            width: 48,
            height: 48,
            flexShrink: 0,
            overflow: "hidden",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="StayWise Logo"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              imageRendering: "auto",
              display: "block",
            }}
          />
        </Box>

        {/* Brand Name */}
        <Box sx={{ minWidth: 0 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 0.8,
            }}
          >
            <Typography
              sx={{
                fontSize: 19,
                fontWeight: 900,
                letterSpacing: "-0.6px",
                color: "#1E293B",
              }}
            >
              STAY
              <Box component="span" sx={{ color: "#059669" }}>
                WISE
              </Box>
            </Typography>

            <Chip
              label="HOST"
              size="small"
              sx={{
                height: 19,
                borderRadius: "5px",
                bgcolor: "#ECFDF5",
                color: "#047857",
                fontSize: 9,
                fontWeight: 800,
                "& .MuiChip-label": {
                  px: 0.8,
                },
              }}
            />
          </Box>

          <Typography
            sx={{
              mt: 0.3,
              fontSize: 10.5,
              color: "#94A3B8",
              whiteSpace: "nowrap",
            }}
          >
            Hệ thống quản trị cơ sở lưu trú
          </Typography>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <Box
        component="nav"
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          py: 2.5,
          "&::-webkit-scrollbar": {
            width: 5,
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#E2E8F0",
            borderRadius: 10,
          },
        }}
      >
        {menus.map((menu) => (
          <Box key={menu.title} sx={{ mb: 3 }}>
            <Typography
              sx={{
                px: 1.5,
                mb: 1.2,
                fontSize: 10.5,
                fontWeight: 800,
                color: "#94A3B8",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
              }}
            >
              {menu.title}
            </Typography>

            <Stack spacing={0.6}>
              {menu.items.map((item) => {
                const Icon = item.icon;

                return (
                  <Box
                    key={item.path}
                    component={NavLink}
                    to={item.path}
                    end={item.path === "/tong-quan"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      px: 1.5,
                      py: 1.35,
                      borderRadius: "11px",
                      textDecoration: "none",
                      color: "#64748B",
                      transition: "all 0.2s ease",

                      "&:hover": {
                        bgcolor: "#F8FAFC",
                        color: "#0F172A",
                      },

                      "&.active": {
                        bgcolor: "#059669",
                        color: "#FFFFFF",
                        boxShadow: "0 4px 10px rgba(5, 150, 105, 0.2)",
                      },

                      "&.active .menu-icon": {
                        color: "#FFFFFF",
                      },

                      "&.active .menu-arrow": {
                        color: "#A7F3D0",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        className="menu-icon"
                        sx={{
                          display: "flex",
                          color: "#94A3B8",
                          transition: "color 0.2s",
                        }}
                      >
                        <Icon size={19} strokeWidth={2} />
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>

                    <Box
                      className="menu-arrow"
                      sx={{
                        display: "flex",
                        color: "transparent",
                      }}
                    >
                      <ChevronRight size={16} />
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        ))}
      </Box>

      {/* Property Status Card */}
      <Box sx={{ p: 2, borderTop: "1px solid #F1F5F9" }}>
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 1.5,
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            bgcolor: "#F8FAFC",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: 10,
              height: 10,
              flexShrink: 0,
              borderRadius: "50%",
              bgcolor: "#10B981",
              boxShadow: "0 0 0 4px #D1FAE5",
            }}
          />

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.6}>
              <Typography
                sx={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "#1E293B",
                }}
              >
                Đang hoạt động
              </Typography>

              <ShieldCheck size={14} color="#059669" />
            </Stack>

            <Typography
              sx={{
                mt: 0.3,
                fontSize: 10.5,
                color: "#94A3B8",
              }}
            >
              Hệ thống đã xác thực an toàn
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
