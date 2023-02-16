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
import { toast } from "react-hot-toast";
import { CircleLoader } from "react-spinners";

function Home() {
  const router = useRouter();
  const { isPlayerRegistered, profile } = useContext(UserContext);
  const [loading, setLoading] = React.useState(false);

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
                setLoading(true);
                if (profile) {
                  if (isPlayerRegistered === true) {
                    setLoading(false);
                    toast.success("Successfully Logged In");
                    router.push("/spellbee");
                    return;
                  } else {
                    await axios
                      .post("/api/register", {
                        headers: {
                          Authorization: `Bearer ${await AuthHandler.aysncGetAccessToken()}`,
                        },
                      })
                      .then((res) => {
                        if (res.data.status == "success") {
                          toast.success("Registered Successfully");
                        }
                      });
                  }
                }

                router.push("/spellbee");
              }
            }}
          >
            {loading ? <CircleLoader /> : "Play Now"}
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Home;
