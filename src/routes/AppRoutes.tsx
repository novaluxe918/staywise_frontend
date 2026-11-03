
import { Navigate, Route, Routes } from "react-router-dom";

import LayoutAdmin from "../page/admin/layout/LayoutAdmin";
import Dasboard from "../page/admin/dasboard/Dasboard";
import QuanLyPhong from "../page/admin/phong/QuanLyPhong";

import DangKy from "../page/auth/dangky/DangKy";
import DangNhap from "../page/auth/dangnhap/DangNhap";
import DangKyThongTin from "../page/admin/homestay/DangKyThongTin";

import ClientLayout from "../page/client/layout/ClientLayout";
import Home from "../page/client/home/Home";
import QuanLyTheLoai from "../page/admin/theloaitienich/QuanLyTheLoai";
import QuanLyTienIch from "../page/admin/tienichcoso/QuanLyTienIch";



function AppRoutes() {
  return (
    <Routes>
      {/* Trang xác thực */}
      <Route path="/dang-ky" element={<DangKy />} />
      <Route path="/dang-nhap" element={<DangNhap />} />

      {/* Giao diện khách hàng */}
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* Giao diện quản lý OWNER */}
      <Route element={<LayoutAdmin />}>
        <Route path="/tong-quan" element={<Dasboard />} />
        <Route path="/quan-ly-phong" element={<QuanLyPhong />} />
        <Route path="/tien-ich" element={<QuanLyTheLoai />} />
        <Route path="/tien-ichcs" element={<QuanLyTienIch />} />
      </Route>

      {/* Đăng ký thông tin HomeStay */}
      <Route
        path="/dang-ky-homestay"
        element={<DangKyThongTin />}
      />

    </Routes>
  );
}

export default AppRoutes;