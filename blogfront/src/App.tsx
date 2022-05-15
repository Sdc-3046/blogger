import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SigninPage from './pages/signin.page';
import SignupPage from './pages/signup.page';
import HomePage from './pages/home.page';
import ProfilePage from './pages/profile.page';
import CreateBlogPage from './pages/blog.create.page';
import BlogViewPage from './pages/view.blog.page';
import MyBlogList from './pages/myblog.list.page';
import UpdateBlogPage from './pages/update.blog.page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {}
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path='signup' element={<SignupPage/>}/>
          <Route path='homepage' element={<HomePage/>}/>
          <Route path='myprofile' element={<ProfilePage/>}/>
          <Route path='createblog' element={<CreateBlogPage/>}/>
          <Route path='viewblog' element={<BlogViewPage/>}/>
          <Route path='/updateblog' element={<UpdateBlogPage/>}/>
          <Route path='dashboard' element={<MyBlogList/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
