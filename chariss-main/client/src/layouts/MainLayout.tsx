import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { BagDrawer } from '../components/common/BagDrawer';
import { CustomCursor } from '../components/common/CustomCursor';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EC] text-[#11100F] font-sans selection:bg-[#A53E35] selection:text-white">
      {/* Top Anchor */}
      <div id="top" />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Luxury Nav Header */}
      <Navbar />

      {/* Page Content */}
      <div className="flex-1 w-full">
        <Outlet />
      </div>

      {/* Master Editorial Footer */}
      <Footer />

      {/* Shopping Bag Drawer */}
      <BagDrawer />
    </div>
  );
};

export default MainLayout;
