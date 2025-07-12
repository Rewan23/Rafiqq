import React, { useEffect, useState } from "react";
import "./Nav.css";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({
  buttonText,
  messages,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowText((prev) => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleShareChat = () => {
    const text = messages
      .map((msg) => {
        return `${msg.sender === "user" ? "أنت" : "رَفيق"}: ${msg.text}`;
      })
      .join("\n");
    navigator.clipboard.writeText(text);
    alert("تم نسخ المحادثة! 🎉");
  };

  const handleButtonClick = async () => {
    if (buttonText === "مشاركة") {
      handleShareChat();
    } else if (isLoggedIn) {
      // تسجيل الخروج من الخادم
      await handleLogout();
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (token) {
        // إرسال طلب تسجيل الخروج إلى الخادم
        const response = await fetch(
          "https://minimum-birdie-autism-e4d0ba7d.koyeb.app/api/auth/logout",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // حتى لو فشل الطلب، نقوم بحذف البيانات المحلية
        console.log("تم تسجيل الخروج من الخادم:", response.ok);
      }
    } catch (error) {
      console.error("خطأ في تسجيل الخروج:", error);
    } finally {
      // حذف البيانات المحلية
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // تحديث حالة تسجيل الدخول
      setIsLoggedIn(false);
      
      // رسالة تأكيد
      alert("تم تسجيل الخروج بنجاح");
      
      // توجيه المستخدم إلى الصفحة الرئيسية
      navigate("/");
    }
  };
  return (
    <>
      <div className="nav">
        <div className="logo-container">
          <div className={`icons ${showText ? "move" : ""}`}>
            <svg
              width="23.66"
              height="26.87"
              viewBox="0 0 247 281"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M96.29 275.04C96.29 275.04 82.5 206.53 133.06 208.49C133.06 208.49 176.46 205.51 174.76 269.43H246.42V186.03C246.42 186.03 180.38 187.9 180.55 148.07C180.55 148.07 176.21 94.2 242.17 113.18V47.8201H160.64C160.64 47.8201 156.3 0.510053 111.96 0.670053C111.96 0.670053 70 -1.53995 70.6 63.1401L8.98002 71.8201C8.98002 71.8201 2.07002 73.75 1.05002 83.54C1.02002 83.82 1.00002 84.12 0.980025 84.4201C0.300025 94.9701 14.77 280.68 14.77 280.68L96.29 275.04Z"
                fill="#FCC114"
              />
            </svg>
            <svg
              width="24.5"
              height="24.77"
              viewBox="0 0 255 259"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.60003 42.98L0.240016 192.43C0.240016 192.43 -2.47997 253.71 78.54 258.81C78.54 258.81 139.82 258.81 170.45 240.09L240.47 204.92C243.34 203.48 246.02 201.66 248.34 199.44C252.82 195.14 257.07 188.42 247.42 183.34C242.96 180.99 237.82 180.3 232.85 181.13L180.21 189.9C179.17 190.07 178.1 190.1 177.07 189.88C174.71 189.39 171.51 187.67 172.88 181.74C173.76 177.96 176.12 174.68 179.31 172.47L241.63 129.12C246.12 125.99 249.87 121.86 252.3 116.95C255.22 111.05 256.24 103.98 246.71 101.3C241.64 99.87 236.21 100.48 231.45 102.74L175.89 129.04C173.05 130.38 169.92 131.07 166.78 130.85C161.72 130.49 156.62 127.94 165.34 116.87L221.19 56.5C224.34 53.09 226.33 48.7 226.5 44.06C226.68 39.4 225.04 34.33 217.89 32.52C212.18 31.08 206.13 32.73 201.68 36.59C185.58 50.52 137.35 92.21 134.7 94.4C133.17 95.66 107.81 107 121.42 80.78L149.75 24.76C151.98 20.36 152.89 15.36 152.09 10.49C150.91 3.30003 141.5 -5.34997 129.59 6.57003L79.55 71.93C79.55 71.93 42.78 114.73 32.91 67.5L25.69 33.13C24.55 27.68 20.85 23.01 15.65 21.01C9.30002 18.55 1.79003 20.47 1.60003 42.98Z"
                fill="#4456A5"
              />
            </svg>
            <svg
              width="24"
              height="27.56"
              viewBox="0 0 250 289"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M114.68 81.32C136.865 81.32 154.85 63.3352 154.85 41.15C154.85 18.9647 136.865 0.97998 114.68 0.97998C92.4947 0.97998 74.5099 18.9647 74.5099 41.15C74.5099 63.3352 92.4947 81.32 114.68 81.32Z"
                fill="#49B04D"
              />
              <path
                d="M56.2699 89.76C49.8999 84.85 43.0099 80.64 35.6199 77.45C18.5999 70.1 -5.73007 64.1099 2.45993 94.9699C6.25993 109.27 17.3199 123.87 26.2799 131.14L76.3799 170.34C84.5199 177.65 89.0399 188.25 88.3599 199.17C87.8999 206.71 85.7799 212.94 82.7299 220.45C78.7599 230.23 77.0499 240.79 77.8099 251.32C79.2899 272.01 85.8799 300.71 112.36 282.19C119.78 277 125.73 269.97 129.9 261.93C136 250.18 145.96 231.02 146.33 230.43C151.1 222.77 164.2 210.34 188.54 235.54C188.54 235.54 207.24 250.98 209.31 252.22C217.8 257.31 244.29 274.53 249.23 244.92C250.87 235.08 248.45 224.98 242.82 216.74L209.65 168.13C202.67 155.7 216.83 125.55 226.79 106.39L232.25 95.8699C239.6 81.7299 244.5 66.45 246.75 50.68C246.75 50.68 256.07 -22.7301 215.56 13.0199C207.95 19.7399 201.63 27.79 196.69 36.66L177.3 71.47C176.53 72.85 175.78 74.25 175.11 75.69C172.19 81.93 154.74 110.64 82.9999 102.43C72.7499 101.25 62.3999 94.49 56.2699 89.76Z"
                fill="#49B04D"
              />
            </svg>

            <svg
              width="25.61"
              height="22"
              viewBox="0 0 267 230"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M208.63 3.61002L68.72 0.0400391C68.72 0.0400391 -1.74996 105.74 0.810041 105.74L65.66 224.21L195.36 229.32L266.34 109.83L208.63 3.61002ZM133.54 151.6C111.35 151.6 93.37 133.62 93.37 111.43C93.37 89.24 111.35 71.26 133.54 71.26C155.73 71.26 173.71 89.24 173.71 111.43C173.71 133.61 155.72 151.6 133.54 151.6Z"
                fill="#F15A2D"
              />
            </svg>
          </div>
          <div className={`text ${showText ? "move" : ""}`}>
            <p
              className={showText ? "fade-in" : "fade-out"}
              style={{ fontSize: "18px" }}
            >
              أهلا، أنا رَفيق
            </p>
          </div>
        </div>
        <FaBars
          className="toggle-menu"
          onClick={() => setMenu((prev) => !prev)}
        />

        <div className={`link ${menu ? "show" : ""}`}>
          <ul>
            <li>
              <Link to="/home">الرئيسية</Link>
            </li>
            <li>
              <Link to="/about">نبذة عنا</Link>
            </li>
            <li>
              <Link to="/ask">أسال رَفيق</Link>
            </li>
            <li>
              <Link to="/doctors">الأطباء</Link>
            </li>
            <li>
              <Link to="/contactus">تواصل معنا</Link>
            </li>
          </ul>
        </div>
        <button className="btn" onClick={handleButtonClick}>
          {buttonText === "مشاركة"
            ? "مشاركة"
            : isLoggedIn
            ? "تسجيل الخروج"
            : "تسجيل الدخول"}
        </button>
      </div>
    </>
  );
}
