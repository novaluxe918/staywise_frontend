import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../../../components/admin/SidebarAdmin';
import HeaderAdmin from '../../../components/admin/HeaderAdmin';

function LayoutAdmin() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarAdmin />

      <HeaderAdmin />

      <main className="min-h-screen pl-72 pt-16">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default LayoutAdmin;