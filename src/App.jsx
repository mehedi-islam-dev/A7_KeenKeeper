import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import FriendDetail from './pages/FriendDetail';
import Timeline from './pages/Timeline';
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
          <Route path="stats" element={<div className="p-20 text-center text-2xl font-bold">Stats Page Coming Soon!</div>} />
          <Route path="*" element={<div className="p-20 text-center text-4xl font-bold text-red-500">404 - Page Not Found</div>} />
        </Route>
      </Routes>
      {/* Toast Notification Config */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} />
    </BrowserRouter>
  );
}

export default App;