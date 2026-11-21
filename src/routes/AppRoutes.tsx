
import { Navigate, Route, Routes } from "react-router-dom";

import Dasboard from "../page/owner/dasboard/Dasboard";
import QuanLyPhong from "../page/owner/phong/QuanLyPhong";

import DangKy from "../page/auth/dangky/DangKy";
import DangNhap from "../page/auth/dangnhap/DangNhap";
import DangKyThongTin from "../page/owner/homestay/DangKyThongTin";

import ClientLayout from "../page/client/layout/ClientLayout";
import Home from "../page/client/home/Home";
import QuanLyTheLoai from "../page/admin/theloaitienich/QuanLyTheLoai";
import QuanLyTienIch from "../page/admin/tienichcoso/QuanLyTienIch";
import QuanLyDichVu from "../page/admin/dichvu/QuanLyDichVu";
import ProfilePage from "../page/owner/profile/ProfilePage";
import AdminDasboard from "../page/admin/dasboard/AdminDasboard";
import LayoutOwner from "../page/owner/layout/LayoutOwner";
import LayoutAdmin from "../page/admin/layout/LayoutAdmin";
import QuanLyOwner from "../page/admin/homestayowner/QuanLyOwner";
import QuanLyHomeStay from "../page/admin/homestay/QuanLyHomeStay";
import QuanLyUser from "../page/admin/user/QuanLyUser";
import HoSo from "../page/owner/homestay/HoSo";
import ChatDeXuat from "../page/owner/dexuat/ChatDeXuat";
import QuanLyDeXuat from "../page/admin/dexuat/QuanLyDeXuat";
import QuanLyGiuong from "../page/owner/giuong/QuanLyGiuong";



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

      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<Navigate to="tong-quan" replace />} />

        <Route path="tong-quan" element={<AdminDasboard />} />

        <Route path="chu-homestay" element={<QuanLyOwner />} />

        <Route path="tien-ich" element={<QuanLyTheLoai />} />

        <Route path="tien-ichcs" element={<QuanLyTienIch />} />

        <Route path="dich-vu" element={<QuanLyDichVu />} />

        <Route path="homestays" element={<QuanLyHomeStay />} />

        <Route path="users" element={<QuanLyUser />} />
        <Route path="de-xuat" element={<QuanLyDeXuat />} />
      </Route>

      {/* Giao diện quản lý OWNER */}
      <Route element={<LayoutOwner />}>
        <Route path="/tong-quan" element={<Dasboard />} />
        <Route path="/quan-ly-phong" element={<QuanLyPhong />} />
        <Route path="/ho-so" element={<HoSo />} />
         <Route path="/de-xuat" element={<ChatDeXuat />} />
         <Route path="/giuong" element={<QuanLyGiuong />} />
      </Route>

      {/* Đăng ký thông tin HomeStay */}
      <Route
        path="/dang-ky-homestay"
        element={<DangKyThongTin />}
      />

      <Route path="/cap-nhat-thong-tin" element={<ProfilePage />} />

    </Routes>
  );
}

export default AppRoutes;