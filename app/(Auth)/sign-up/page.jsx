"use client";
import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Container, FormLabel } from "react-bootstrap";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import SocialMedia from "../../components/Buttons/SocialMediaButton/SocialMedia";
import MainButton from "../../components/Buttons/MainButton/MainButton";
import classes from "../../components/Buttons/MainButton/MainButton.module.css";
import styles from "../auth.module.css";
import FormInput from "../../components/FormInput/FormInput";

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .transform((value) => (value ? value.trim() : value))
      .matches(
        /^[A-Za-z\s]+$/,
        "Name cannot start with a space. Please enter a valid name."
      )
      .min(2, "The name must contain at least 2 characters")
      .max(20, "Name is too long. Please limit it to [20] characters")
      .required("Name is required"),
    email: Yup.string()
      .transform((value) => (value ? value.trim() : value))
      .matches(
        /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,}$/,
        " Invalid Email address. Please enter a valid email address"
      )
      .max(30, " Sorry. your e-mail must be between 6 and 30 characters long ")
      .email("Invalid Email address. Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .transform((value) => (value ? value.trim() : value))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must be at least 8 characters and contain at least one uppercase letter, lowercase letter, and number"
      )
      .max(30, "Password is too long. Please limit it to [30] characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .transform((value) => (value ? value.trim() : value))
      .oneOf(
        [Yup.ref("password"), null],
        "Passwords do not match. Please try again"
      )
      .required("Passwords do not match. Please try again"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const trimmedValues = {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
        confirmPassword: values.confirmPassword.trim(),
      };
      // console.log(trimmedValues);
      router.push("/company-steps");
    },
  });

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    // console.log(`Trimming ${name}:`, { original: value, trimmed: trimmedValue });

    e.target.value = trimmedValue;
    formik.setFieldValue(name, trimmedValue);
    formik.handleBlur(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  return (
    <Container className={styles.section}>
      <Form
        onSubmit={formik.handleSubmit}
        className={`${styles.form}`}
      >
         
          <h2 className={`${styles.title} mb-3`}>
            Create New Account
          </h2>
        {/* NAME */}
        <Form.Group controlId="name" className={styles.formGroup}>
          <FormLabel className={`${styles.formLabel} `}>
          </FormLabel>
          <FormInput
            id="name"
            type="text"
            name="name"
            size="small"
            placeholder="Enter your full name"
            value={formik.values.name}
            onChange={(e) => {
              console.log("Name onChange:", e.target.value);
              formik.handleChange(e);
            }}
            onBlur={handleInputBlur}
            onFocus={() => {
              if (!formik.values.name) {
                formik.setFieldTouched("name", true, true);
                formik.setFieldError("name", "Name is required");
              }
            }}
            isInvalid={formik.touched.name && formik.errors.name}
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
          />
        </Form.Group>

        {/* EMAIL ADDRESS */}
        <Form.Group controlId="email" className={styles.formGroup}>
          <FormLabel className={`${styles.formLabel} `}>
            Email Address <span className="text-danger">*</span>
          </FormLabel>
          <FormInput
            id="email"
            type="email"
            name="email"
            size="small"
            placeholder="Example@company.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={handleInputBlur}
            onFocus={() => {
              if (!formik.values.name) {
                formik.setFieldTouched("name", true, true);
                formik.setFieldError("name", "Name is required");
              }
            }}
            isInvalid={formik.touched.email && formik.errors.email}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />
        </Form.Group>

        {/* PASSWORD */}
        <Form.Group controlId="password" className={styles.formGroup}>
          <FormLabel className={`${styles.formLabel} `}>
            Password <span className="text-danger">*</span>
          </FormLabel>
          <div className="position-relative w-100">
            <FormInput
              id="password"
              name="password"
              size="small"
              type={showPassword ? "text" : "password"}
              placeholder="Create strong password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={handleInputBlur}
              onFocus={() => {
                if (!formik.values.name) {
                  formik.setFieldTouched("name", true, true);
                  formik.setFieldError("name", "Name is required");
                }
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
                top: "20px",
                right: "20px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 9999999999,
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

        {/* CONFIRM PASSWORD */}
        <Form.Group controlId="confirmPassword" className={styles.formGroup}>
          <div className="position-relative w-100">
            <FormLabel className={`${styles.formLabel} `}>
              Confirm Password <span className="text-danger">*</span>
            </FormLabel>
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              size="small"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={handleInputBlur}
              onFocus={() => {
                if (!formik.values.name) {
                  formik.setFieldTouched("name", true, true);
                  formik.setFieldError("name", "Name is required");
                }
                if (!formik.values.email) {
                  formik.setFieldTouched("email", true, true);
                  formik.setFieldError("email", "Email is required");
                }
                if (!formik.values.password) {
                  formik.setFieldTouched("password", true, true);
                  formik.setFieldError("password", "Password is required");
                }
              }}
              isInvalid={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : ""
              }
            />
            <div
              className="position-absolute"
              style={{
                top: "40px",
                right: "20px",
                cursor: "pointer",
                zIndex: 999999999999,
              }}
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <IoEyeOutline size={20} />
              ) : (
                <IoEyeOffOutline size={20} />
              )}
            </div>
          </div>
        </Form.Group>

        <div className="mt-4">
          <MainButton
            title="Create Account"
            type="submit"
            className={
              formik.isValid && formik.dirty
                ? classes.activeButton
                : classes.inactiveButton
            }
            // disabled={!(formik.isValid && formik.dirty)}
          />
        </div>

        <div className="d-flex justify-content-center align-items-center my-3">
          <hr className={`${styles.hr} w-25`} />
          <span className={styles.span}>Or Register with</span>
          <hr className={`${styles.hr} w-25`} />
        </div>

        <SocialMedia />

        <div className="mt-4">
          <p className={styles.forgetPassword}>
            Already have an account?
            <Link href="sign-in" className={styles.link}>
              Login Here
            </Link>
          </p>
        </div>
      </Form>
      {/* <HardBarForm /> */}
    </Container>
  );
};

export default SignUp;
