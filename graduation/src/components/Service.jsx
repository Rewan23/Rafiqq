import React from "react";
import styles from "./Home.module.css";

export default function Service() {
  return (
    <div className={styles.service}>
      <div className={styles.seerv}>
        <h1 className="title">
          <span className="dot"></span>
          خدماتنا
        </h1>
        <div className={styles.serviceContent}>
          <div className={styles.col}>
            <div className={styles.srv}>
              <div className={styles.text}>
                <h1>🤖 استشارات ذكية</h1>
                <p>
                  شات بوت مدعوم بالذكاء الاصطناعي يقدم نصائح سريعة ومعلومات
                  موثوقة بناءً على حالة طفلك.
                </p>
              </div>
            </div>
            <div className={styles.srv}>
              <div className={styles.text}>
                <h1>🤝 مجتمع داعم</h1>
                <p>
                  انضم لمجتمع من أولياء الأمور لتبادل التجارب، النصائح، والدعم
                  النفسي.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.srv}>
              <div className={styles.text}>
                <h1>👨‍️ تواصل مع متخصصين</h1>
                <p>
                  احجز جلسات استشارية مع أطباء وأخصائيين في مجال التوحد لمساعدتك
                  في فهم وتوجيه سلوك طفلك.
                </p>
              </div>
            </div>
            <div className={styles.srv}>
              <div className={styles.text}>
                <h1>📚 محتوى تعليمي</h1>
                <p>
                  مقالات، فيديوهات، ونصائح يومية تساعدك على تطوير مهارات طفلك
                  وتحسين تواصله.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.image}>
              <img
                src="/public/photo3.png"
                alt="Iphone"
                className={styles.serviceImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
