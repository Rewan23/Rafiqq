import React, { useState } from "react";
import Side from "./Side";
import styles from "./Side.module.css";
import NavBar from "./Navbar";
import Chat from "./Chat";
import Box from "./Box";
import Main from "./main";

export default function Ask({ buttonText }) {
  const [display, setDisplay] = useState(true);
  const [firstQuestionAsked, setFirstQuestionAsked] = useState(false);

  const [allChats, setAllChats] = useState([
    {
      id: 1,
      name: "محادثة 1",
      messages: [{ text: "أهلا أنا رفيق 👶", sender: "bot" }],
    },
  ]);

  const [currentChatId, setCurrentChatId] = useState(1);
  const [input, setInput] = useState("");

  const currentChat = allChats.find((chat) => chat.id === currentChatId);

  const [userData, setUserData] = useState({
    الاسم: "",
    العمر: "",
    العلاقة: "",
    الجنس: "",
    "العرق / الأصل الجغرافي": "",
    "هل عانى من الصفراء عند الولادة": "",
    "هل يوجد تاريخ عائلي مع التوحد": "",
    "بلد الإقامة": "",
    "هل تم استخدام التطبيق من قبل": "",
    "هل يستمتع الطفل بالتأرجح أو التقافز (مثل على الأرجوحة أو عند حمله)؟": "",
    "هل يبدي الطفل اهتمامًا بالأطفال الآخرين (مثل اللعب معهم أو مشاهدتهم)؟": "",
    "هل يحب الطفل التسلق على الأشياء (مثل السلالم أو الأثاث)؟": "",
    "هل يستمتع الطفل بلعبة الغميضة أو الكشف (مثل إخفاء الوجه والظهور)؟": "",
    "هل يمارس الطفل اللعب التخيلي (مثل التظاهر باستخدام الهاتف أو الدمى)؟": "",
    "هل يشير الطفل بإصبع السبابة لطلب شيء (مثل لعبة أو طعام)؟": "",
    "هل يشير الطفل بإصبع السبابة لإظهار الاهتمام (مثل الإشارة إلى طائر)؟": "",
    "هل يلعب الطفل بشكل صحيح مع الألعاب الصغيرة (مثل تركيب المكعبات)؟": "",
    "هل يحضر الطفل أشياء ليظهرها لك (مثل لعبة أو كتاب)؟": "",
    "هل يحافظ الطفل على التواصل البصري معك لأكثر من ثانية في كل مرة؟": "",
  });

  const questionHints = {
    الاسم: "مثال: محمد",
    العمر: "مثال: 3",
    العلاقة: "مثال: والد / والدة",
    الجنس: "مثال: ذكر / أنثى",
    "العرق / الأصل الجغرافي": "مثال: عربي",
    "هل عانى من الصفراء عند الولادة": "مثال: نعم / لا",
    "هل يوجد تاريخ عائلي مع التوحد": "مثال: نعم / لا",
    "بلد الإقامة": "مثال: الأردن / مصر / ...",
    "هل تم استخدام التطبيق من قبل": "مثال: نعم / لا",
    "هل يستمتع الطفل بالتأرجح أو التقافز (مثل على الأرجوحة أو عند حمله)؟":
      "مثال: نعم / لا",
    "هل يبدي الطفل اهتمامًا بالأطفال الآخرين (مثل اللعب معهم أو مشاهدتهم)؟":
      "مثال: نعم / لا",
    "هل يحب الطفل التسلق على الأشياء (مثل السلالم أو الأثاث)؟":
      "مثال: نعم / لا",
    "هل يستمتع الطفل بلعبة الغميضة أو الكشف (مثل إخفاء الوجه والظهور)؟":
      "مثال: نعم / لا",
    "هل يمارس الطفل اللعب التخيلي (مثل التظاهر باستخدام الهاتف أو الدمى)؟":
      "مثال: نعم / لا",
    "هل يشير الطفل بإصبع السبابة لطلب شيء (مثل لعبة أو طعام)؟":
      "مثال: نعم / لا",
    "هل يشير الطفل بإصبع السبابة لإظهار الاهتمام (مثل الإشارة إلى طائر)؟":
      "مثال: نعم / لا",
    "هل يلعب الطفل بشكل صحيح مع الألعاب الصغيرة (مثل تركيب المكعبات)؟":
      "مثال: نعم / لا",
    "هل يحضر الطفل أشياء ليظهرها لك (مثل لعبة أو كتاب)؟": "مثال: نعم / لا",
    "هل يحافظ الطفل على التواصل البصري معك لأكثر من ثانية في كل مرة؟":
      "مثال: نعم / لا",
  };
  const handleNewChat = () => {
    const newId = allChats.length + 1;
    const newChat = {
      id: newId,
      name: `محادثة ${newId}`,
      messages: [],
    };
    setAllChats([...allChats, newChat]);
    setCurrentChatId(newId);
    setInput("");
  };
  const sendToPredictionAPI = async (inputs) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs }),
      });
      if (!response.ok) throw new Error("فشل الاتصال بالخدمة");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const updatedMessages = [
      ...currentChat.messages,
      { text: input, sender: "user" },
    ];

    setAllChats(
      allChats.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: updatedMessages }
          : chat
      )
    );

    if (!firstQuestionAsked) {
      const firstKey = Object.keys(userData).find((key) => !userData[key]);
      if (firstKey) {
        setFirstQuestionAsked(true);
        setAllChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChatId
              ? {
                  ...chat,
                  messages: [
                    ...updatedMessages,
                    {
                      text: `السؤال الأول: ${firstKey}\n${questionHints[firstKey]}`,
                      sender: "bot",
                    },
                  ],
                }
              : chat
          )
        );
      }
    } else {
      const nextKey = Object.keys(userData).find((key) => !userData[key]);

      if (nextKey) {
        const updatedUserData = { ...userData, [nextKey]: input };
        setUserData(updatedUserData);

        const nextQuestionKey = Object.keys(updatedUserData).find(
          (key) => !updatedUserData[key]
        );

        if (nextQuestionKey) {
          setAllChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === currentChatId
                ? {
                    ...chat,
                    messages: [
                      ...updatedMessages,
                      {
                        text: `السؤال التالي: ${nextQuestionKey}\n${questionHints[nextQuestionKey]}`,
                        sender: "bot",
                      },
                    ],
                  }
                : chat
            )
          );
        } else {
          const result = await sendToPredictionAPI(updatedUserData);
          const reply = result
            ? `✅ التشخيص: ${
                result.prediction
              } بنسبة ${result.probability.toFixed(2)}%`
            : "❌ حصلت مشكلة أثناء الاتصال بالخدمة.";

          setAllChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === currentChatId
                ? {
                    ...chat,
                    messages: [
                      ...updatedMessages,
                      { text: reply, sender: "bot" },
                    ],
                  }
                : chat
            )
          );
        }
      }
    }

    setInput("");
  };

  return (
    <>
      <NavBar buttonText={buttonText} messages={currentChat?.messages || []} />
      <div className={styles.ask}>
        <Side
          display={display}
          setDisplay={setDisplay}
          handleNewChat={handleNewChat}
          allChats={allChats}
          setCurrentChatId={setCurrentChatId}
        />
        <div className="col">
          <Main />
          <div className={styles.split}>
            <Chat messages={currentChat?.messages || []} />
            <Box
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              messages={currentChat?.messages || []}
            />
          </div>
        </div>
      </div>
    </>
  );
}
