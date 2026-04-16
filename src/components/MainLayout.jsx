import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F8FAFC]">
      <Navbar />
      
      <main className="grow w-full max-w-6xl mx-auto px-4 lg:px-8 py-8 md:py-12">
        <Outlet /> 
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;