
import {
  Box,
  Container,
  Typography,
  Chip,
} from "@mui/material";

import { Leaf } from "lucide-react";

import SearchBox from "./SearchBox";
import TrustItems from "./TrustItems";

import heroImage from "../../assets/hero-homestay.jpg";

function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundImage: `
          linear-gradient(
            180deg,
            rgba(8, 25, 18, 0.35) 0%,
            rgba(8, 25, 18, 0.48) 55%,
            rgba(8, 25, 18, 0.68) 100%
          ),
          url(${heroImage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center 55%",
        backgroundRepeat: "no-repeat",
        py: { xs: 9, md: 13 },
      }}
    >
      {/* Decorative overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 35%, transparent 0%, rgba(0,0,0,0.12) 100%)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <Chip
            icon={<Leaf size={15} />}
            label="KỲ NGHỈ THẢNH THƠI CÙNG STAYWISE"
            sx={{
              height: 40,
              px: 1.5,
              mb: 4,
              borderRadius: "30px",
              color: "#FFFFFF",
              bgcolor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(12px)",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.5,
              "& .MuiChip-icon": {
                color: "#86EFAC",
              },
              animation: "fadeDown .8s ease both",
            }}
          />

          {/* Heading */}
          <Typography
            component="h1"
            sx={{
              maxWidth: 950,
              fontSize: {
                xs: 35,
                sm: 48,
                md: 66,
              },
              fontWeight: 900,
              lineHeight: 1.2,
              letterSpacing: {
                xs: "-1px",
                md: "-2.5px",
              },
              color: "#FFFFFF",
              textShadow: "0 4px 25px rgba(0,0,0,0.3)",
              animation: "fadeUp .9s ease both",
            }}
          >
            Tìm Kiếm Chốn Dừng Chân Lý Tưởng

            <Box
              component="span"
              sx={{
                display: "block",
                mt: 1,
                color: "#86EFAC",
                textShadow: "0 3px 20px rgba(0,0,0,0.25)",
              }}
            >
              Cho Chuyến Đi Của Bạn
            </Box>
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              maxWidth: 650,
              mt: 3,
              mb: 5,
              color: "rgba(255,255,255,0.9)",
              fontSize: {
                xs: 14,
                md: 17,
              },
              fontWeight: 400,
              lineHeight: 1.9,
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
              animation: "fadeUp 1.1s ease both",
            }}
          >
            Khám phá những homestay ấm cúng, biệt thự nghỉ dưỡng
            và những không gian tuyệt đẹp trên khắp Việt Nam.
            Cùng StayWise tạo nên những hành trình đáng nhớ.
          </Typography>
          {/* Search */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 1100,
              mx: "auto",
              display: "flex",
              justifyContent: "center",
              animation: "fadeUp 1.2s ease both",
            }}
          >
            <SearchBox />
          </Box>
          {/* Trust information */}
          <Box
            sx={{
              mt: 1,
              "& *": {
                color: "#FFFFFF",
              },
            }}
          >
            <TrustItems />
          </Box>
        </Box>
      </Container>

      {/* Bottom decoration */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.18), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Animations */}
      <Box component="style" sx={{ display: "none" }}>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeDown {
            from {
              opacity: 0;
              transform: translateY(-15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: .01ms !important;
              transition-duration: .01ms !important;
            }
          }
        `}
      </Box>
    </Box>
  );
}

export default HeroSection;
