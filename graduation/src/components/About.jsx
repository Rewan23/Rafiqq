import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className={styles.about}>
      <div className={styles.us}>
        <div className={styles.photo}>
          <img src="/photo2.jpg" alt="about us" />
        </div>
        <div className={styles.cont}>
          <h1 className="title">
            <span className="dot"></span> نبذة عنا
          </h1>

          <p style={{ fontSize: "20px" }}>
            "رَفيق" هو أكتر من مجرد تطبيق، هو مساحة آمنة لكل أب وأم بيحاولوا
            يفهموا طفلهم المصاب بالتوحد. <br />
            أنشأنا "رَفيق" علشان نكون جنبك في كل خطوة، نسهّل عليك الوصول
            لمعلومات موثوقة، نتواصل معك بلغة بسيطة، ونقدم لك دعم حقيقي من
            متخصصين وأولياء أمور زيك. <br />
            هدفنا إننا نساعدك على اتخاذ قرارات واعية تخص طفلك، ونخلق مجتمع
            متعاون فيه الأمل والعلم يمشوا سوا.
          </p>
          <button
            className="btn"
            style={{ width: "200px" }}
            onClick={() => navigate("/about")}
          >
            المزيد
          </button>
        </div>
      </div>
    </div>
  );
}
