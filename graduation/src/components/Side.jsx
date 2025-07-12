import React, { useState } from "react";
import styles from "./Side.module.css";

export default function Side({ handleNewChat, allChats, setCurrentChatId }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.contant} ${isCollapsed ? styles.collapsed : ""}`}
      >
        <aside className={styles.side}>
          <div className={styles.icon}>
            <div className={styles.photo}>
              <img
                src="/public/Group.png"
                className={styles.one}
                onClick={handleNewChat}
                title="محادثة جديدة"
              />
            </div>
            <div className={styles.photo}>
              <img
                src="/public/Vector.png"
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{ cursor: "pointer" }}
                title="إخفاء/إظهار الشات"
              />
            </div>
          </div>

          {!isCollapsed && (
            <>
              <h3>المحادثات</h3>
              <div className={styles.text}>
                {allChats.map((chat) => (
                  <p
                    key={chat.id}
                    style={{
                      fontSize: "14px",
                      cursor: "pointer",
                      marginBottom: "8px",
                    }}
                    onClick={() => setCurrentChatId(chat.id)}
                  >
                    {chat.name || "محادثة بدون اسم"}
                  </p>
                ))}
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
