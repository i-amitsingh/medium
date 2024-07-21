import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import ReadBlog from "./pages/ReadBlog";
import CreateBlog from "./pages/CreateBlog";
import Layout from "./components/Layout";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    let token = sessionStorage.getItem("user");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="readblog/:id" element={<ReadBlog />} />
          <Route path="createblog" element={<CreateBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
