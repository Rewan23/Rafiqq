import React, { useState } from "react";
import styles from "./styles/SearchFilter.module.css";
import { FaSearch, FaChevronDown } from "react-icons/fa";

const SearchFilter = ({ onFilterChange, onSearchChange }) => {
  const [showOptions, setShowOptions] = useState(false);
  const specializations = [
    "كل الأطباء",
    "طبيب أطفال",
    "أخصائي تخاطب",
    "طبيب نفسي",
    "علاج طبيعي",
  ];

  const handleSelect = (spec) => {
    setShowOptions(false);
    onFilterChange(spec);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterWrapper}>
        <div className={styles.dropdownWrapper}>
          <button onClick={() => setShowOptions(!showOptions)}>
            تصنيف حسب <FaChevronDown className={styles.iconArrow} />
          </button>
          {showOptions && (
            <ul className={styles.dropdown}>
              {specializations.map((spec, i) => (
                <li key={i} onClick={() => handleSelect(spec)}>
                  {spec}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.searchBox}>
          <FaSearch className={styles.iconSearch} />
          <input
            type="text"
            placeholder="ابحث عن طبيب"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
