import { excelLogo } from "../../assets";
import AccountHandler from "../../auth/accountHandler";
import Image from "next/image";
import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { UserContext } from "../../contexts/UserContext";

import AnswerDialog from "../AnswersDialog/AnswerDialog";
import RulesDialog from "../RulesDialog/RulesDialog";
import HowToPlayDialog from "../HowToPlayDialog/HowToPlayDialog";

import { HiOutlineMenuAlt3 } from "react-icons/hi";

import { useRouter } from "next/router";
import { Avatar, Drawer } from "@mui/material";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

function Navbar() {
  const { profile } = useContext(UserContext);

  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleDrawerOpen = () => {
    setOpen3(true);
  };

  const handleDrawerClose = () => {
    setOpen3(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const onLoginClick = () => {
    if (!AccountHandler.isUserLoggedIn()) {
      AccountHandler.logInUser();
    }
  };
  const onLogoutClick = () => {
    AccountHandler.logOutUser();
  };
  return (
    <>
      <AnswerDialog open={open} handleClose={handleClose} />
      <RulesDialog open={open1} handleClose={handleClose1} />
      <HowToPlayDialog open={open2} handleClose={handleClose2} />
      <div className={styles.navbar_container}>
        <Image src={excelLogo} alt="Excel Logo" width={150} height={150} />
        <div className={styles.navbar__desktop}>
          {/* <div
            className={styles.navbar__item}
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </div> */}
          <div
            className={styles.navbar__item}
            onClick={() => {
              router.push("/spellbee");
            }}
          >
            Game
          </div>
          <div
            className={styles.navbar__item}
            onClick={() => {
              setOpen2(true);
            }}
          >
            How to Play
          </div>
          <div
            className={styles.navbar__item}
            onClick={() => {
              setOpen1(true);
            }}
          >
            Rules
          </div>
          <div
            className={styles.navbar__item}
            onClick={() => {
              router.push("/leaderboard");
            }}
          >
            Leaderboard
          </div>
          <div
            className={styles.navbar__item}
            onClick={() => {
              setOpen(true);
            }}
          >
            Answers
          </div>
          {profile != null ? (
            <Menu
              menuButton={
                <MenuButton>
                  <Avatar
                    src={profile.picture}
                    sx={{
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                </MenuButton>
              }
              transition
            >
              <MenuItem
                onClick={() => {
                  onLogoutClick();
                }}
                className={styles.button}
              >
                Logout
              </MenuItem>
            </Menu>
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
        <div className={styles.nav__mob}>
          <div className={styles.nav__mob_container}>
            <button className={styles.nav_btn} onClick={handleDrawerOpen}>
              <HiOutlineMenuAlt3 className={styles.hamburger} />
            </button>
          </div>
        </div>
        <Drawer
          open={open3}
          onClick={handleDrawerClose}
          onClose={(event, reason) => {
            if (reason !== "backdropClick") {
              handleDrawerClose();
            } else if (reason !== "escapeKeyDown") {
              handleDrawerClose();
            }
          }}
          anchor="left"
        >
          <div className={styles.nav__drawer}>
            <div className={styles.nav__drawer_header}>
              <Image
                src={excelLogo}
                alt="Excel Logo"
                width={150}
                height={150}
              />
              <div className={styles.navbar_items_mob}>
                {/* <div
                  onClick={() => {
                    router.push("/");
                    handleDrawerClose();
                  }}
                  className={styles.navbar__item}
                >
                  Home
                </div> */}
                <div
                  onClick={() => {
                    router.push("/spellbee");
                    handleDrawerClose();
                  }}
                  className={styles.navbar__item}
                >
                  Game
                </div>
                <div
                  onClick={() => {
                    setOpen2(true);
                    handleDrawerClose();
                  }}
                  className={styles.navbar__item}
                >
                  How to Play
                </div>
                <div
                  onClick={() => {
                    setOpen1(true);
                    handleDrawerClose();
                  }}
                  className={styles.navbar__item}
                >
                  Rules
                </div>
                <div
                  onClick={() => {
                    router.push("/leaderboard");
                    handleDrawerClose();
                  }}
                  className={styles.navbar__item}
                >
                  Leaderboard
                </div>
                <div
                  onClick={() => {
                    setOpen(true);
                    handleDrawerClose();
                  }}
                  className={styles.navbar__item}
                >
                  Answers
                </div>
                {profile != null ? (
                  <>
                    <Avatar
                      src={profile.picture}
                      sx={{
                        width: "3rem",
                        height: "3rem",
                      }}
                    />
                    <div className={styles.name}>{profile.name}</div>
                    <button
                      onClick={() => {
                        onLogoutClick();
                      }}
                      className={styles.button}
                    >
                      Logout
                    </button>
                  </>
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
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
}

export default Navbar;
