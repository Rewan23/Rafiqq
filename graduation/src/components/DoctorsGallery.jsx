import React from 'react';
import styles from './styles/DoctorsSection.module.css';

const doctors = [
  {
    name: 'د. أحمد محمد',
    specialty: 'طبيب أطفال',
    image: '/doctors/doctor1.jpg',
  },
  {
    name: 'د. فاطمة عبد الله',
    specialty: 'أخصائي تخاطب',
    image: '/doctors/doctor2.jpg',
  },
  {
    name: 'د. كريم حسن',
    specialty: 'طبيب نفسي',
    image: '/doctors/doctor3.jpg',
  },
  {
    name: 'د. ليلى خالد',
    specialty: 'علاج طبيعي',
    image: '/doctors/doctor4.jpg',
  },
];

const DoctorsGallery = () => {
  return (
    <section className={styles.doctorsSection}>
      <h2 className={styles.sectionTitle}>فريق الأطباء</h2>
      <div className={styles.grid}>
        {doctors.map((doc, index) => (
          <div key={index} className={styles.card}>
            <img src={doc.image} alt={doc.name} className={styles.image} />
            <h3 className={styles.name}>{doc.name}</h3>
            <p className={styles.specialty}>{doc.specialty}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorsGallery;