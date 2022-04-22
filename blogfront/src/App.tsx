import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SigninPage from './pages/signin.page';
import SignupPage from './pages/signup.page';
import BlogListPage from './pages/blog.list.page';
import ProfilePage from './pages/profile.page';
import CreateBlogPage from './pages/blog.create.page';
import BlogViewPage from './pages/view.blog.page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {}
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path='signup' element={<SignupPage/>}/>
          <Route path='homepage' element={<BlogListPage/>}/>
          <Route path='myprofile' element={<ProfilePage/>}/>
          <Route path='createblog' element={<CreateBlogPage/>}/>
          <Route path='viewblog' element={<BlogViewPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
