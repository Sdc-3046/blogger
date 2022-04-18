import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        {}
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="createBlog" element={<CreateBlogPage />} />
          <Route path="blog-list" element={<BlogListPage />} />
          <Route path="viewblog" element={<BlogViewPage />} />
          <Route path="mybloglist" element={<MyBlogListPage />} />
          <Route path="updateBlog" element={<UpdateBlogPage />} />
          <Route path="myprofile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
