import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Doctors from "./components/Doctors";
import Ask from "./components/Ask";
import Contact from "./components/Contact";

import Land from "./components/Land";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Verify from "./components/Verify";
import ForgetPassword from "./components/ForgetPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // التحقق من حالة تسجيل الدخول عند تحميل التطبيق
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (token) {
        // التحقق من صحة التوكن مع الخادم
        const response = await fetch(
          "https://minimum-birdie-autism-e4d0ba7d.koyeb.app/api/auth/me",
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          // التوكن غير صالح، حذفه
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("خطأ في التحقق من حالة تسجيل الدخول:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#4456a5'
      }}>
        جاري التحميل...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Land isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/home"
          element={
            <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/about"
          element={
            <AboutUs isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/doctors"
          element={
            <Doctors isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/contactus"
          element={
            <Contact isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />

        <Route path="/ask" element={<Ask buttonText="مشاركة" />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
