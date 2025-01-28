"use client";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import classes from "../../components/Buttons/MainButton/MainButton.module.css";
import styles from "../auth.module.css";
import { useRouter } from "next/navigation";
import { Container, Form } from "react-bootstrap";
import MainButton from "../../components/Buttons/MainButton/MainButton";
import FormInput from "../../components/FormInput/FormInput";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    password: Yup.string()
      .transform((value) => (value ? value.trim() : value))
      .min(8, "Password must be at least 8 characters")
      .matches(/\d/, "Password must contain a number")
      .matches(/[A-Z]/, "Password must contain an uppercase letter")
      .matches(/[a-z]/, "Password must contain a lowercase letter")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .transform((value) => (value ? value.trim() : value))
      .oneOf(
        [Yup.ref("password"), null],
        "Passwords do not match. Please try again"
      )
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const trimmedValues = {
        password: values.password.trim(),
        confirmPassword: values.confirmPassword.trim(),
      };
      console.log(trimmedValues);
      router.push("/successfully-passwordChanges");
    },
  });

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
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
        style={{ width: "600px", paddingBlock: "50px" }}
      >
        <div className="text-center">
       
          <h3 className={styles.title}>
            Update your password
          </h3>
          <p className={styles.description}>
            Your password must be at least 8 characters long and include an
            uppercase letter, a lowercase letter, and a number
          </p>
        </div>

        {/* PASSWORD */}
        <Form.Group controlId="password">
          <Form.Label className={`${styles.formLable} mb-2`}>
            Password <span className="text-danger">*</span>
          </Form.Label>
          <div className="position-relative w-100">
            <FormInput
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              size="small"
              placeholder="Input your password account"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={handleInputBlur}
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

        {/* VALIDATION STEPS (PASSWORD) */}
        <div className="d-flex justify-content-between mt-3">
          <div className="d-flex flex-column mx-1">
            <p
              className={`${styles.p} d-flex align-items-center gap-2 mb-2 ${
                formik.values.password.length >= 8
                  ? styles.greenText
                  : styles.redText
              }`}
            >
              {formik.values.password.length >= 8 ? (
                <IoIosCheckmarkCircleOutline size={20} />
              ) : (
                <IoIosCloseCircleOutline size={20} />
              )}
              8 characters
            </p>
            <p
              className={`${styles.p} d-flex align-items-center gap-2 ${
                /\d/.test(formik.values.password)
                  ? styles.greenText
                  : styles.redText
              }`}
            >
              {/\d/.test(formik.values.password) ? (
                <IoIosCheckmarkCircleOutline size={20} />
              ) : (
                <IoIosCloseCircleOutline size={20} />
              )}
              Number (0-9)
            </p>
          </div>
          <div className="d-flex flex-column mx-1">
            <p
              className={`${styles.p} d-flex align-items-center gap-2 mb-2 ${
                /[A-Z]/.test(formik.values.password)
                  ? styles.greenText
                  : styles.redText
              }`}
            >
              {/[A-Z]/.test(formik.values.password) ? (
                <IoIosCheckmarkCircleOutline size={20} />
              ) : (
                <IoIosCloseCircleOutline size={20} />
              )}
              Uppercase letter (A-Z)
            </p>
            <p
              className={`${styles.p} d-flex align-items-center gap-2 ${
                /[a-z]/.test(formik.values.password)
                  ? styles.greenText
                  : styles.redText
              }`}
            >
              {/[a-z]/.test(formik.values.password) ? (
                <IoIosCheckmarkCircleOutline size={20} />
              ) : (
                <IoIosCloseCircleOutline size={20} />
              )}
              Lowercase letter (a-z)
            </p>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <Form.Group controlId="confirmPassword" className="mt-3">
          <Form.Label className={`${styles.formLable}    mb-2`}>
            Confirm New Password <span className="text-danger">*</span>
          </Form.Label>
          <div className="position-relative w-100">
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              size="small"
              placeholder="Re-type your new password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={handleInputBlur}
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
                top: "20px",
                right: "20px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 1,
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

        {/* UPDATE BUTTON */}
        <div className="mt-4">
          <MainButton
            title="Update Password"
            type="submit"
            className={
              formik.isValid && formik.dirty
                ? classes.activeButton
                : classes.inactiveButton
            }
            disabled={!(formik.isValid && formik.dirty)}
          />
        </div>
      </Form>
    </Container>
  );
};

export default UpdatePassword;
