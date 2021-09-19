import React from "react";
import styles from "./Backdrop.module.css";
const Backdrop = ({ setShow }) => {
  return <div onClick={() => setShow(false)} className={styles.backdrop}></div>;
};

export default Backdrop;
