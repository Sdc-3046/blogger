import './App.css';
import SignupPage from './pages/signup.page';
import SigninPage from './pages/signin.page';
import ProfilePage from './pages/profile.page';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogListPage from './pages/blog.list.page';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        {}
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="myprofile" element={<ProfilePage />} />
          <Route path="homepage" element={<BlogListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
