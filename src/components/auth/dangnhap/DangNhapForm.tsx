import { ArrowRight, Eye, EyeOff, House, LockKeyhole, Mail, UserRound } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dangNhap } from '../../../services/authService';

type UserRole = "USER" | "OWNER"

function DangNhapForm() {
  const [role, setRole] = useState<UserRole>("USER")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const data = await dangNhap({
        email,
        matKhau: password
      });

      const vaiTroChon = role;

      if (data.vaiTro != vaiTroChon) {
        setError("Vai tro khong hop voi tai khoan");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", String(data.id))
      localStorage.setItem("email", data.email)
      localStorage.setItem("vaiTro", data.vaiTro)

      if (data.vaiTro === "OWNER") {
        navigate("/")
      } else if (data.vaiTro === "USER") {
        navigate("/home")
      } else {
        setError("Vai tro chua duoc ho tro")
      }
    } catch (err: any) {
      console.error("Loi dang nhap", err);

      if (err.response) {
        setError(
          err.response.data?.message ||
          err.response.data?.error ||
          "Email hoặc mật khẩu không chính xác."
        );
      } else {
        setError(
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra Backend."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-full max-w-md'>
      <div className='mb-8'>
        <p className='text-sm font-semibold tracking-wider text-[#47745D]'>CHÀO MỪNG BẠN ĐÃ QUAY LẠI</p>
        <h2 className="mt-2 text-3xl font-bold text-[#233B30]">
          Đăng nhập
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Đăng nhập để tiếp tục với StayWise.
        </p>
      </div>

      <div className='mb-4 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1'>
        <button type="button"
          onClick={() => setRole("USER")}
          className={`flex items-center justify-center gap-2 rounded-lg px-2 py-3 text-sm font-medium transition ${role === "USER"
            ? "bg-white text-[#214D3D] shadow-sm"
            : "text-gray-500 hover:text-gray-800"
            }`}>
          <UserRound size={18} />
          Khách Hàng
        </button>
        <button type="button"
          onClick={() => setRole("OWNER")}
          className={`flex items-center justify-center gap-2 rounded-lg px-2 py-3 text-sm font-medium transition ${role === "OWNER"
            ? "bg-white text-[#214D3D] shadow-sm"
            : "text-gray-500 hover:text-gray-800"
            }`}>
          <House size={18} />
          Chủ Nhà
        </button>
      </div>
      <p className="mb-6 text-sm text-gray-500">
        {role === "USER"
          ? "Khám phá và đặt phòng cho chuyến đi của bạn."
          : "Quản lý HomeStay và hoạt động kinh doanh của bạn."}
      </p>

      <form onSubmit={handleSubmit} className='space-y-5'>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className='flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#47745D] focus-within:ring-2 focus-within:ring-[#47745D]/15'>
            <Mail size={19} className='shrink text-gray-400' />
            <input id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 w-full bg-transparent text-sm outline-none" />

          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>

            <a
              href="/quen-mat-khau"
              className="text-sm font-medium text-[#47745D] hover:underline"
            >
              Quên mật khẩu?
            </a>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 transition focus-within:border-[#47745D] focus-within:ring-2 focus-within:ring-[#47745D]/15">
            <LockKeyhole
              size={19}
              className="shrink-0 text-gray-400"
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 w-full bg-transparent text-sm outline-none"
            />

            <button
              type="button"
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              onClick={() => setShowPassword(!showPassword)}
              className="shrink-0 text-gray-400 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 accent-[#214D3D]"
          />
          Ghi nhớ đăng nhập
        </label>

        {error && (
          <p className='mb-4 text-sm text-red-600'>{error}</p>
        )}

        {success && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#214D3D] font-semibold text-white transition hover:bg-[#183B2E] active:scale-[0.99]"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-sm text-gray-400">Hoặc</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <p className="text-center text-sm text-gray-600">
        Chưa có tài khoản?{" "}
        <a
          href="/dang-ky"
          className="font-semibold text-[#47745D] hover:underline"
        >
          Đăng ký ngay
        </a>
      </p>
    </div>
  );
}

export default DangNhapForm;