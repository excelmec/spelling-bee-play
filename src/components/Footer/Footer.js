import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import excelmainlogo from "../../assets/excelmainlogo.svg";
import meclogo from "../../assets/meclogo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className={styles.footer_container}>
        <a href="https://excelmec.org/" target="_blank" rel="noreferrer">
          <Image
            src={excelmainlogo}
            alt="Excel Logo"
            className={styles.excellogo}
          />
        </a>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div className={styles.footer_icons}>
            <a
              href="https://www.facebook.com/excelmec"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF className={styles.footer_icon} />
            </a>
            <a
              href="https://twitter.com/excelmec"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter className={styles.footer_icon} />
            </a>
            <a
              href="https://www.instagram.com/excelmec/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className={styles.footer_icon} />
            </a>
            <a
              href="https://www.linkedin.com/company/excelmec/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn className={styles.footer_icon} />
            </a>
            <a
              href="https://www.youtube.com/excelmec"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube className={styles.footer_icon} />
            </a>
          </div>
          <div className={styles.footer_text}>Made with ❤️ Excel 2022</div>
        </div>
        <a href="https://mec.ac.in" target="_blank" rel="noreferrer">
          <Image src={meclogo} alt="MEC Logo" className={styles.meclogo} />
        </a>
      </div>
      <div className={styles.footer_container_mobile}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <a href="https://excelmec.org/" target="_blank" rel="noreferrer">
            <Image
              src={excelmainlogo}
              alt="Excel Logo"
              className={styles.excellogo}
            />
          </a>
          <a href="https://mec.ac.in" target="_blank" rel="noreferrer">
            <Image src={meclogo} alt="MEC Logo" className={styles.meclogo} />
          </a>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div className={styles.footer_icons}>
            <a
              href="https://www.facebook.com/excelmec"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF className={styles.footer_icon} />
            </a>
            <a
              href="https://twitter.com/excelmec"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter className={styles.footer_icon} />
            </a>
            <a
              href="https://www.instagram.com/excelmec/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className={styles.footer_icon} />
            </a>
            <a
              href="https://www.linkedin.com/company/excelmec/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn className={styles.footer_icon} />
            </a>
            <a
              href="https://www.youtube.com/excelmec"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube className={styles.footer_icon} />
            </a>
          </div>
          <div className={styles.footer_text}>Made with ❤️ Excel 2022</div>
        </div>
      </div>
    </>
  );
}

export default Footer;
