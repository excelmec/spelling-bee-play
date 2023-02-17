import AccountHandler from "../auth/accountHandler";
import { CustomTitle } from "../utils";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import styles from "../styles/Home.module.css";
import MainLayout from "../components/MainLayout/MainLayout";
import axios from "axios";
import AuthHandler from "../auth/authHandler";
import { UserContext } from "../contexts/UserContext";
import Loader from "../components/Loader/Loader";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

function Home() {
  const router = useRouter();
  const { isPlayerRegistered, profile, setIsPlayerRegistered } =
    useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const registerUser = async () => {
    setLoading(true);
    axios
      .post("/api/register", {
        headers: {
          Authorization: `Bearer ${await AuthHandler.aysncGetAccessToken()}`,
        },
      })
      .then((res) => {
        if (res.status == 200 && res.data.message == "User created") {
          toast.success("Registered Successfully");
          setIsPlayerRegistered(true);
        }
      });
  };

  useEffect(() => {
    if (profile?.email && !isPlayerRegistered) {
      registerUser();
    } else if (profile && isPlayerRegistered) {
      router.push("/spellbee");
    }
  }, [profile, isPlayerRegistered]);

  const onLoginClick = () => {
    if (!AccountHandler.isUserLoggedIn()) {
      AccountHandler.logInUser();
    }
  };
  if (profile?.email && !isPlayerRegistered) return <Loader />;

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
                        if (
                          res.status == 200 &&
                          res.data.message == "User created"
                        ) {
                          setIsPlayerRegistered(true);
                          toast.success("Registered Successfully");
                        }
                      });
                  }
                }

                router.push("/spellbee");
              }
            }}
          >
            {loading ? <ClipLoader /> : "Play Now"}
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Home;
