import AccountHandler from "../auth/accountHandler";
import { CustomTitle } from "../utils";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import styles from "../styles/Home.module.css";
import MainLayout from "../components/MainLayout/MainLayout";
import axios from "axios";
import AuthHandler from "../auth/authHandler";
import { UserContext } from "../contexts/UserContext";
import { Loader } from "../components";

function Home() {
  const router = useRouter();
  const { isPlayerRegistered, profile } = useContext(UserContext);

  return (
    <>
      <CustomTitle title="Home" />
      <MainLayout>
        <div
          className={styles.home_container_main}
          style={{
            minHeight: "90vh",
          }}
        >
          <div className={styles.heading}>Spell Bee</div>
          <div
            className={styles.button}
            onClick={async () => {
              if (!AccountHandler.isUserLoggedIn()) {
                alert("Please login to play the game");
                return;
              } else {
                if (profile) {
                  if (isPlayerRegistered === true) {
                    router.push("/spellbee");
                    return;
                  } else
                    await axios
                      .post("/api/register", {
                        headers: {
                          Authorization: `Bearer ${await AuthHandler.aysncGetAccessToken()}`,
                        },
                      })
                      .then((res) => {
                        if (res.data.status == "success") {
                          console.log("success");
                        }
                      });
                }

                router.push("/spellbee");
              }
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
