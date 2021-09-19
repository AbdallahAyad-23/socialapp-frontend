import React from "react";
import styles from "./Backdrop.module.css";
const Backdrop = ({ setShowCreate }) => {
  return (
    <div onClick={() => setShowCreate(false)} className={styles.backdrop}></div>
  );
};

export default Backdrop;
