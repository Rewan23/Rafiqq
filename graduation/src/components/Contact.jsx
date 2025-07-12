import React from "react";
import styles from "./ContactUs.module.css";
import Form from "./Form";
import Footer from "./Footer";
import NavBar from "./Navbar";
export default function Contact({ isLoggedIn, setIsLoggedIn }) {
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div className={styles.page}>
        <section className={styles.landing}>
          <div className={styles.contactText}>
            <h1>تواصل معنا</h1>
            <p>ارسل استفسارك وتواصل معنا</p>
          </div>
        </section>

        <Form />
        <img src="./public/map.png" alt="الخريطة" className={styles.mapImg} />
      </div>
      <Footer />
    </>
  );
}
