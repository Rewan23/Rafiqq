import React from "react";
import styles from "./AboutUs.module.css";

export default function Team() {
  const doctors = [
    {
      id: 1,
      img: "/photo9.jpg",
      name: "د.محمد إبراهيم",
      job: "طبيب أطفال",
    },
    {
      id: 2,
      img: "/photo10.jpg",
      name: "د.سمر يوسف",
      job: "أخصائي تخاطب",
    },
    {
      id: 3,
      img: "/photo11.jpg",
      name: "د.خالد أمجد",
      job: "طبيب نفسي",
    },
    {
      id: 4,
      img: "/photo12.jpg",
      name: "د.أحمد محمد",
      job: "علاج طبيعي",
    },
  ];
  return (
    <div>
      <div className={styles.doctors}>
        <div className={styles.team}>
          <h1 className="title">
            <span className="dot"></span>
            تعرف علي فريقنا
          </h1>
          <p style={{ fontSize: "19px" }}>
            فريق من الخبراء ذوي الخبرة والمهارة
          </p>
          <div className={styles.cards}>
            {doctors.map((card) => (
              <div className={styles.doc} key={card.id}>
                <img src={card.img} alt={card.name} />
                <h1>{card.name}</h1>
                <p style={{ fontSize: "19px" }}>{card.job}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
