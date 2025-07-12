import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // التحقق من حالة تسجيل الدخول عند تحميل الصفحة
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      
      checkTokenValidity(token);
    }
  }, []);

  const checkTokenValidity = async (token) => {
    try {
      const response = await fetch(
        "https://minimum-birdie-autism-e4d0ba7d.koyeb.app/api/auth/me",
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        
        setIsLoggedIn(true);
        navigate("/home");
      } else {
       
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("خطأ في التحقق من التوكن:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!emailOrPhone.trim()) {
      newErrors.emailOrPhone = "من فضلك أدخل البريد الإلكتروني أو رقم الهاتف";
    } else if (
      !emailRegex.test(emailOrPhone) &&
      !phoneRegex.test(emailOrPhone)
    ) {
      newErrors.emailOrPhone = "صيغة غير صحيحة للبريد أو رقم الهاتف";
    }

    if (!password.trim()) {
      newErrors.password = "من فضلك أدخل كلمة المرور";
    } else if (password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setSuccessMsg("");

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      
      try {
        const response = await fetch(
          "https://minimum-birdie-autism-e4d0ba7d.koyeb.app/api/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: emailOrPhone,
              password: password,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          // حفظ التوكن في localStorage
          localStorage.setItem("token", data.token);
          
          // حفظ معلومات المستخدم إذا كانت متوفرة
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
          }
          
          setSuccessMsg("تم تسجيل الدخول بنجاح!");
          setIsLoggedIn(true);
          
          // توجيه المستخدم إلى الصفحة الرئيسية
          setTimeout(() => navigate("/"), 1000);
        } else {
          // معالجة أخطاء محددة من الخادم
          let errorMessage = "فشل تسجيل الدخول. تأكد من البيانات.";
          
          if (response.status === 401) {
            errorMessage = "البريد الإلكتروني أو كلمة المرور غير صحيحة";
          } else if (response.status === 404) {
            errorMessage = "البريد الإلكتروني غير موجود في النظام";
          } else if (response.status === 403) {
            errorMessage = "الحساب غير مفعل. يرجى التحقق من بريدك الإلكتروني";
          } else if (data.message) {
            errorMessage = data.message;
          }
          
          setErrors({ api: errorMessage });
        }
      } catch (error) {
        console.error("خطأ في الاتصال:", error);
        setErrors({ api: "حدث خطأ أثناء الاتصال بالخادم. تأكد من اتصالك بالإنترنت" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getInputClassName = (fieldName) => {
    return `${styles.input} ${errors[fieldName] ? styles.inputError : ""}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <img
          src="/public/stethoscope.jpg"
          alt="Medical"
          className={styles.image}
        />
      </div>

      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>تسجيل الدخول</h2>

          <button className={styles.socialBtn} disabled={isLoading}>
            <img
              src="https://img.icons8.com/color/24/google-logo.png"
              alt="google"
            />
            المتابعة باستخدام Google
          </button>

          <button className={styles.socialBtn} disabled={isLoading}>
            <img
              src="https://img.icons8.com/ios-filled/24/mac-os.png"
              alt="apple"
            />
            المتابعة باستخدام Apple
          </button>

          <form onSubmit={handleSubmit}>
            <label className={styles.label}>
              البريد الإلكتروني أو رقم الهاتف
            </label>
            <input
              type="text"
              placeholder="ادخل بريدك الإلكتروني أو رقم هاتفك"
              className={getInputClassName("emailOrPhone")}
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              disabled={isLoading}
            />
            {errors.emailOrPhone && (
              <p className={styles.errorText}>
                {errors.emailOrPhone}
              </p>
            )}

            <label className={styles.label}>كلمة المرور</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="ادخل كلمة المرور"
                className={getInputClassName("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeIcon}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className={styles.errorText}>
                {errors.password}
              </p>
            )}

            <p
              className={styles.forgotPassword}
              onClick={() => !isLoading && navigate("/forget-password")}
            >
              هل نسيت كلمة المرور؟
            </p>

            <button 
              type="submit" 
              className={`${styles.submitBtn} ${isLoading ? styles.loading : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>

            {successMsg && (
              <p className={styles.successMsg}>{successMsg}</p>
            )}
            {errors.api && (
              <p className={styles.errorMsg}>{errors.api}</p>
            )}
          </form>

          <p className={styles.footerText}>
            ليس لديك حساب؟{" "}
            <button
              className={styles.signupLink}
              onClick={() => !isLoading && navigate("/signup")}
              disabled={isLoading}
            >
              إنشاء حساب
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
