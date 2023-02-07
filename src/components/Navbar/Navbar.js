import { excelLogo } from "@/assets";
import AccountHandler from "@/auth/accountHandler";
import Image from "next/image";
import React from "react";
import styles from "./Navbar.module.css";

function Navbar({ profile }) {
  const onLoginClick = () => {
    if (!AccountHandler.isUserLoggedIn()) {
      AccountHandler.logInUser();
    }
  };
  const onLogoutClick = () => {
    AccountHandler.logOutUser();
  };
  return (
    <div className={styles.navbar_container}>
      <Image src={excelLogo} alt="Excel Logo" width={200} height={100} />
      {profile != null ? (
        <div className={styles.login_details}>
          <div className={styles.name}>{profile.name}</div>
          <div
            className={styles.button}
            onClick={() => {
              onLogoutClick();
            }}
          >
            Logout
          </div>
        </div>
      ) : (
        <div
          className={styles.button}
          onClick={() => {
            onLoginClick();
          }}
        >
          Login
        </div>
      )}
    </div>
  );
}

export default Navbar;
