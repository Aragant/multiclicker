// app/components/Spinner.tsx
import React from "react";
import styles from "./spinner.module.css";

const Spinner: React.FC = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.doubleBounce1}></div>
      <div className={styles.doubleBounce2}></div>
    </div>
  );
};

export default Spinner;
