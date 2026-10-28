import { useEffect, useState } from "react";
import type { TinhThanh, PhuongXa } from "../../../types/diaChi";
import {
  layDanhSachTinhThanh,
  layDanhSachPhuongXa,
} from "../../../services/diaChiService";

interface FormDiaChiProps {
  tinhThanh: string;
  phuongXa: string;
  diaChi: string;
  onChange: (field: "tinhThanh" | "phuongXa" | "diaChi", value: string) => void;
}

export default function FormDiaChi({
  tinhThanh,
  phuongXa,
  diaChi,
  onChange,
}: FormDiaChiProps) {
  const [danhSachTinhThanh, setDanhSachTinhThanh] = useState<TinhThanh[]>([]);
  const [danhSachPhuongXa, setDanhSachPhuongXa] = useState<PhuongXa[]>([]);

  const [dangTaiTinhThanh, setDangTaiTinhThanh] = useState(false);
  const [dangTaiPhuongXa, setDangTaiPhuongXa] = useState(false);
  const [loi, setLoi] = useState("");

  // Tải danh sách tỉnh/thành khi component được hiển thị
  useEffect(() => {
    const taiTinhThanh = async () => {
      try {
        setDangTaiTinhThanh(true);
        setLoi("");

        const data = await layDanhSachTinhThanh();
        setDanhSachTinhThanh(data);
      } catch (error) {
        console.error("Lỗi tải danh sách tỉnh/thành:", error);
        setLoi("Không thể tải danh sách tỉnh/thành.");
      } finally {
        setDangTaiTinhThanh(false);
      }
    };

    taiTinhThanh();
  }, []);

  // Tải danh sách phường/xã khi tỉnh/thành thay đổi
  useEffect(() => {
    const taiPhuongXa = async () => {
      if (!tinhThanh) {
        setDanhSachPhuongXa([]);
        return;
      }

      const tinhDuocChon = danhSachTinhThanh.find(
        (tinh) => tinh.name === tinhThanh
      );

      if (!tinhDuocChon) {
        setDanhSachPhuongXa([]);
        return;
      }

      try {
        setDangTaiPhuongXa(true);
        setLoi("");

        const data = await layDanhSachPhuongXa(tinhDuocChon.code);
        setDanhSachPhuongXa(data);
      } catch (error) {
        console.error("Lỗi tải danh sách phường/xã:", error);
        setLoi("Không thể tải danh sách phường/xã.");
        setDanhSachPhuongXa([]);
      } finally {
        setDangTaiPhuongXa(false);
      }
    };

    taiPhuongXa();
  }, [tinhThanh, danhSachTinhThanh]);

  return (
    <div className="space-y-5">
      {/* Tỉnh/thành */}
      <div>
        <label
          htmlFor="tinhThanh"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Tỉnh/thành phố <span className="text-red-500">*</span>
        </label>

        <select
          id="tinhThanh"
          value={tinhThanh}
          disabled={dangTaiTinhThanh}
          onChange={(e) => {
            onChange("tinhThanh", e.target.value);
            onChange("phuongXa", "");
          }}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:bg-gray-100"
        >
          <option value="">
            {dangTaiTinhThanh ? "Đang tải tỉnh/thành..." : "Chọn tỉnh/thành"}
          </option>

          {danhSachTinhThanh.map((tinh) => (
            <option key={tinh.code} value={tinh.name}>
              {tinh.name}
            </option>
          ))}
        </select>
      </div>

      {/* Phường/xã */}
      <div>
        <label
          htmlFor="phuongXa"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Phường/xã <span className="text-red-500">*</span>
        </label>

        <select
          id="phuongXa"
          value={phuongXa}
          disabled={!tinhThanh || dangTaiPhuongXa}
          onChange={(e) => onChange("phuongXa", e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:bg-gray-100"
        >
          <option value="">
            {!tinhThanh
              ? "Vui lòng chọn tỉnh/thành trước"
              : dangTaiPhuongXa
                ? "Đang tải phường/xã..."
                : "Chọn phường/xã"}
          </option>

          {danhSachPhuongXa.map((phuong) => (
            <option key={phuong.code} value={phuong.name}>
              {phuong.name}
            </option>
          ))}
        </select>
      </div>

      {/* Địa chỉ chi tiết */}
      <div>
        <label
          htmlFor="diaChi"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Địa chỉ chi tiết <span className="text-red-500">*</span>
        </label>

        <input
          id="diaChi"
          type="text"
          value={diaChi}
          onChange={(e) => onChange("diaChi", e.target.value)}
          placeholder="Nhập số nhà, tên đường..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      {loi && <p className="text-sm text-red-600">{loi}</p>}
    </div>
  );
}