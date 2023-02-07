import React from "react";
import { RingLoader } from "react-spinners";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loader_wrapper}>
      <RingLoader color={"#62EDF5"} size={150} />
    </div>
  );
}

export default Loader;
