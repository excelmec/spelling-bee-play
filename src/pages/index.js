import AccountHandler from "../auth/accountHandler";
import { Footer, Navbar } from "../components";
import { CustomTitle } from "../utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import MainLayout from "../components/MainLayout/MainLayout";

function Home() {
  const [profile, setProfile] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (AccountHandler.isUserLoggedIn()) {
      AccountHandler.asyncGetUserProfile().then((res) => {
        if (res != null) setProfile(res);
      });
    }
  }, []);

  // const onLoginClick = () => {
  //   if (!AccountHandler.isUserLoggedIn()) {
  //     AccountHandler.logInUser().then(() => {
  //       AccountHandler.asyncGetUserProfile();
  //     });
  //   }
  //   router.push("/spellbee");
  // };
  if (profile == null) {
    AccountHandler.asyncGetUserProfile().then((res) => {
      if (res != null) setProfile(res);
    });
  }

  return (
    <>
      <CustomTitle title="Home" />
      <MainLayout>
        <div className={styles.home_container_main} style={{
          minHeight:"90vh"
        }}>
          <div className={styles.heading}>Spell Bee</div>
          <div
            className={styles.button}
            onClick={() => {
              if (!AccountHandler.isUserLoggedIn()) {
                alert("Please login to play the game");
                return;
              }
              router.push("/spellbee");
            }}
          >
            Play Now
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Home;
