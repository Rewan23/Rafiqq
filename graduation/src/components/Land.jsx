import React from "react";
import styles from "./Land.module.css";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar";
export default function Land({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div className={styles.landing}>
        <div className={styles.land}>
          <div className={styles.sec}>
            <div className={styles.cont}>
              <h1 className={styles.title}>
                رحلة طفلك للتطور تبدأ من هنا… مع <span>رَفيق.</span>
              </h1>
              <p>
                منصة ذكية تجمع بين التوعية، الدعم، والتواصل مع المتخصصين،
                لمساعدتك في فهم احتياجات طفلك المصاب بالتوحد وتطوير مهاراته
                يومًا بعد يوم.
              </p>
              <button
                className="btn"
                style={{ width: "200px" }}
                onClick={() => navigate("/contactus")}
              >
                تواصل معنا
              </button>
            </div>
          </div>
          <div className={styles.photo}>
            <img src="/public/ahmed.png" alt="landing" />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.wid}>
            <h1>هل أنت مستعد لإعادة رسم رحلة تطوّر طفلك؟</h1>
            <p>
              اكتشف قوة التوجيه المتخصص، التكنولوجيا، والدعم المجتمعي في منصة
              ذكية مصممة لمساعدة أهالي الأطفال المصابين بالتوحد.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
