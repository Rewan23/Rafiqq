import React from "react";
import styles from "./AboutUs.module.css";
export default function Why() {
  return (
    <div className={styles.why}>
      <div className={styles.choose}>
        <h1 className="title">
          <span className="dot"></span>
          لماذا تختار رَفيق؟
        </h1>
        <p className={styles.note}>
          في "رَفيق"، نحن لا نقدم مجرد تطبيق، بل نمنحك شريكًا حقيقيًا في رحلتك
          مع طفلك. إليك أبرز ما يميزنا:
        </p>
        <div className={styles.whyContent}>
          <div className={styles.center}>
            <div className={styles.col}>
              <div className={styles.image}>
                <img
                  src="/public/photo8.jpg"
                  alt="Iphone"
                  className={styles.serviceImage}
                />
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.whhy}>
                <div className={styles.text}>
                  <h1>🤖 تكنولوجيا ذكية</h1>
                  <p>شات بوت يجاوبك بسرعة ويديك نصائح فورية في أي وقت.</p>
                </div>
              </div>
              <div className={styles.whhy}>
                <div className={styles.text}>
                  <h1>🤝 مجتمع داعم</h1>
                  <p>
                    انضم لمجتمع من أولياء الأمور لتبادل التجارب، النصائح، والدعم
                    النفسي.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.whhy}>
                <div className={styles.text}>
                  <h1>📱 واجهة سهلة الاستخدام </h1>
                  <p>تصميم بسيط ومريح يناسب كل المستخدمين.</p>
                </div>
              </div>
              <div className={styles.whhy}>
                <div className={styles.text}>
                  <h1>❤️ رؤية إنسانية</h1>
                  <p>
                    نؤمن إن كل طفل مختلف، وكل أسرة تستحق الاهتمام والدعم
                    الحقيقي.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
