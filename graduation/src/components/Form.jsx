import React from "react";
import styles from "./ContactUs.module.css";

export default function Form() {
  return (
    <>
      <section className={styles.doctorsFormSection}>
        <div className={styles.doctorsSide}>
          <img
            src="./public/doctors.jpg"
            alt="الأطباء"
            className={styles.doctorsImg}
          />
        </div>
        <div className={styles.formSide}>
          <div className={styles.formHeaderWrapper}>
            <div className={styles.formHeader}>
              <span className={styles.dot}></span>
              <h3>احجز موعدك</h3>
            </div>
            <p className={styles.formDesc}>سـنرسل لك التأكيد خلال 24 ساعة</p>
          </div>

          <form className={styles.form}>
            <div className={styles.inputRow}>
              <input type="text" placeholder="اسمك" />
              <input type="email" placeholder="بريدك الإلكتروني" />
              <input type="tel" placeholder="رقم الهاتف" />
            </div>
            <textarea placeholder="الرسالة" className={styles.textarea} />
            <button type="submit" className={styles.submitBtn}>
              تأكيد
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
