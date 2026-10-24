import React from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import HeaderAdmin from '../../../components/admin/HeaderAdmin';
import { Outlet } from 'react-router-dom';

function LayoutAdmin() {
    return (
        <div className="min-h-screen bg-gray-50">
           <AdminSidebar />

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