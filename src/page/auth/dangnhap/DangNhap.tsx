
import React from "react";
import {
    Box,
    Typography,
    Stack,
} from "@mui/material";

import { ShieldCheck, Sparkles } from "lucide-react";
import DangNhapForm from "./DangNhapForm";
import logo from "../../../assets/logo.png";

function DangNhap() {
    return (
        <Box
            sx={{
                height: "100vh",
                backgroundImage: `
                            linear-gradient(
                                180deg,
                                rgba(15,35,25,0.35) 0%,
                                rgba(15,35,25,0.25) 40%,
                                rgba(15,35,25,0.85) 100%
                            ),
                            url('https://storage.googleapis.com/blogvxr-uploads/2025/10/a64f6ea5-homestay-o-sapa-6525662.jpg')
                        `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 0, md: 3 },
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr",
                    },
                    backgroundColor: "#FFFFFF",
                    borderRadius: { xs: 0, md: 5 },
                    overflow: "hidden",
                    boxShadow: {
                        xs: "none",
                        md: "0 25px 70px rgba(31,59,42,0.10)",
                    },
                }}
            >
                {/* BÊN TRÁI - HÌNH ẢNH */}
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        position: "relative",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        p: 5,
                        color: "#FFFFFF",
                        backgroundImage: `
                            linear-gradient(
                                180deg,
                                rgba(15,35,25,0.35) 0%,
                                rgba(15,35,25,0.25) 40%,
                                rgba(15,35,25,0.85) 100%
                            ),
                            url('https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1400')
                        `,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Logo */}
                    <Box>
                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{ alignItems: "center" }}
                        >
                            <Box
                                component="img"
                                src={logo}
                                sx={{
                                    width: 45,
                                    height: 45,
                                    borderRadius: 2.5,
                                    backgroundColor: "#FFFFFF",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#214D3D",
                                    fontSize: 25,
                                    fontWeight: 800,
                                }}
                            >

                            </Box>

                            <Typography
                                sx={{
                                    fontSize: 23,
                                    fontWeight: 800,
                                    letterSpacing: 2,
                                }}
                            >
                                STAYWISE
                            </Typography>
                        </Stack>
                    </Box>

                    {/* Nội dung */}
                    <Box sx={{ maxWidth: 440, mb: 3 }}>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: "center", mb: 2 }}
                        >
                            <Sparkles size={18} color="#D6E7D8" />

                            <Typography
                                sx={{
                                    fontSize: 12,
                                    letterSpacing: 2,
                                    fontWeight: 600,
                                    color: "#D6E7D8",
                                }}
                            >
                                YOUR JOURNEY STARTS HERE
                            </Typography>
                        </Stack>

                        <Typography
                            sx={{
                                fontSize: {
                                    md: 36,
                                    lg: 43,
                                },
                                fontWeight: "bold",
                                lineHeight: 1.3,
                                mb: 2,
                            }}
                        >
                            Mỗi chuyến đi,
                            <br />
                            một nơi để nhớ.
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: 15,
                                color: "#E1EAE2",
                                lineHeight: 1.9,
                                maxWidth: 390,
                            }}
                        >
                            Khám phá những không gian nghỉ dưỡng
                            tuyệt vời, tận hưởng những khoảnh khắc
                            đáng nhớ và tìm thấy nơi thuộc về bạn
                            cùng StayWise.
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{
                                alignItems: "center",
                                mt: 5,
                                p: 2,
                                borderRadius: 3,
                                backgroundColor: "rgba(255,255,255,0.13)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(255,255,255,0.2)",
                            }}
                        >
                            <ShieldCheck size={26} color="#D6E7D8" />

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: 13,
                                    }}
                                >
                                    Trải nghiệm an tâm
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: 11,
                                        color: "#D6E7D8",
                                    }}
                                >
                                    Kết nối và tận hưởng mọi hành trình.
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <Typography
                        sx={{
                            fontSize: 11,
                            color: "#D6E7D8",
                        }}
                    >
                        © 2026 StayWise. All rights reserved.
                    </Typography>
                </Box>

                {/* BÊN PHẢI - FORM ĐĂNG NHẬP */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: {
                            xs: 3,
                            sm: 5,
                            md: 5,
                            lg: 7,
                        },
                        backgroundColor: "#FFFFFF",
                    }}
                >
                    <DangNhapForm />
                </Box>
            </Box>
        </Box>
    );
}

export default DangNhap;
