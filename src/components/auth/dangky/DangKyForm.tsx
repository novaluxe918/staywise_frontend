
import { useState, type FormEvent } from "react";
import axios from "axios";

import {
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
  House,
  LoaderCircle,
} from "lucide-react";
import type { DangKyDTO, VaiTro } from "../../../types/auth";
import { dangKy } from "../../../services/authService";


export default function DangKyFormForm() {
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

  // Cập nhật giá trị của từng ô nhập
  function capNhat(
    truong: keyof DangKyDTO,
    giaTri: string | VaiTro
  ) {
    setForm((cu) => ({
      ...cu,
      [truong]: giaTri,
    }));

    setThongBao("");
    setLoi("");
  }

  // Xử lý đăng ký
  async function xuLyDangKy(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setThongBao("");
    setLoi("");

    // Kiểm tra họ tên
    if (form.hoTen.trim().length < 2) {
      setLoi("Vui lòng nhập họ tên hợp lệ.");
      return;
    }

    // Kiểm tra email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setLoi("Email không đúng định dạng.");
      return;
    }

    // Kiểm tra số điện thoại
    if (!/^0\d{9}$/.test(form.soDienThoai.trim())) {
      setLoi("Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.");
      return;
    }

    // Kiểm tra mật khẩu
    if (form.matKhau.length < 8) {
      setLoi("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    // Kiểm tra xác nhận mật khẩu
    if (form.matKhau !== form.xacNhanMatKhau) {
      setLoi("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      setDangXuLy(true);

      // Gửi dữ liệu đến Backend
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
          : "Đăng ký tài khoản thành công!"
      );

      // Xóa form sau khi đăng ký thành công
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
        } else if (
          duLieuLoi &&
          typeof duLieuLoi.message === "string"
        ) {
          noiDungLoi = duLieuLoi.message;
        } else if (!error.response) {
          noiDungLoi =
            "Không thể kết nối đến Backend. Hãy kiểm tra máy chủ Spring Boot.";
        }

        setLoi(noiDungLoi);
      } else {
        setLoi("Đã xảy ra lỗi không xác định.");
      }
    } finally {
      setDangXuLy(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100";

  return (
    <form onSubmit={xuLyDangKy} className="space-y-4">
      {/* Họ và tên */}
      <div>
        <label
          htmlFor="hoTen"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Họ và tên
        </label>

        <div className="relative">
          <UserRound className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

          <input
            id="hoTen"
            type="text"
            autoComplete="name"
            className={inputClass}
            placeholder="Nhập họ và tên"
            value={form.hoTen}
            onChange={(e) =>
              capNhat("hoTen", e.target.value)
            }
            required
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email
        </label>

        <div className="relative">
          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            placeholder="ban@example.com"
            value={form.email}
            onChange={(e) =>
              capNhat("email", e.target.value)
            }
            required
          />
        </div>
      </div>

      {/* Số điện thoại */}
      <div>
        <label
          htmlFor="soDienThoai"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Số điện thoại
        </label>

        <div className="relative">
          <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

          <input
            id="soDienThoai"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="0912345678"
            value={form.soDienThoai}
            onChange={(e) =>
              capNhat("soDienThoai", e.target.value)
            }
            required
          />
        </div>
      </div>

      {/* Mật khẩu */}
      <div>
        <label
          htmlFor="matKhau"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Mật khẩu
        </label>

        <div className="relative">
          <LockKeyhole className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

          <input
            id="matKhau"
            type={hienMatKhau ? "text" : "password"}
            autoComplete="new-password"
            className={inputClass}
            placeholder="Ít nhất 8 ký tự"
            value={form.matKhau}
            onChange={(e) =>
              capNhat("matKhau", e.target.value)
            }
            required
          />

          <button
            type="button"
            onClick={() =>
              setHienMatKhau((cu) => !cu)
            }
            aria-label={
              hienMatKhau ? "Ẩn mật khẩu" : "Hiện mật khẩu"
            }
            className="absolute right-3 top-3.5 text-gray-400"
          >
            {hienMatKhau ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Xác nhận mật khẩu */}
      <div>
        <label
          htmlFor="xacNhanMatKhau"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Xác nhận mật khẩu
        </label>

        <div className="relative">
          <LockKeyhole className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

          <input
            id="xacNhanMatKhau"
            type={hienMatKhau ? "text" : "password"}
            autoComplete="new-password"
            className={inputClass}
            placeholder="Nhập lại mật khẩu"
            value={form.xacNhanMatKhau}
            onChange={(e) =>
              capNhat("xacNhanMatKhau", e.target.value)
            }
            required
          />
        </div>
      </div>

      {/* Chọn vai trò */}
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-gray-700">
          Bạn muốn đăng ký với vai trò nào?
        </legend>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            aria-pressed={form.vaiTro === "USER"}
            onClick={() =>
              capNhat("vaiTro", "USER")
            }
            className={`rounded-xl border p-3 text-left transition ${
              form.vaiTro === "USER"
                ? "border-emerald-700 bg-emerald-50 ring-1 ring-emerald-700"
                : "border-gray-200 hover:border-emerald-300"
            }`}
          >
            <UserRound className="mb-2 h-5 w-5 text-emerald-800" />

            <span className="block text-sm font-semibold">
              Khách du lịch
            </span>

            <span className="mt-1 block text-xs text-gray-500">
              Tìm kiếm và đặt phòng
            </span>
          </button>

          <button
            type="button"
            aria-pressed={form.vaiTro === "OWNER"}
            onClick={() =>
              capNhat("vaiTro", "OWNER")
            }
            className={`rounded-xl border p-3 text-left transition ${
              form.vaiTro === "OWNER"
                ? "border-emerald-700 bg-emerald-50 ring-1 ring-emerald-700"
                : "border-gray-200 hover:border-emerald-300"
            }`}
          >
            <House className="mb-2 h-5 w-5 text-emerald-800" />

            <span className="block text-sm font-semibold">
              Chủ HomeStay
            </span>

            <span className="mt-1 block text-xs text-gray-500">
              Quản lý chỗ ở
            </span>
          </button>
        </div>
      </fieldset>

      {/* Thông báo lỗi */}
      {loi && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {loi}
        </p>
      )}

      {/* Thông báo thành công */}
      {thongBao && (
        <p
          role="status"
          className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800"
        >
          {thongBao}
        </p>
      )}

      {/* Nút đăng ký */}
      <button
        type="submit"
        disabled={dangXuLy}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 py-3.5 font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {dangXuLy && (
          <LoaderCircle className="h-5 w-5 animate-spin" />
        )}

        {dangXuLy ? "Đang đăng ký..." : "Tạo tài khoản"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Đã có tài khoản?{" "}
        <a
          href="/dang-nhap"
          className="font-semibold text-emerald-800 hover:underline"
        >
          Đăng nhập
        </a>
      </p>
    </form>
  );
}