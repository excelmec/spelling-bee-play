import { Dialog, DialogContent } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

function AnswerDialog({ open, handleClose }) {
  const { yesterdayQuestion } = useContext(UserContext);
  const [answersData, setAnswersData] = React.useState([]);
  const getAnswers = () => {
    let temp = [];
    yesterdayQuestion?.answers?.map((answer) => {
      temp.push(answer.answer);
    });
    setAnswersData(temp);
  };

  useEffect(() => {
    getAnswers();
  }, [yesterdayQuestion]);

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
          textAlign: "center",
        }}
      >
        Answers for Yesterday's Spell Bee
      </div>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <div
          style={{
            fontSize: "1.2rem",
            fontWeight: "700",
            color: "#2de1da",
          }}
        >
          Letters : {yesterdayQuestion?.letters.join(" , ")}
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            fontWeight: "700",
            color: "#2de1da",
          }}
        >
          Main Letter : {yesterdayQuestion?.mainLetter}
        </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {answersData.map((answer, index) => {
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
                {answer}
              </p>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AnswerDialog;
