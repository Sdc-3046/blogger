import './App.css';
import SigninPage from './pages/signin.page';
import SignupPage from './pages/signup.page';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        {}
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
