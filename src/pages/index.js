import AccountHandler from "@/auth/accountHandler";
import AuthHandler from "@/auth/authHandler";
import { Footer, Navbar } from "@/components";
import { CustomTitle } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (AccountHandler.isUserLoggedIn()) {
      AccountHandler.asyncGetUserProfile().then((res) => {
        if (res != null) setProfile(res);
      });
    }
  }, []);

  const onLoginClick = () => {
    if (!AccountHandler.isUserLoggedIn()) {
      AccountHandler.logInUser();
    }
  };
  if (profile == null) {
    AccountHandler.asyncGetUserProfile().then((res) => {
      if (res != null) setProfile(res);
    });
  }

  return (
    <>
      <CustomTitle title="Home" />
      <div className={styles.home_container}>
        <Navbar profile={profile} />
        <div className={styles.home_container_main}>
          <div className={styles.heading}>Spell Bee</div>
          <div
            className={styles.button}
            onClick={() => {
              onLoginClick();
            }}
          >
            Play Now
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
