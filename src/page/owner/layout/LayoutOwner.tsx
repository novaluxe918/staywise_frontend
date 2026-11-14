import React from 'react';
import { Outlet } from 'react-router-dom';
import OwnerSidebar from '../../../components/owner/OwnerSidebar';
import HeaderOwner from '../../../components/owner/HeaderOwner';

function LayoutOwner() {
    return (
        <div className="min-h-screen bg-gray-50">
           <OwnerSidebar />

           <HeaderOwner />

            <main className="min-h-screen pl-72 pt-16">
        <div className="p-6">
          <Outlet />
        </div>
      </main> 
        </div>
    );
}

export default LayoutOwner;