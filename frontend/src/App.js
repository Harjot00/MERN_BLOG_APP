import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/auth";
import Blogs from "./components/Blogs";
import MyBlogs from "./components/MyBlogs";
import AddBlog from "./components/AddBlog";
import BlogDetail from "./components/BlogDetail";
import Edit from "./components/Edit";
import Footer from "./components/footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, []);
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/" element={<Blogs />}></Route>
          <Route path="myblogs/edit/:id" element={<Edit />}></Route>
          <Route path="/myblogs" element={<MyBlogs />}></Route>
          <Route path="/addblog" element={<AddBlog />}></Route>
          <Route path="/allblogs/:id" element={<BlogDetail />}></Route>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
