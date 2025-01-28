"use client";
import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Container, FormLabel } from "react-bootstrap";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import classes from "../../components/Buttons/MainButton/MainButton.module.css";
import styles from "../auth.module.css";
import SocialMedia from "../../components/Buttons/SocialMediaButton/SocialMedia";
import MainButton from "../../components/Buttons/MainButton/MainButton";
import FormInput from "../../components/FormInput/FormInput";

const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .transform((value) => (value ? value.trim() : value))
      .matches(
        /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,}$/,
        "Invalid Email address . Please enter a valid email address"
      )
      .email("Invalid Email address . Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .transform((value) => (value ? value.trim() : value))
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: (values) => {
      const trimmedValues = {
        email: values.email.trim(),
        password: values.password.trim(),
        rememberMe: values.rememberMe,
      };
      console.log("Submitted Data:", trimmedValues);
      localStorage.setItem("token", "nadeen");
      router.push("/dashboard");
    },
  });

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    e.target.value = trimmedValue;
    formik.setFieldValue(name, trimmedValue);
    formik.handleBlur(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container className={styles.section}>
      <Form
        onSubmit={formik.handleSubmit}
        className={`${styles.form} `}
        style={{ width: "500px" }}
      >
        <div className={`${styles.formContainer} text-center`}>
          <h3 className={`${styles.title} `}>
            Welcome Back  
          </h3>
        </div>

        {/* EMAIL ADDRESS */}
        <Form.Group controlId="email" className={`${styles.formGroup} mt-2`}>
          <FormLabel className={`${styles.formLabel} `}>
            Email Address
          </FormLabel>
          <FormInput
            id="email"
            type="email"
            name="email"
            size="small"
            placeholder="Enter your registered email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={handleInputBlur}
            isInvalid={formik.touched.email && formik.errors.email}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
        </Form.Group>

        {/* PASSWORD */}
        <Form.Group controlId="password" className={`${styles.formGroup} mt-2`}>
          <div className="position-relative w-100">
            <FormLabel className={`${styles.formLabel} `}>
              Password
            </FormLabel>
            <FormInput
              id="password"
              name="password"
              size="small"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={handleInputBlur}
              onFocus={() => {
                if (!formik.values.email) {
                  formik.setFieldTouched("email", true, true);
                  formik.setFieldError("email", "Email is required");
                }
              }}
              isInvalid={formik.touched.password && formik.errors.password}
              helperText={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""
              }
            />
            <div
              className="position-absolute"
              style={{
                top: "40px",
                right: "20px",
                cursor: "pointer",
                zIndex: 1,
              }}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <IoEyeOutline size={20} />
              ) : (
                <IoEyeOffOutline size={20} />
              )}
            </div>
          </div>
        </Form.Group>

        {/* REMEMBER ME */}
        <Form.Group className=" d-flex justify-content-between align-items-center mt-2 mb-3">
          <Form.Check
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
            label="Remember Me"
            className={styles.rememberMe}
          />
          <Link href="/reset-password" className={styles.forgetPassword} >
            Forgot Password ?
          </Link>
        </Form.Group>

        {/* LOGIN BUTTON */}
        <div className="mt-2">
          <MainButton
            title="Login"
            type="submit"
            className={
              formik.isValid && formik.dirty
                ? classes.activeButton
                : classes.inactiveButton
            }
            // disabled={!(formik.isValid && formik.dirty)}
          />
        </div>

        {/* SOCIAL MEDIA LOGIN */}
        <div className="d-flex justify-content-center align-items-center my-2 my-lg-3">
          <hr className={`${styles.hr} w-25`} />
          <span className={styles.span}>Or login with</span>
          <hr className={`${styles.hr} w-25`} />
        </div>
        <SocialMedia />

        {/* SIGNUP LINK */}
        <div className="mt-4">
          <p className={styles.forgetPassword}>
            don't have an account ?{" "}
            <Link href="/sign-up" className={styles.link}>
              Create An Account
            </Link>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default SignIn;
