import { excelLogo } from "../../assets";
import AccountHandler from "../../auth/accountHandler";
import Image from "next/image";
import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { UserContext } from "../../contexts/UserContext";

import AnswerDialog from "../AnswersDialog/AnswerDialog";
import RulesDialog from "../RulesDialog/RulesDialog";
import HowToPlayDialog from "../HowToPlayDialog/HowToPlayDialog";

import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

function Navbar() {
  const { profile } = useContext(UserContext);

  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
              fontWeight: "600",
            }}
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </div>
          <div
            style={{
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
              fontWeight: "600",
            }}
            onClick={() => {
              router.push("/spellbee");
            }}
          >
            Game
          </div>
          <div
            style={{
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
              fontWeight: "600",
            }}
            onClick={() => {
              setOpen2(true);
            }}
          >
            How to Play
          </div>
          <div
            style={{
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
              fontWeight: "600",
            }}
            onClick={() => {
              setOpen1(true);
            }}
          >
            Rules
          </div>
          <div
            style={{
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
              fontWeight: "600",
            }}
            onClick={() => {
              router.push("/leaderboard");
            }}
          >
            Leaderboard
          </div>
          <div
            style={{
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
              fontWeight: "600",
            }}
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
                  onLogoutClick;
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
      </div>
    </>
  );
}

export default Navbar;
