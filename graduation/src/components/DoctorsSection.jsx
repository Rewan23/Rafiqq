import React from "react";
import styles from "./styles/DoctorsSection.module.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const DoctorsSection = ({ doctors, filter, searchText }) => {
  const hasSearched =
    filter !== "كل الأطباء" || (searchText && searchText.trim() !== "");

  return (
    <section className={styles.doctorsSection}>
      {hasSearched && <h2 className={styles.sectionTitle}>نتائج البحث</h2>}

      {doctors.length === 0 ? (
        <p className={styles.noResults}>لا يوجد أطباء مطابقين لبحثك</p>
      ) : (
        <>
          <div className={styles.grid}>
            {doctors.map((doc, index) => (
              <div key={index} className={styles.card}>
                <img src={doc.image} alt={doc.name} className={styles.image} />
                <h3 className={styles.name}>{doc.name}</h3>
                <p className={styles.specialty}>{doc.specialty}</p>
              </div>
            ))}
          </div>

          <div className={styles.pagination}>
            <FaChevronRight className={styles.arrowIcon} />
            <span className={styles.pageNumber}>1</span>
            <FaChevronLeft className={styles.arrowIcon} />
          </div>
        </>
      )}
    </section>
  );
};

export default DoctorsSection;
