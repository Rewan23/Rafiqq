import React from "react";
import styles from "./Side.module.css";

export default function Main() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.sec}>
          <div className={styles.human}>
            <img src="/public/human.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}
