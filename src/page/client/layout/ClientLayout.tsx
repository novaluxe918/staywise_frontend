import React from 'react';
import Header from '../../../components/client/Header';
import { Outlet } from 'react-router-dom';

function ClientLayout() {
    return (
        <div className='min-h-screen'>
            <Header />

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default ClientLayout;