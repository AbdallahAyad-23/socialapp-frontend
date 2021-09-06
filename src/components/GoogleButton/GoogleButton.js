import React from "react";
import styles from "./GoogleButton.module.css";
const GoogleButton = () => {
  return (
    <a href="/auth/google" className={`${styles.btn} ${styles.google}`}>
      <i className="fab fa-google"></i> Login with Google
    </a>
  );
};

export default GoogleButton;
