import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.landing}>
        <div className="overlay">
          <div className={styles.para}>
            <div className={styles.content}>
              <h1>رَفيقك الذكي... لفهم طفلك بشكل أفضل</h1>
              <p style={{ fontSize: "19px" }}>
                منصة تساعد أولياء الأمور على اتخاذ قرارات مدروسة تخص أطفالهم
                المصابين بالتوحد، من خلال استشارات متخصصة، دردشة ذكية، ودعم
                مجتمعي في متناول يدك
              </p>
              <button className="btn" onClick={() => navigate("/ask")}>
                ابدأ رحلتك مع رَفيق
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
