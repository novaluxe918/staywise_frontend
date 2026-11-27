
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Divider,
  Stack,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";

import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { dangNhap as dangNhapAPI  } from "../../../services/authService";
import { useAuth } from "../../../context/AuthContext";
import type { VaiTro } from "../../../types/auth";

function DangNhapForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { dangNhap: capNhatAuth } = useAuth();

 
const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
        const data = await dangNhapAPI({
            email,
            matKhau: password,
        });

        // Thay thế hoàn toàn tài khoản cũ bằng tài khoản mới
        capNhatAuth({
            id: data.id,
            email: data.email,
            vaiTro: data.vaiTro,
            hoTen: data.hoTen,
            anhDaiDien: data.anhDaiDien,
        });

        switch (data.vaiTro) {
            case "ADMIN":
                navigate("/admin/tong-quan", { replace: true });
                break;

            case "OWNER":
                navigate("/tong-quan", { replace: true });
                break;

            case "USER":
                navigate("/", { replace: true });
                break;

            default:
                setError("Vai trò tài khoản không hợp lệ!");
        }

    } catch (err: any) {
        setError(
            err.response?.data?.message ||
            "Email hoặc mật khẩu không chính xác."
        );
    } finally {
        setLoading(false);
    }
};

const handleGoogleLogin = () => {
    window.location.href =
        "http://localhost:8080/oauth2/authorization/google";
};

  return (
    <Box sx={{ width: "100%", maxWidth: 440 }}>

      {/* Tiêu đề */}
      <Box sx={{ mb: 2.5 }}>
        <Typography
          sx={{
            color: "#47745D",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
            mb: 1,
          }}
        >
          CHÀO MỪNG ĐẾN VỚI STAYWISE
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#233B30",
            letterSpacing: -1,
            mb: 0.5,
          }}
        >
          Chào mừng trở lại!
        </Typography>

        <Typography
          sx={{
            color: "#858B85",
            fontSize: 14,
          }}
        >
          Đăng nhập để tiếp tục hành trình của bạn.
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate={false}
      >
        <Stack spacing={1.8}>

          
          <Box>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: "#34483C",
                mb: 1,
              }}
            >
              Địa chỉ Email
            </Typography>

            <TextField
              fullWidth
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={19} color="#91A096" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputStyle}
            />
          </Box>

       
          <Box>
            <Stack
              direction="row"
              sx={{ mb: 1, justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#34483C",
                }}
              >
                Mật khẩu
              </Typography>

              <Link
                href="/quen-mat-khau"
                underline="none"
                sx={{
                  fontSize: 12,
                  color: "#47745D",
                  fontWeight: 600,
                }}
              >
                Quên mật khẩu?
              </Link>
            </Stack>

            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockKeyhole
                        size={19}
                        color="#91A096"
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        edge="end"
                      >
                        {showPassword
                          ? <EyeOff size={19} />
                          : <Eye size={19} />
                        }
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={inputStyle}
            />
          </Box>

       
          <FormControlLabel
            sx={{ my: -0.5 }}
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
                size="small"
                sx={{
                  color: "#A7B5AA",
                  "&.Mui-checked": {
                    color: "#47745D",
                  },
                }}
              />
            }
            label={
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#68756C",
                }}
              >
                Ghi nhớ đăng nhập
              </Typography>
            }
          />

          {/* Thông báo lỗi */}
          {error && (
            <Alert
              severity="error"
              onClose={() => setError("")}
              sx={{ fontSize: 13 }}
            >
              {error}
            </Alert>
          )}


          <Button
            type="submit"
            name="loginMode"
            value="ALL"
            fullWidth
            disabled={loading}
            endIcon={!loading && <ArrowRight size={18} />}
            sx={{
              height: 52,
              borderRadius: 3,
              backgroundColor: "#214D3D",
              color: "#fff",
              fontWeight: 700,
              textTransform: "none",
              fontSize: 15,
              boxShadow: "0 6px 16px rgba(33,77,61,0.18)",
              "&:hover": {
                backgroundColor: "#183B2E",
                boxShadow: "0 8px 20px rgba(33,77,61,0.25)",
              },
            }}
          >
            {loading
              ? <CircularProgress size={23} color="inherit" />
              : "Đăng nhập"
            }
          </Button>

        </Stack>

        {/* Phân cách */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ my: 2, alignItems: "center" }}
        >
          <Divider sx={{ flex: 1 }} />

          <Typography
            sx={{
              fontSize: 12,
              color: "#A0A7A1",
            }}
          >
            HOẶC TIẾP TỤC VỚI
          </Typography>

          <Divider sx={{ flex: 1 }} />
        </Stack>

        {/* Đăng nhập Google */}
        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleLogin}
          startIcon={
            <Box
              component="span"
              sx={{
                fontWeight: 800,
                fontSize: 19,
                color: "#4285F4",
                fontFamily: "Arial",
              }}
            >
              G
            </Box>
          }
          sx={{
            height: 50,
            borderRadius: 3,
            borderColor: "#E3E8E3",
            color: "#34483C",
            fontWeight: 600,
            textTransform: "none",
            fontSize: 14,
            "&:hover": {
              borderColor: "#47745D",
              backgroundColor: "#F8FAF8",
            },
          }}
        >
          Đăng nhập với Google
        </Button>


      </Box>

      {/* Đăng ký */}
      <Typography
        sx={{
          mt: 2.5,
          textAlign: "center",
          color: "#858B85",
          fontSize: 13,
        }}
      >
        Chưa có tài khoản?{" "}
        <Link
          href="/dang-ky"
          underline="none"
          sx={{
            color: "#47745D",
            fontWeight: 700,
          }}
        >
          Đăng ký ngay
        </Link>
      </Typography>

    </Box>
  );
}

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    height: 52,
    borderRadius: 3,
    backgroundColor: "#FAFBF9",
    fontSize: 14,

    "& fieldset": {
      borderColor: "#E5EAE5",
    },

    "&:hover fieldset": {
      borderColor: "#A4B8A9",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#47745D",
      borderWidth: 1.5,
    },
  },

  "& input::placeholder": {
    color: "#A5ADA6",
    opacity: 1,
  },
};

export default DangNhapForm;
