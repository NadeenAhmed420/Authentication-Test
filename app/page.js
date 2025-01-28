"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import { redirect } from "next/navigation";

const Home = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      redirect("/dashboard");
    } else {
      redirect("/sign-in");
    }
  }, []);

  return null;
};

export default Home;
