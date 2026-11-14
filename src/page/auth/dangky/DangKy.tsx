
import React from "react";
import DangKyForm from "./DangKyForm";
import { Box, Typography } from "@mui/material";
import { Sparkles, ShieldCheck, ArrowUpRight } from "lucide-react";

function DangKy() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "0.95fr 1.05fr",
        },
        backgroundColor: "#F5F8F5",
        fontFamily: "'Be Vietnam Pro', sans-serif",
      }}
    >
      {/* LEFT - BRANDING */}
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          position: "sticky",
          top: 0,
          height: "100dvh",
          minHeight: 650,
          flexDirection: "column",
          justifyContent: "space-between",
          p: { lg: 5, xl: 7 },
          color: "#FFFFFF",
          overflow: "hidden",
          backgroundImage: `
            linear-gradient(
              145deg,
              rgba(9, 38, 27, 0.72),
              rgba(8, 34, 24, 0.92)
            ),
            url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Decorative glow */}
        <Box
          sx={{
            position: "absolute",
            width: 420,
            height: 420,
            top: -130,
            right: -120,
            borderRadius: "50%",
            background: "rgba(144, 218, 177, 0.17)",
            filter: "blur(90px)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: "15px",
              bgcolor: "#CDEEDB",
              color: "#16432F",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Sparkles size={24} />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 25,
                fontWeight: 800,
                letterSpacing: "-1px",
                lineHeight: 1.1,
              }}
            >
              StayWise
            </Typography>
            <Typography
              sx={{
                fontSize: 9,
                letterSpacing: 3,
                color: "#A9E5C1",
                fontWeight: 700,
                mt: 0.5,
              }}
            >
              ELEVATED HOSPITALITY
            </Typography>
          </Box>
        </Box>

        {/* Main content */}
        <Box sx={{ maxWidth: 500, position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 20,
              bgcolor: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
              mb: 3,
            }}
          >
            <Sparkles size={14} color="#A9E5C1" />
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1.4,
                color: "#D8F2E2",
              }}
            >
              YOUR JOURNEY STARTS HERE
            </Typography>
          </Box>

          <Typography
            component="h1"
            sx={{
              fontSize: { lg: "2.8rem", xl: "3.4rem" },
              lineHeight: 1.22,
              fontWeight: 800,
                fontFamily: "'Be Vietnam Pro', sans-serif",
              letterSpacing: "-1.5px",
              color: "#FFFFFF",
            }}
          >
            Không gian lưu trú.
            <Box
              component="span"
              sx={{
                display: "block",
                color: "#A9E5C1",
              }}
            >
              Cảm xúc nguyên bản.
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 2.5,
              maxWidth: 420,
              color: "rgba(255,255,255,0.78)",
              fontSize: 14,
              lineHeight: 1.9,
            }}
          >
            Khám phá những điểm đến độc đáo, trải nghiệm
            kỳ nghỉ đáng nhớ và quản lý hoạt động lưu trú
            dễ dàng cùng hệ sinh thái StayWise.
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 4 }}>
            <Box
              sx={{
                width: 43,
                height: 43,
                borderRadius: "13px",
                bgcolor: "rgba(255,255,255,0.12)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <ShieldCheck size={22} color="#A9E5C1" />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 700,   fontFamily: "'Be Vietnam Pro', sans-serif", }}>
                An toàn và bảo mật
              </Typography>
              <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>
                Thông tin tài khoản được bảo vệ
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            borderTop: "1px solid rgba(255,255,255,0.18)",
            pt: 2.5,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>
              © 2026 StayWise Inc.
            </Typography>
            <Typography sx={{ fontSize: 11, color: "#A9E5C1" }}>
              Elevated Hospitality
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* RIGHT - REGISTER */}
      <Box
        sx={{
          minWidth: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 3, md: 5, xl: 7 },
          py: { xs: 3, sm: 4, lg: 3 },
          overflow: "visible",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 490,
            mx: "auto",
          }}
        >
          {/* Mobile logo */}
          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
              alignItems: "center",
              gap: 1.2,
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "12px",
                bgcolor: "#174C3A",
                color: "white",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Sparkles size={20} />
            </Box>
            <Typography
              component="span"
              sx={{
                fontSize: 22,
                fontWeight: 800,
                color: "#174C3A",
              }}
            >
              StayWise
            </Typography>
          </Box>

          {/* Header */}
          <Box sx={{ mb: 2.5 }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                color: "#4A8969",
                mb: 1,
              }}
            >
              CREATE YOUR ACCOUNT
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 25, sm: 29 },
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.8px",
                color: "#163B2C",
                lineHeight: 1.3,
              }}
            >
              Bắt đầu hành trình
              <br />
              cùng StayWise
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: 13,
                color: "#788B80",
                lineHeight: 1.7,
              }}
            >
              Tạo tài khoản để khám phá và trải nghiệm
              hệ sinh thái lưu trú thông minh.
            </Typography>
          </Box>

          {/* Form card */}
          <Box
            sx={{
              bgcolor: "#FFFFFF",
              border: "1px solid #E9EFEA",
              borderRadius: { xs: "20px", sm: "24px" },
              p: { xs: 2, sm: 3, md: 3.5 },
              boxShadow: "0 12px 45px rgba(30, 70, 48, 0.055)",
            }}
          >
            <DangKyForm />
          </Box>

          {/* Terms */}
          <Typography
            sx={{
              mt: 2.5,
              fontSize: 10.5,
              color: "#8B9A91",
              textAlign: "center",
              lineHeight: 1.8,
              px: 1,
            }}
          >
            Bằng việc tạo tài khoản, bạn đồng ý với{" "}
            <Box
              component="span"
              sx={{ color: "#285D43", fontWeight: 700, cursor: "pointer" }}
            >
              Điều khoản dịch vụ
            </Box>{" "}
            và{" "}
            <Box
              component="span"
              sx={{ color: "#285D43", fontWeight: 700, cursor: "pointer" }}
            >
              Chính sách quyền riêng tư
            </Box>{" "}
            của StayWise.
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.6,
              mt: 2,
            }}
          >
            <ShieldCheck size={13} color="#72947F" />
            <Typography sx={{ fontSize: 10, color: "#8B9A91" }}>
              Your account, your journey.
            </Typography>
            <ArrowUpRight size={12} color="#72947F" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DangKy;
