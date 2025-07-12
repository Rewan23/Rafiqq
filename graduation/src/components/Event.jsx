import React, { useState } from "react";
import styles from "./Home.module.css";

const getCurrentDate = () => {
  return new Date().toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function Event() {
  const cardsData = [
    {
      id: 1,
      title: "تعليمية",
      description: "دليل مختصر للتعامل مع نوبات الغضب عند الأطفال التوحديين",
      details:
        "الطبيب مش بس بيشخّص، لكن بيدعم الأسرة نفسيًا بعد الصدمة. بكلمة هادية وتوجيه بسيط، يقدر يطمنهم ويبدأ معاهم أول خطوة في مشوار التقبل والعلاج.",
      date: getCurrentDate(),
    },
    {
      id: 2,
      title: "توعية",
      description: "رحلة الأم والأب مع التوحد: من الصدمة للفهم",
      details:
        "الطبيب مش بس بيشخّص، لكن بيدعم الأسرة نفسيًا بعد الصدمة. بكلمة هادية وتوجيه بسيط، يقدر يطمنهم ويبدأ معاهم أول خطوة في مشوار التقبل والعلاج.",
      date: getCurrentDate(),
    },
    {
      id: 3,
      title: "الطبيب",
      description: "دور الطبيب في دعم التوحد أساسي بعد التشخيص الأولي للطفل.",
      details:
        "الطبيب مش بس بيشخّص، لكن بيدعم الأسرة نفسيًا بعد الصدمة. بكلمة هادية وتوجيه بسيط، يقدر يطمنهم ويبدأ معاهم أول خطوة في مشوار التقبل والعلاج.",
      date: getCurrentDate(),
    },
  ];

  const [activeCardId, setActiveCardId] = useState(null);

  return (
    <div className={styles.event}>
      <div className={styles.last}>
        <div className={styles.bar}>
          <h1 className="title">
            <span
              className="dot
            "
            ></span>
            اخر اخبارنا
          </h1>
          <p>أطلع ع اخر مدوناتنا</p>
        </div>

        <div className={styles.container}>
          {cardsData.map((card, index) => (
            <div
              className={`${styles.card} ${
                styles[["one", "two", "three"][index]]
              }`}
              key={card.id}
            >
              <div className={styles.overlay}>
                <div className={styles.info}>
                  <div className={styles.top}>
                    <h1 className="title">
                      <span
                        className="dot
                      "
                      ></span>
                      {card.title}
                    </h1>
                  </div>
                  <p className={styles.description}>{card.description}</p>
                </div>
                <div className={styles.bot}>
                  <svg
                    width="48"
                    height="49"
                    viewBox="0 0 48 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() =>
                      setActiveCardId((prev) =>
                        prev === card.id ? null : card.id
                      )
                    }
                  >
                    <circle cx="24" cy="24.5" r="24" fill="#4456A5" />
                    <path
                      d="M19.3179 16.5819C19.3176 16.3036 19.4278 16.0366 19.6242 15.8395C19.8206 15.6424 20.0872 15.5313 20.3655 15.5307L32.2453 15.5104C32.5236 15.5101 32.7906 15.6203 32.9877 15.8167C33.1848 16.0131 33.2958 16.2797 33.2965 16.558L33.3168 28.4378C33.322 28.5787 33.2988 28.7193 33.2485 28.851C33.1982 28.9828 33.1219 29.103 33.0242 29.2047C32.9264 29.3063 32.8092 29.3872 32.6795 29.4425C32.5498 29.4978 32.4102 29.5265 32.2692 29.5267C32.1282 29.5269 31.9886 29.4988 31.8587 29.4439C31.7288 29.389 31.6113 29.3085 31.5132 29.2072C31.4151 29.1059 31.3384 28.9859 31.2877 28.8544C31.237 28.7228 31.2133 28.5823 31.218 28.4414L31.2021 19.0959L17.1781 33.1678C16.9815 33.3651 16.7146 33.4762 16.4362 33.4766C16.1577 33.4771 15.8904 33.3669 15.6931 33.1703C15.4959 32.9738 15.3848 32.7069 15.3843 32.4284C15.3839 32.1499 15.494 31.8826 15.6906 31.6854L29.7145 17.6135L20.3691 17.6295C20.0908 17.6298 19.8238 17.5196 19.6267 17.3232C19.4296 17.1267 19.3185 16.8601 19.3179 16.5819Z"
                      fill="white"
                    />
                  </svg>
                  <span className={styles.date}>{card.date}</span>
                </div>
              </div>

              <div
                className={`${styles.data} ${
                  activeCardId === card.id ? styles.active : ""
                }`}
                onClick={() =>
                  setActiveCardId((prev) => (prev === card.id ? null : card.id))
                }
              >
                <h1 className="title">
                  <span
                    className="dot
                  "
                  ></span>
                  {card.title}
                </h1>
                <p>{card.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
