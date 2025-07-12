import React, { useState } from "react";
import styles from "./signup.module.css"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "من فضلك أدخل البريد الإلكتروني";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "صيغة البريد الإلكتروني غير صحيحة";
    }

    if (step === 2) {
      if (!code.trim()) {
        newErrors.code = "من فضلك أدخل كود التحقق";
      } else if (code.length < 4) {
        newErrors.code = "كود التحقق يجب أن يكون 4 أرقام على الأقل";
      }
    }

    if (step === 3) {
      if (!password.trim()) {
        newErrors.password = "من فضلك أدخل كلمة المرور";
      } else if (password.length < 6) {
        newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
      }

      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = "من فضلك أكد كلمة المرور";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
      }
    }

    return newErrors;
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setMessage("");

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://minimum-birdie-autism-e4d0ba7d.koyeb.app/api/users/forgetPassword",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );
        console.log(res);

        if (res.ok) {
          setMessage("تم إرسال كود التحقق إلى بريدك الإلكتروني");
          setStep(2);
        } else {
          const data = await res.json();
          setErrors({ api: data.message || "فشل إرسال الكود، تأكد من البريد" });
        }
      } catch {
        setErrors({ api: "خطأ في الاتصال بالخادم" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setMessage("");

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://minimum-birdie-autism-e4d0ba7d.koyeb.app/api/users/verifyResetCode",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              email, 
              passwordResetCode: code 
            }),
          }
        );

        if (res.ok) {
          setMessage("تم التحقق من الكود بنجاح");
          setStep(3);
        } else {
          const data = await res.json();
          setErrors({ api: data.message || "الكود غير صحيح" });
        }
      } catch {
        setErrors({ api: "خطأ في الاتصال بالخادم" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setMessage("");

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://minimum-birdie-autism-e4d0ba7d.koyeb.app/api/users/resetPassword",
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              password,
              passwordConfirmation: confirmPassword,
            }),
          }
        );

        if (res.ok) {
          setMessage("تم إعادة تعيين كلمة المرور بنجاح");
          setTimeout(() => navigate("/signup"), 2000);
        } else {
          const data = await res.json();
          setErrors({ api: data.message || "فشل إعادة تعيين كلمة المرور" });
        }
      } catch {
        setErrors({ api: "خطأ في الاتصال بالخادم" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getInputClassName = (fieldName) => {
    return `${styles.input} ${errors[fieldName] ? styles.inputError : ""}`;
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "استرجاع كلمة المرور";
      case 2:
        return "التحقق من الكود";
      case 3:
        return "إعادة تعيين كلمة المرور";
      default:
        return "استرجاع كلمة المرور";
    }
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
          <h2 className={styles.title}>{getStepTitle()}</h2>

          {step === 1 && (
            <form onSubmit={handleSendEmail}>
              <label className={styles.label}>البريد الإلكتروني</label>
              <input
                type="email"
                placeholder="ادخل بريدك الإلكتروني"
                className={getInputClassName("email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email}</p>
              )}

              <button 
                type="submit" 
                className={`${styles.submitBtn} ${isLoading ? styles.loading : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "جاري الإرسال..." : "إرسال كود التحقق"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyCode}>
              <label className={styles.label}>كود التحقق</label>
              <input
                type="text"
                placeholder="ادخل كود التحقق المرسل لبريدك"
                className={getInputClassName("code")}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isLoading}
                maxLength={6}
              />
              {errors.code && (
                <p className={styles.errorText}>{errors.code}</p>
              )}

              <button 
                type="submit" 
                className={`${styles.submitBtn} ${isLoading ? styles.loading : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "جاري التحقق..." : "تحقق من الكود"}
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <label className={styles.label}>كلمة المرور الجديدة</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="ادخل كلمة المرور الجديدة"
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
                <p className={styles.errorText}>{errors.password}</p>
              )}

              <label className={styles.label}>تأكيد كلمة المرور</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="أكد كلمة المرور"
                  className={getInputClassName("confirmPassword")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={styles.eyeIcon}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className={styles.errorText}>{errors.confirmPassword}</p>
              )}

              <button 
                type="submit" 
                className={`${styles.submitBtn} ${isLoading ? styles.loading : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "جاري إعادة التعيين..." : "إعادة تعيين كلمة المرور"}
              </button>
            </form>
          )}

          {message && (
            <p className={styles.successMsg}>{message}</p>
          )}
          {errors.api && (
            <p className={styles.errorMsg}>{errors.api}</p>
          )}

          <p className={styles.footerText}>
            <button
              className={styles.btn}
              onClick={() => !isLoading && navigate("/login")}
              disabled={isLoading}
            >
              العودة لتسجيل الدخول
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
