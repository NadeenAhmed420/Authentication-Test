"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import styles from "../auth.module.css";
import classes from "../../components/Buttons/MainButton/MainButton.module.css";
import MainButton from "../../components/Buttons/MainButton/MainButton";

const page = () => {

  return (
    <Container fluid className={styles.section}>
      <section
        className={`${styles.form} `}
        style={{ width: "500px" }}
      >
        <Image
          src="/successfully-changes.svg"
          alt="successfully"
          width={280}
          height={150}
          className="mx-auto"
        />
        <h3 className={`${styles.title} `}>
          You successfully changed <br /> your password
        </h3>
        <p className={styles.description}>
          Always remember the password for your account at HR !
        </p>
        <div className="my-4 ">
          <MainButton
            title="Back to Login"
            type="submit"
            href="/sign-in"
            className={classes.activeButton}
          />
        </div>
      </section>
    </Container>
  );
};

export default page;
