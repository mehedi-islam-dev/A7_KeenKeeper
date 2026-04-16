import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import FriendDetail from './pages/FriendDetail';
import Timeline from './pages/Timeline';
import Stats from './pages/Stats';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="friend/:id" element={<FriendDetail />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="stats" element={<Stats />} />
<Route path="*" element={
  <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
    <h1 className="text-8xl md:text-9xl font-extrabold text-[#d10d0d] mb-2">404</h1>
    <h2 className="text-2xl md:text-3xl font-bold text-red-300">Page Not Found</h2>
  </div>
} />        </Route>
      </Routes>
      {/* Toast Notification Config */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} />
    </BrowserRouter>
  );
}

export default App;