import React from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div className='p-t-30'>
            <Outlet />
        </div>
    );
};

export default RootLayout;