import React from "react";
import styles from "./Side.module.css";

export default function Chat({ messages }) {
  return (
    <div className={styles.chat}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={msg.sender === "user" ? styles.userMessage : styles.bot}
        >
          {msg.sender === "bot" ? (
            <>
              <div className={styles.image}>
                <img src="/Group (1).png" />
              </div>
              <div className={styles.text}>
                <p style={{ fontSize: "17px" }}>{msg.text}</p>
              </div>
            </>
          ) : (
            <div className={styles.left}>
              <div className={styles.userWrapper}>
                <img
                  src="/public/human.jpg"
                  className={styles.userImg}
                  alt="User"
                />
                <div className={styles.userBubble}>
                  <p style={{ fontSize: "17px" }}>{msg.text}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
