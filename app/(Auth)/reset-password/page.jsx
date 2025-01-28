"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Container } from "react-bootstrap";
import classes from "../../components/Buttons/MainButton/MainButton.module.css";
import styles from "../auth.module.css";
import FormInput from "../../components/FormInput/FormInput";
import MainButton from "../../components/Buttons/MainButton/MainButton";

const ResetPassword = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string()
      .transform((value) => (value ? value.trim() : value))
      .matches(
        /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,}$/,
        "Email must not start with a number and only contain valid characters"
      )
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const trimmedEmail = values.email.trim();
      console.log("Reset link sent to:", trimmedEmail);
      router.push("/otp-verification");
    },
  });

  const handleInputBlur = (e) => {
    const trimmedValue = e.target.value.trim();
    formik.setFieldValue("email", trimmedValue);
    formik.handleBlur(e);
  };

  return (
    <Container className={styles.section}>
      <Form
        onSubmit={formik.handleSubmit}
        className={`${styles.form} `}
        style={{ width: "500px" }}
      >
        <div className={`${styles.formContainer} text-center`}>
        
          <h2 className={`${styles.title} mb-3`}>
            Reset your Password
          </h2>
          <p className={styles.description}>
            Enter your email address and we’ll send you password reset
            instructions.
          </p>
        </div>

        {/* EMAIL ADDRESS */}
        <Form.Group controlId="email" className={`${styles.formGroup} mt-2`}>
          <Form.Label className={`${styles.formLabel}`}>
            Registered Email <span className="text-danger">*</span>
          </Form.Label>
  
          <FormInput
            id="email"
            type="email"
            name="email"
            size="small"
            placeholder="Input your registered email"
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

        {/* RESET BUTTON */}
        <div className="mt-2">
          <MainButton
            title="Reset"
            type="submit"
            className={
              formik.isValid && formik.dirty
                ? classes.activeButton
                : classes.inactiveButton
            }
            disabled={!(formik.isValid && formik.dirty)}
          />
        </div>

        {/* LOGIN LINK */}
        <div className="mt-4">
          <p className={styles.rememberMe}>
            Remember it?{" "}
            <Link href="/sign-in" className={`${styles.link}`}>
              Login
            </Link>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default ResetPassword;
