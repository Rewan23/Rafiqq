import React, { useState } from "react";
import styles from "./signup.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userRole, setUserRole] = useState("parent"); 

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;
    const newErrors = {};

    if (!name) newErrors.name = "الاسم مطلوب";
    if (!email) newErrors.email = "البريد الإلكتروني أو رقم الهاتف مطلوب";
    if (!password) newErrors.password = "كلمة المرور مطلوبة";
    if (!confirmPassword) newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;

    if (email && !emailRegex.test(email) && !phoneRegex.test(email)) {
      newErrors.email = "أدخل بريدًا إلكترونيًا أو رقم هاتف صحيح";
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (password && !passwordRegex.test(password)) {
      newErrors.password =
        "كلمة المرور يجب أن تحتوي على حروف وأرقام ولا تقل عن 6 أحرف";
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(
        "https://minimum-birdie-autism-e4d0ba7d.koyeb.app/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            passwordConfirmation: formData.confirmPassword,
            phoneNumber: 1234567890,
            role: userRole,
            ...(userRole === "parent" && { children: [] }), 
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("تم التسجيل بنجاح", data);
        
        navigate(`/verify?email=${encodeURIComponent(formData.email)}`);
        return; 
      } else {
        const errorData = await response.json();
        console.log("فشل التسجيل:", errorData);
        
   
        let errorMessage = "فشل في إنشاء الحساب";
        
        if (errorData.message === "Validation error" && errorData.errors) {
          
          const firstError = errorData.errors[0];
          if (firstError.path === "body.children") {
            errorMessage = "يجب إضافة معلومات الأطفال للوالدين";
          } else if (firstError.path === "body.email") {
            errorMessage = "البريد الإلكتروني غير صحيح";
          } else if (firstError.path === "body.password") {
            errorMessage = "كلمة المرور غير صحيحة";
          } else {
            errorMessage = firstError.message || errorData.message;
          }
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
        
        setErrors({ api: errorMessage });
      }
    } catch (error) {
      console.error("حصلت مشكلة", error);
      setErrors({ api: "حدث خطأ في الاتصال بالخادم" });
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
          <h2 className={styles.title}>إنشاء الحساب</h2>
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold", color: "#4456a5" }}>
              نوع الحساب:
            </label>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => setUserRole("parent")}
                style={{
                  padding: "8px 16px",
                  border: "2px solid #4456a5",
                  borderRadius: "6px",
                  background: userRole === "parent" ? "#4456a5" : "transparent",
                  color: userRole === "parent" ? "white" : "#4456a5",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                والد/ة
              </button>
              <button
                type="button"
                onClick={() => setUserRole("doctor")}
                style={{
                  padding: "8px 16px",
                  border: "2px solid #4456a5",
                  borderRadius: "6px",
                  background: userRole === "doctor" ? "#4456a5" : "transparent",
                  color: userRole === "doctor" ? "white" : "#4456a5",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                طبيب/ة
              </button>
            </div>
          </div>

          <button className={styles.socialBtn}>
            <img
              src="https://img.icons8.com/color/24/google-logo.png"
              alt="google"
            />
            المتابعة باستخدام Google
          </button>

          <button className={styles.socialBtn}>
            <img
              src="https://img.icons8.com/ios-filled/24/mac-os.png"
              alt="apple"
            />
            المتابعة باستخدام Apple
          </button>

          {userRole === "parent" && (
            <p style={{ 
              textAlign: "center", 
              color: "#666", 
              fontSize: "12px", 
              marginBottom: "15px",
              direction: "rtl"
            }}>
              يمكنك إضافة معلومات الأطفال لاحقاً من إعدادات الحساب
            </p>
          )}

          <label className={styles.label}>الاسم بالكامل</label>
          <input
            type="text"
            placeholder="ادخل اسمك بالكامل"
            className={styles.input}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}

          <label className={styles.label}>
            البريد الإلكتروني أو رقم الهاتف
          </label>
          <input
            type="text"
            placeholder="ادخل بريدك الإلكتروني أو رقم هاتفك"
            className={styles.input}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <label className={styles.label}>كلمة المرور</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="ادخل كلمة المرور"
              className={styles.input}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className={styles.eyeIcon}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <label className={styles.label}>تأكيد كلمة المرور</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="ادخل كلمة المرور للتأكيد"
              className={styles.input}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className={styles.eyeIcon}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword}</p>
          )}

          <button className={styles.submitBtn} onClick={handleSubmit}>
            إنشاء الحساب
          </button>

          {errors.api && (
            <p className={styles.error} style={{ textAlign: "center", marginTop: "10px" }}>
              {errors.api}
            </p>
          )}

          <p className={styles.footerText}>
            لديك حساب؟{" "}
            <button
              className={styles.loginLink}
              onClick={() => navigate("/login")}
            >
              تسجيل الدخول
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
