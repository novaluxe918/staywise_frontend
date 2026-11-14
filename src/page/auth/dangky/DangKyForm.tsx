import { useState, type FormEvent } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";

import {
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
  Building2,
  Compass,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import type { DangKyDTO, VaiTro } from "../../../types/auth";
import { dangKy } from "../../../services/authService";

export default function DangKyForm() {
  const [form, setForm] = useState<DangKyDTO>({
    hoTen: "",
    email: "",
    soDienThoai: "",
    matKhau: "",
    xacNhanMatKhau: "",
    vaiTro: "USER",
  });

  const [hienMatKhau, setHienMatKhau] = useState(false);
  const [dangXuLy, setDangXuLy] = useState(false);
  const [thongBao, setThongBao] = useState("");
  const [loi, setLoi] = useState("");

  function capNhat(truong: keyof DangKyDTO, giaTri: string | VaiTro) {
    setForm((cu) => ({
      ...cu,
      [truong]: giaTri,
    }));
    setThongBao("");
    setLoi("");
  }

  async function xuLyDangKy(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setThongBao("");
    setLoi("");

    if (form.hoTen.trim().length < 2) {
      setLoi("Vui lòng nhập họ và tên hợp lệ.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setLoi("Email không đúng định dạng chuẩn.");
      return;
    }

    if (!/^0\d{9}$/.test(form.soDienThoai.trim())) {
      setLoi("Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.");
      return;
    }

    if (form.matKhau.length < 8) {
      setLoi("Mật khẩu phải chứa ít nhất 8 ký tự.");
      return;
    }

    if (form.matKhau !== form.xacNhanMatKhau) {
      setLoi("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    try {
      setDangXuLy(true);
      const duLieuDangKy: DangKyDTO = {
        ...form,
        hoTen: form.hoTen.trim(),
        email: form.email.trim(),
        soDienThoai: form.soDienThoai.trim(),
      };

      const response = await dangKy(duLieuDangKy);
      setThongBao(
        typeof response.data === "string"
          ? response.data
          : "Chào mừng bạn! Đăng ký tài khoản thành công."
      );

      setForm({
        hoTen: "",
        email: "",
        soDienThoai: "",
        matKhau: "",
        xacNhanMatKhau: "",
        vaiTro: "USER",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const duLieuLoi = error.response?.data;
        let noiDungLoi = "Đăng ký thất bại. Vui lòng thử lại.";

        if (typeof duLieuLoi === "string") {
          noiDungLoi = duLieuLoi;
        } else if (duLieuLoi && typeof duLieuLoi.message === "string") {
          noiDungLoi = duLieuLoi.message;
        } else if (!error.response) {
          noiDungLoi = "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại đường truyền.";
        }
        setLoi(noiDungLoi);
      } else {
        setLoi("Đã xảy ra sự cố không xác định.");
      }
    } finally {
      setDangXuLy(false);
    }
  }

  // Tinh chỉnh input style sang trọng, hiện đại
  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      backgroundColor: "#FFFFFF",
      fontSize: "0.915rem",
      color: "#1E2E27",
      boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
      transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      "& fieldset": {
        borderColor: "#E3EBE7",
        borderWidth: "1.5px",
      },
      "&:hover fieldset": {
        borderColor: "#A3C7B5",
      },
      "&.Mui-focused": {
        backgroundColor: "#FCFDFD",
        boxShadow: "0 0 0 4px rgba(27, 84, 62, 0.08)",
        "& fieldset": {
          borderColor: "#1B543E",
          borderWidth: "1.5px",
        },
      },
    },
  };

  const labelSx = {
    fontSize: "0.825rem",
    fontWeight: 700,
    color: "#233B31",
    letterSpacing: "0.2px",
    mb: 0.7,
  };

  const iconSx = {
    color: "#8DA397",
    width: 18,
    height: 18,
  };

  return (
    <Box component="form" onSubmit={xuLyDangKy} noValidate>
      {/* HỌ VÀ TÊN */}
      <Box sx={{ mb: 1.5 }}>
        <Typography sx={labelSx}>Họ và tên</Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Nguyễn Văn A"
          value={form.hoTen}
          onChange={(e) => capNhat("hoTen", e.target.value)}
          autoComplete="name"
          sx={inputSx}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <UserRound style={iconSx} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* EMAIL & SỐ ĐIỆN THOẠI - DÀN 2 CỘT NẾU MÀN HÌNH ĐỦ RỘNG */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.8} sx={{ mb: 1.5 }}>
        <Box sx={{ flex: 1.1 }}>
          <Typography sx={labelSx}>Địa chỉ Email</Typography>
          <TextField
            fullWidth
            size="small"
            type="email"
            placeholder="ban@example.com"
            value={form.email}
            onChange={(e) => capNhat("email", e.target.value)}
            autoComplete="email"
            sx={inputSx}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail style={iconSx} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Box sx={{ flex: 0.9 }}>
          <Typography sx={labelSx}>Số điện thoại</Typography>
          <TextField
            fullWidth
            size="small"
            type="tel"
            placeholder="0912 345 678"
            value={form.soDienThoai}
            onChange={(e) => capNhat("soDienThoai", e.target.value)}
            autoComplete="tel"
            sx={inputSx}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone style={iconSx} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Stack>

      {/* MẬT KHẨU */}
      <Box sx={{ mb: 1.5 }}>
        <Typography sx={labelSx}>Mật khẩu</Typography>
        <TextField
          fullWidth
          size="small"
          type={hienMatKhau ? "text" : "password"}
          placeholder="Ít nhất 8 ký tự an toàn"
          value={form.matKhau}
          onChange={(e) => capNhat("matKhau", e.target.value)}
          autoComplete="new-password"
          sx={inputSx}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockKeyhole style={iconSx} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setHienMatKhau(!hienMatKhau)}
                    edge="end"
                    sx={{ color: "#7B9386" }}
                  >
                    {hienMatKhau ? <EyeOff size={18} /> : <Eye size={18} />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* XÁC NHẬN MẬT KHẨU */}
      <Box sx={{ mb: 1.5 }}>
        <Typography sx={labelSx}>Xác nhận mật khẩu</Typography>
        <TextField
          fullWidth
          size="small"
          type={hienMatKhau ? "text" : "password"}
          placeholder="Nhập lại mật khẩu vừa tạo"
          value={form.xacNhanMatKhau}
          onChange={(e) => capNhat("xacNhanMatKhau", e.target.value)}
          autoComplete="new-password"
          sx={inputSx}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockKeyhole style={iconSx} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* CHỌN VAI TRÒ */}
      <Box sx={{ mb: 2 }}>
        <Typography sx={labelSx}>Bạn tham gia cùng StayWise với vai trò</Typography>
        <Stack direction="row" spacing={1.8}>
          {/* USER CARD */}
          <Box
            component="button"
            type="button"
            onClick={() => capNhat("vaiTro", "USER")}
            sx={{
              flex: 1,
              textAlign: "left",
              p: 2,
              borderRadius: "16px",
              cursor: "pointer",
              position: "relative",
              border: form.vaiTro === "USER" ? "1.8px solid #1B543E" : "1.8px solid #E5ECE7",
              backgroundColor: form.vaiTro === "USER" ? "#F0F7F3" : "#FFFFFF",
              boxShadow:
                form.vaiTro === "USER"
                  ? "0 8px 20px -6px rgba(27, 84, 62, 0.15)"
                  : "0 2px 8px rgba(0,0,0,0.02)",
              transition: "all 0.25s ease",
              "&:hover": {
                borderColor: "#1B543E",
                transform: "translateY(-1.5px)",
              },
            }}
          >
            <Stack direction="row" sx={{ mb: 1.2, justifyContent: "space-between", alignItems: "flex-start" }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: form.vaiTro === "USER" ? "#1B543E" : "#EBF3EE",
                  color: form.vaiTro === "USER" ? "#FFFFFF" : "#1B543E",
                  transition: "all 0.25s ease",
                }}
              >
                <Compass size={20} strokeWidth={2.2} />
              </Box>
              {form.vaiTro === "USER" && <CheckCircle2 size={20} color="#1B543E" />}
            </Stack>
            <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#173B2E" }}>
              Khách du lịch
            </Typography>
            <Typography sx={{ fontSize: "0.74rem", color: "#667D71", mt: 0.3, lineHeight: 1.4 }}>
              Tìm kiếm & trải nghiệm kỳ nghỉ mơ ước
            </Typography>
          </Box>

          {/* OWNER CARD */}
          <Box
            component="button"
            type="button"
            onClick={() => capNhat("vaiTro", "OWNER")}
            sx={{
              flex: 1,
              textAlign: "left",
              p: 1.5,
              borderRadius: "16px",
              cursor: "pointer",
              position: "relative",
              border: form.vaiTro === "OWNER" ? "1.8px solid #1B543E" : "1.8px solid #E5ECE7",
              backgroundColor: form.vaiTro === "OWNER" ? "#F0F7F3" : "#FFFFFF",
              boxShadow:
                form.vaiTro === "OWNER"
                  ? "0 8px 20px -6px rgba(27, 84, 62, 0.15)"
                  : "0 2px 8px rgba(0,0,0,0.02)",
              transition: "all 0.25s ease",
              "&:hover": {
                borderColor: "#1B543E",
                transform: "translateY(-1.5px)",
              },
            }}
          >
            <Stack direction="row" sx={{ mb: 1.2, justifyContent: "space-between", alignItems: "flex-start" }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: form.vaiTro === "OWNER" ? "#1B543E" : "#EBF3EE",
                  color: form.vaiTro === "OWNER" ? "#FFFFFF" : "#1B543E",
                  transition: "all 0.25s ease",
                }}
              >
                <Building2 size={20} strokeWidth={2.2} />
              </Box>
              {form.vaiTro === "OWNER" && <CheckCircle2 size={20} color="#1B543E" />}
            </Stack>
            <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#173B2E" }}>
              Chủ HomeStay
            </Typography>
            <Typography sx={{ fontSize: "0.74rem", color: "#667D71", mt: 0.3, lineHeight: 1.4 }}>
              Đăng tin & tối ưu kinh doanh lưu trú
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* THÔNG BÁO LỖI / THÀNH CÔNG */}
      {loi && (
        <Alert
          severity="error"
          sx={{
            mb: 2.5,
            borderRadius: "12px",
            fontSize: "0.85rem",
            backgroundColor: "#FDF2F2",
            color: "#991B1B",
            border: "1px solid #FCD4D4",
          }}
        >
          {loi}
        </Alert>
      )}

      {thongBao && (
        <Alert
          severity="success"
          sx={{
            mb: 2.5,
            borderRadius: "12px",
            fontSize: "0.85rem",
            backgroundColor: "#F0FDF4",
            color: "#166534",
            border: "1px solid #BBF7D0",
          }}
        >
          {thongBao}
        </Alert>
      )}

      {/* NÚT TẠO TÀI KHOẢN */}
      <Button
        type="submit"
        fullWidth
        disabled={dangXuLy}
        endIcon={
          dangXuLy ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            <ArrowRight size={18} strokeWidth={2.5} />
          )
        }
        sx={{
          py: 1.3,
          borderRadius: "14px",
          background: "linear-gradient(135deg, #1A4D3B 0%, #113629 100%)",
          color: "#FFFFFF",
          fontSize: "0.95rem",
          fontWeight: 700,
          letterSpacing: "0.2px",
          textTransform: "none",
          boxShadow: "0 10px 24px -4px rgba(26, 77, 59, 0.32)",
          transition: "all 0.25s ease",
          "&:hover": {
            background: "linear-gradient(135deg, #143F30 0%, #0C281F 100%)",
            boxShadow: "0 14px 28px -4px rgba(26, 77, 59, 0.42)",
            transform: "translateY(-1px)",
          },
          "&.Mui-disabled": {
            backgroundColor: "#A8BDB2",
            color: "#FFFFFF",
          },
        }}
      >
        {dangXuLy ? "Đang khởi tạo..." : "Tạo tài khoản ngay"}
      </Button>

  
      <Divider sx={{ my: 2, borderColor: "#E9F0EC" }} />

      <Typography
        sx={{
          textAlign: "center",
          fontSize: "0.875rem",
          color: "#6D8177",
        }}
      >
        Bạn đã có tài khoản?{" "}
        <Box
          component={RouterLink}
          to="/dang-nhap"
          sx={{
            color: "#1A4D3B",
            fontWeight: 800,
            textDecoration: "none",
            position: "relative",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Đăng nhập ngay
        </Box>
      </Typography>
    </Box>
  );
}