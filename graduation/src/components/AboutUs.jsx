import React from "react";
import Team from "./Team";
import Why from "./Why";
import styles from "./AboutUs.module.css";
import Footer from "./Footer";
import NavBar from "./Navbar";

export default function AboutUs({ isLoggedIn, setIsLoggedIn }) {
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div className={styles.aboutus}>
        <div className={styles.landing}>
          <div className="overlay">
            <div className={styles.text}>
              <h1>نبذة عنا</h1>
              <p> الرئيسية > نبذة عنا </p>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <h1 style={{ fontSize: "24px" }}>
            مرحبًا بك في تطبيق<span style={{ fontSize: "26px" }}> رَفيق!</span>
          </h1>
          <p style={{ fontSize: "21px" }}>
            نحن هنا لدعمك في رحلتك كأب أو أم لطفل من ذوي اضطراب طيف التوحد. في
            رَفيق، نؤمن أن الفهم والتواصل والإرشاد الصحيح يمكنهم إحداث فرق حقيقي
            في حياة طفلك. ندمج بين التعاطف والتكنولوجيا لنساعدك على رعاية طفلك
            بثقة واطمئنان.
          </p>
        </div>
        <div className={styles.us}>
          <div className={styles.message}>
            <h1 className={styles.msg}>رسالتنا</h1>
            <p className={styles.def}>
              في تطبيق رَفيق، رسالتنا هي دعم أسر الأطفال المصابين بالتوحد من
              خلال توفير الوصول السهل إلى أطباء متخصصين، ومجتمع داعم من أولياء
              الأمور، وأدوات ذكية تُسهّل الحياة اليومية.
              <br /> نلتزم بتوفير بيئة آمنة وداعمة، يشعر فيها الآباء بأنهم
              مسموعون ومفهومون ومقدَّرون. من خلال الدمج بين الاستشارات الطبية،
              ومساعدة الشات بوت، والتواصل بين أولياء الأمور، نسعى إلى تعزيز
              الوعي والتعليم والراحة النفسية.
              <br /> تركيزنا لا يقتصر على مواجهة التحديات، بل يمتد أيضًا إلى
              الاحتفال بالتقدم، وتبادل الحلول، وصناعة مستقبل أكثر إشراقًا لكل
              طفل وكل أسرة
            </p>
          </div>
        </div>
        <Team />
        <Why />
        <div className={styles.us}>
          <div className={styles.message}>
            <h1 className={styles.msg}>رؤيتنا</h1>
            <p className={styles.def}>
              نطمح في تطبيق رَفيق إلى أن نكون منصة رائدة على مستوى العالم في دعم
              أسر الأطفال المصابين بالتوحد، من خلال تقديم خدمات رقمية متميزة
              تُحدث فرقًا حقيقيًا في حياة الأسرة والطفل. رؤيتنا هي بناء مستقبل
              تُصبح فيه رعاية الأطفال ذوي التوحد أكثر فهمًا، أكثر تفاعلًا، وأكثر
              شمولًا للجميع. يهدف تطبيق رفيق إلى دمج التكنولوجيا والابتكار في
              تقديم الدعم الأسري والطبي، حيث يتمكن الأهالي من الوصول بسهولة إلى
              استشارات موثوقة، ومجتمع داعم، وحلول عملية تُسهّل التحديات اليومية.
              نحن نؤمن بعالم يشعر فيه كل طفل بالتقدير، وكل أسرة بالاحتواء،
              وتُقدَّم فيه الرعاية بكل حب ووعي.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
