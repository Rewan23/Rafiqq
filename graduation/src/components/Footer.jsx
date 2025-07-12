import React from "react";
import styles from "./Footer.module.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.sections}>
          <div className={styles.column}>
            <h4>تواصل معنا</h4>
            <ul>
              <li>
                <p className={styles.iconLine}>
                  <FaPhoneAlt /> +1 (555) 123-4567
                </p>
              </li>
              <li>
                <p className={styles.iconLine}>
                  <FaClock /> من السبت إلى الأربعاء
                </p>
              </li>
              <li>
                <p className={styles.iconLine}>من 8 صباحاً حتى 10 مساءً</p>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>خدماتنا</h4>
            <ul>
              <li>استشارات ذكية</li>
              <li>محتوى تعليمي</li>
              <li>مجتمع داعم</li>
              <li>‍تواصل مع متخصصين</li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>الرئيسية</h4>
            <ul>
              <li>نبذة عنا</li>
              <li>اسأل رَفيق</li>
              <li>الأطباء</li>
              <li>تواصل معنا</li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>متوفر على</h4>
            <div className={styles.storeButtons}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
              />
            </div>
            <div className={styles.socialIcons}>
              <FaWhatsapp />
              <FaInstagram />
              <FaFacebookF />
              <FaTwitter />
              <FaLinkedinIn />
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2025 All right reserved</p>
        </div>
      </footer>
    </>
  );
}
