import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./signup.module.css";

function Verify() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const emailParam = queryParams.get("email");

  const [email, setEmail] = useState(emailParam || "");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success", "error", "info"
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // إظهار رسالة ترحيب إذا كان البريد الإلكتروني مُمرر من صفحة التسجيل
  React.useEffect(() => {
    if (emailParam) {
      setMessage("تم إرسال كود التحقق إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد");
      setMessageType("info");
    }
  }, [emailParam]);

  // التحقق من صحة البريد الإلكتروني
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // التحقق من صحة كود التحقق
  const validateVerificationCode = (code) => {
    return code.length >= 4 && code.length <= 8 && /^\d+$/.test(code);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");
    setMessageType("");

    // التحقق من صحة المدخلات
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!validateEmail(email)) {
      newErrors.email = "صيغة البريد الإلكتروني غير صحيحة";
    }

    if (!verificationCode.trim()) {
      newErrors.verificationCode = "كود التحقق مطلوب";
    } else if (!validateVerificationCode(verificationCode)) {
      newErrors.verificationCode = "كود التحقق يجب أن يكون أرقام فقط (4-8 أرقام)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const url = `https://minimum-birdie-autism-e4d0ba7d.koyeb.app/api/users/verify/${encodeURIComponent(email)}/${verificationCode}`;
      console.log("إرسال طلب التحقق إلى:", url);
      
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      console.log("استجابة الخادم - الحالة:", response.status, response.statusText);

      // قراءة الاستجابة كـ نص أولاً
      const responseText = await response.text();
      console.log("استجابة الخادم (نص):", responseText);
      
      // محاولة تحليل النص كـ JSON
      let data = null;
      try {
        data = JSON.parse(responseText);
        console.log("استجابة الخادم (JSON):", data);
      } catch {
        // إذا فشل تحليل JSON، نستخدم النص كما هو
        data = null;
      }

      if (response.ok) {
        // رسالة النجاح من الخادم أو رسالة افتراضية
        const successMessage = data?.message || responseText || "تم التحقق بنجاح! سيتم توجيهك إلى صفحة تسجيل الدخول خلال ثانيتين";
        setMessage(successMessage);
        setMessageType("success");
        setTimeout(() => navigate("/signup"), 2000);
      } else {
        // معالجة أخطاء محددة من الخادم
        let errorMessage = "فشل التحقق، تأكد من صحة البيانات";
        
        if (response.status === 404) {
          errorMessage = "البريد الإلكتروني غير موجود في النظام";
        } else if (response.status === 400) {
          // خطأ 400 - كود التحقق غير صحيح
          errorMessage = data?.message || responseText || "كود التحقق غير صحيح";
          console.log("خطأ 400 - تفاصيل:", { data, responseText });
        } else if (response.status === 409) {
          errorMessage = "تم التحقق من هذا الحساب مسبقاً";
        } else if (data?.message) {
          errorMessage = data.message;
        } else if (responseText) {
          errorMessage = responseText;
        }
        
        setMessage(errorMessage);
        setMessageType("error");
      }
    } catch (error) {
      console.error("خطأ في الاتصال:", error);
      setMessage("حدث خطأ أثناء الاتصال بالخادم. تأكد من اتصالك بالإنترنت");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClassName = (fieldName) => {
    return `${styles.input} ${errors[fieldName] ? styles.inputError : ""}`;
  };

  const getMessageStyle = () => {
    switch (messageType) {
      case "success":
        return styles.successMsg;
      case "error":
        return styles.errorMsg;
      case "info":
        return styles.successMsg;
      default:
        return styles.successMsg;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <img
          src="/back.jpg"
          alt="Medical"
          className={styles.image}
        />
      </div>

      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>تفعيل الحساب</h2>

          <form onSubmit={handleVerify}>
            <label className={styles.label}>البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ادخل البريد الإلكتروني"
              className={getInputClassName("email")}
              disabled={isLoading}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}

            <label className={styles.label}>كود التفعيل</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="ادخل كود التفعيل (4-8 أرقام)"
              className={getInputClassName("verificationCode")}
              disabled={isLoading}
              maxLength={8}
            />
            {errors.verificationCode && <p className={styles.errorText}>{errors.verificationCode}</p>}

            <button 
              type="submit" 
              className={`${styles.submitBtn} ${isLoading ? styles.loading : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "جاري التحقق..." : "تفعيل الحساب"}
            </button>

            {emailParam && (
              <button 
                type="button" 
                className="btn"
                onClick={() => {
                  setMessage("تم إرسال كود جديد إلى بريدك الإلكتروني");
                  setMessageType("info");
                }}
                disabled={isLoading}
                style={{ marginTop: "10px", width: "100%" }}
              >
                إعادة إرسال الكود
              </button>
            )}
          </form>

          {message && (
            <p className={getMessageStyle()}>{message}</p>
          )}

          <div style={{ 
            marginTop: "20px", 
            padding: "15px", 
            backgroundColor: "#e3f2fd", 
            borderRadius: "8px", 
            borderLeft: "4px solid #2196f3",
            direction: "rtl"
          }}>
            <p style={{ margin: "5px 0", fontSize: "12px", color: "#1976d2" }}>
              • تأكد من إدخال البريد الإلكتروني المستخدم في التسجيل
            </p>
            <p style={{ margin: "5px 0", fontSize: "12px", color: "#1976d2" }}>
              • كود التحقق مكون من 4-8 أرقام
            </p>
            <p style={{ margin: "5px 0", fontSize: "12px", color: "#1976d2" }}>
              • إذا لم تستلم الكود، تحقق من مجلد الرسائل غير المرغوب فيها
            </p>
          </div>

          <p className={styles.footerText}>
            <button
              className="btn"
              onClick={() => !isLoading && navigate("/login")}
              disabled={isLoading}
            >
              العودة إلى التسجيل
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Verify;
