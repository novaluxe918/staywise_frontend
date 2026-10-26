import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutAdmin from '../page/admin/layout/LayoutAdmin';
import Dasboard from '../page/admin/dasboard/Dasboard';
import QuanLyPhong from '../page/admin/phong/QuanLyPhong';
import DangKy from '../page/auth/dangky/DangKy';
import DangNhap from '../page/auth/dangnhap/DangNhap';

function AppRoutes() {
    return (
        <Routes>
            <Route path='/dang-ky' element={<DangKy />} />
            <Route path='dang-nhap' element={<DangNhap />} />
            <Route path='/' element={<LayoutAdmin />}>
                  <Route index element={<Navigate to="/tong-quan" replace />} />

            <Route path="tong-quan" element={<Dasboard />} />

            <Route path='quan-ly-phong' element={<QuanLyPhong />} />

            </Route>
        </Routes>
    );
}

export default AppRoutes;