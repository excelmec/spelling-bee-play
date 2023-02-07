import AccountHandler from "@/auth/accountHandler";
import { Footer, Navbar } from "@/components";
import { CustomTitle } from "@/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (AccountHandler.isUserLoggedIn()) {
      axios
        .get(`${process.env.NEXT_PUBLIC_PROFILE_BACKEND_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "accessToken"
            )}`,
          },
        })
        .then(
          (response) => {
            // console.log("Navpro:",response)
            setProfile(response.data);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, []);

  const onLoginClick = () => {
    if (!AccountHandler.isUserLoggedIn()) {
      AccountHandler.logInUser();
    }
  };
  const onLogoutClick = () => {
    AccountHandler.logOutUser();
  };
  if (profile == null) {
    // AccountHandler.asyncGetUserProfile()
    //    .then((resposne) => {

    // if (res != null) setProfile(res);
    // console.log("profile: ",profile)
    //  })
    //  .catch(() => console.log("Failed to fetch profile pic"));
    console.log(AccountHandler.asyncGetUserProfile());
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
