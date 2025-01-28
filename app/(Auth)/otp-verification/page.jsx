"use client";
import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Container } from "react-bootstrap";
import classes from "../../components/Buttons/MainButton/MainButton.module.css";
import styles from "../auth.module.css";
import MainButton from "../../components/Buttons/MainButton/MainButton";

const OTP = () => {
  const router = useRouter();

  const inputRefs = useRef([]);

  const validationSchema = Yup.object({
    otp0: Yup.string().required("Required"),
    otp1: Yup.string().required("Required"),
    otp2: Yup.string().required("Required"),
    otp3: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      otp0: "",
      otp1: "",
      otp2: "",
      otp3: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const otp = Object.values(values).join("");
      console.log("OTP Submitted:", otp);
      router.push("/update-password");
    },
  });

  useEffect(() => {
    if (
      formik.values.otp0 &&
      formik.values.otp1 &&
      formik.values.otp2 &&
      formik.values.otp3
    ) {
      inputRefs.current[0].focus();
    }
  }, [formik.values]);

  const handleChange = (index, e) => {
    const { value } = e.target;
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      formik.setFieldValue(`otp${index}`, value);
      if (value && index < 3) {
        setTimeout(() => {
          const nextInput = inputRefs.current[index + 1];
          if (nextInput && !nextInput.disabled) {
            nextInput.focus();
          }
        }, 10);
      }
    }
  };

  return (
    <Container fluid className={styles.section}>
      <Form
        onSubmit={formik.handleSubmit}
        className={`${styles.form}`}
        style={{ width: "500px" }}
      >
        <div className="text-center">
          <h3 className={`${styles.title} mt-3`}>
            OTP Verification
          </h3>
          <p className="mx-auto text-center" style={{ color: "#757575" }}>
            We have sent a verification code to email address <br />
            <span className={`${styles.email}`}>
              pristia@gmail.com
            </span>
            <Link
              href="/reset-password"
              className="text-decoration-none fw-medium ms-2"
            >
              Wrong Email?
            </Link>
          </p>
          <Form.Group className="d-flex gap-3 mt-4">
            {[0, 1, 2, 3].map((index) => (
              <Form.Control
                key={index}
                type="text"
                placeholder="-"
                name={`otp${index}`}
                value={formik.values[`otp${index}`]}
                onChange={(e) => handleChange(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
                className={`${styles.formControl} w-25`}
                maxLength={1}
                required
                isInvalid={
                  formik.touched[`otp${index}`] &&
                  !!formik.errors[`otp${index}`]
                }
                disabled={index > 0 && !formik.values[`otp${index - 1}`]}
              />
            ))}
          </Form.Group>
          <div className="my-4">
            <MainButton
              title="Submit"
              type="submit"
              className={
                formik.isValid && formik.dirty
                  ? classes.activeButton
                  : classes.inactiveButton
              }
              disabled={!formik.isValid}
            />
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default OTP;
