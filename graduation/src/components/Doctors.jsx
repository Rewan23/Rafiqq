import React, { useState } from "react";
import styles from "./styles/App.module.css";

import SearchFilter from "./SearchFilter";
import DoctorsSection from "./DoctorsSection";
import Footer from "./Footer";
import NavBar from "./Navbar";

const doctorsData = [
  {
    name: "د. أحمد محمد",
    specialty: "طبيب أطفال",
    image: "/public/doctor1.jpg",
  },
  {
    name: "د. فاطمة عبد الله",
    specialty: "أخصائي تخاطب",
    image: "/public/doctor2.jpg",
  },
  {
    name: "د. كريم حسن",
    specialty: "طبيب نفسي",
    image: "/public/doctor3.jpg",
  },
  {
    name: "د. ليلى خالد",
    specialty: "علاج طبيعي",
    image: "/public/doctor4.jpg",
  },
  {
    name: "د. سارة مصطفى",
    specialty: "طبيب أطفال",
    image: "/public/doctor5.jpg",
  },
  {
    name: "د. خالد سمير",
    specialty: "اخصائي تخاطب",
    image: "/public/doctor6.jpg",
  },
  {
    name: "د. ندى سعيد",
    specialty: "علاج طبيعي",
    image: "/public/doctor7.jpg",
  },
  {
    name: "د. رامي جاد",
    specialty: "طبيب نفسي",
    image: "/public/doctor8.jpg",
  },
  {
    name: "د. نجلاء يسري",
    specialty: "اخصائي تخاطب",
    image: "/public/doctor9.jpg",
  },
  {
    name: "د. أيمن نبيل",
    specialty: "طبيب أطفال",
    image: "/public/doctor10.jpg",
  },
];

export default function Doctors({ isLoggedIn, setIsLoggedIn }) {
  const [filter, setFilter] = useState("كل الأطباء");
  const [searchText, setSearchText] = useState("");

  const filteredDoctors = doctorsData.filter((doc) => {
    const matchesSearch =
      doc.name.includes(searchText) || doc.specialty.includes(searchText);
    const matchesFilter = filter === "كل الأطباء" || doc.specialty === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div className={styles.app}>
        <div
          className={styles.heroSection}
          style={{
            backgroundImage: "url('/doc.jpg')",

            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "700px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "0 40px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              padding: "20px 30px",
              borderRadius: "15px",
              maxWidth: "600px",
              textAlign: "right",
              color: "#5a5aad",
            }}
          >
            <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "bold" }}>
              الأطباء
            </h1>
            <p style={{ marginTop: "10px", fontSize: "18px" }}>
              الرئيسية - الأطباء
            </p>
          </div>
        </div>

        <SearchFilter
          onFilterChange={setFilter}
          onSearchChange={setSearchText}
        />

        <DoctorsSection
          doctors={filteredDoctors}
          filter={filter}
          searchText={searchText}
        />
      </div>
      <Footer />
    </>
  );
}
