import React from "react";
import styles from "./Side.module.css";

export default function Box({ input, setInput, handleSend, messages }) {
  const handleShareChat = () => {
    const text = messages
      .map((msg) => {
        return `${msg.sender === "user" ? "أنت" : "رَفيق"}: ${msg.text}`;
      })
      .join("\n");

    navigator.clipboard.writeText(text);
    alert("تم نسخ المحادثة! 🎉");
  };

  return (
    <div>
      <div className={styles.chat}>
        <div className={styles.send}>
          <div className={styles.down}>
            <div className={styles.win}>
              <div className={styles.rafiq}>
                <img src="/public/Frame 403.png" onClick={handleSend} />
              </div>
              <div className={styles.raf}>
                <textarea
                  placeholder="اسأل رفيق"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && handleSend()
                  }
                  rows={2}
                  className={styles.chatInput}
                />
              </div>
            </div>
            <div className={styles.two}>
              <img src="/public/Frame 400.png" onClick={handleShareChat} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
