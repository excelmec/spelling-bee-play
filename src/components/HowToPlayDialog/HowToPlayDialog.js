import { Dialog, DialogContent } from "@mui/material";
import React from "react";
import { howtoPlayData } from "../../data/howtoplayData";

function HowToPlayDialog({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          backgroundColor: "#02121c",
          color: "#f9f9f9",
          borderRadius: "1rem",
          padding: "1rem",
        },
      }}
      BackdropProps={{
        style: {
          opacity: 0.5,
          background:
            "linear-gradient(90deg, #0C4C82 -13.51%, #0D4F84 -12.59%, #187BA2 5.14%, #1F9BB8 20.99%, #24AFC5 34.24%, #26B6CA 43.28%, #30B9C7 50.27%, #4DBFBE 62.37%, #7ACBAF 78.1%, #B1D89E 94.53%)",
        },
      }}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="lg"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#f9f9f9",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        How to Play ?
      </div>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        sx={{ "&::-webkit-scrollbar": { display: "none" } }}
      >
        {howtoPlayData.map((play, index) => {
          return (
            <p
              style={{
                fontSize: "1.1rem",
                color: "#1cf9c9",
              }}
              key={index}
            >
              {index + 1}
              {" . "}
              {play}
            </p>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}

export default HowToPlayDialog;
