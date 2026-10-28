
import {
  Search,
  Bell,
  ChevronDown,
  Building2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dangXuat } from "../../services/authService";

interface NguoiDung {
  id: number;
  email: string;
  vaiTro: string;
  hoTen: string;

}

export default function HeaderAdmin() {
  const [nguoiDung, setNguoiDung] = useState<NguoiDung | null>(null);
  const [moDropDown, setMoDropdown] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await dangXuat();

    } catch (error) {
      console.error("Loi khi goi API dang xuat: ", error)
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/dang-nhap", { replace: true });
    }
  }
  useEffect(() => {

    const user = localStorage.getItem("nguoiDung");

    if (user) {
      setNguoiDung(JSON.parse(user) as NguoiDung);
    }
  }, [])
  return (
    <header className="fixed left-72 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-gray-100 bg-white/95 px-6 backdrop-blur">
      {/* Chọn cơ sở và tìm kiếm */}
      <div className="flex min-w-0 flex-1 items-center gap-5">
        <div className="flex shrink-0 items-center gap-3 rounded-xl bg-gray-50 px-3 py-2">
          <Building2 size={22} className="text-emerald-700" />

          <div>
            <p className="text-[10px] font-bold text-gray-400">
              CƠ SỞ HIỆN TẠI
            </p>

            <select className="max-w-64 cursor-pointer bg-transparent text-sm font-semibold outline-none">
              <option value="HS1029">
                Pine Hill Serenity Villa (#HS1029)
              </option>
              <option value="HS2041">
                Cloud Peak Bungalow (#HS2041)
              </option>
            </select>
          </div>
        </div>

        <div className="relative hidden min-w-0 flex-1 lg:block">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Tra cứu mã đặt phòng, tên khách hàng..."
            className="h-11 w-full rounded-xl bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>

      {/* Thông báo và tài khoản */}
      <div className="ml-4 flex shrink-0 items-center gap-4">
        <button
          type="button"
          aria-label="Thông báo"
          className="relative rounded-xl bg-gray-50 p-2.5 hover:bg-gray-100"
        >
          <Bell size={21} />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            3
          </span>
        </button>

        <div className="relative">
          <button
            onClick={() => setMoDropdown(!moDropDown)}
            type="button"
            className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2"
          >
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="Ảnh đại diện"
              className="h-8 w-8 rounded-full object-cover"
            />

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold">
                {nguoiDung?.hoTen ?? "Chủ HomeStay"}
              </p>
              <p className="text-xs text-gray-500">Chủ cơ sở</p>
            </div>

            <ChevronDown
              size={18}
              className={`transition-transform ${moDropDown ? "rotate-180" : ""
                }`}
            />
          </button>

          {moDropDown && (
            <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setMoDropdown(false);
                  navigate("/dang-ky-homestay");
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50"
              >
                Đăng ký HomeStay
              </button>

              <button
                type="button"
                onClick={() => {
                  setMoDropdown(false);
                  navigate("/cap-nhat-thong-tin");
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50"
              >
                Cập nhật thông tin
              </button>

              <hr className="my-2" />

              <button
                type="button"
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
