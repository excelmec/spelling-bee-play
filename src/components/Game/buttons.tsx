import { useContext, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import WordsEnteredDialog from "../WordsEnteredDialog/WordsEnteredDialog";
import { postAnswer } from "../../api";
import { ClipLoader } from "react-spinners";
import { UserContext } from "../../contexts/UserContext";

export default function Buttons({
  searchWord,
  mainLetter,
  setUserWord,
  shuffle,
  clearWord,
  revealedAnswers,
  qnid,
  answer,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { refresh, setRefresh } = useContext(UserContext);
  const handleClose = () => {
    setOpen(false);
  };

  if (loading)
    return (
      <>
        <div className="flex flex-col items-center justify-center ">
          <div
            className="items-center buttons "
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "1rem",
            }}
          >
            <ClipLoader color="#1cf9c9" size={40} />
          </div>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="enter-btn buttons_1"
          >
            View Words Entered
          </button>
        </div>
      </>
    );

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <WordsEnteredDialog open={open} handleClose={handleClose} />
      <div className="flex flex-row justify-center items-center gap-4">
        <button onClick={() => clearWord()} className="delete-btn">
          Delete
        </button>
        <button
          className="refresh-btn"
          data-testid="shuffle-btn"
          onClick={() => shuffle()}
          disabled={revealedAnswers}
        >
          <FiRefreshCcw />
        </button>
        <button
          onClick={() => {
            setLoading(true);
            postAnswer(
              qnid,
              answer,
              mainLetter,
              setUserWord,
              refresh,
              setLoading,
              setRefresh
            );
            // setUserWord("");
          }}
          className="enter-btn"
          disabled={revealedAnswers}
        >
          Enter
        </button>
      </div>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="enter-btn"
      >
        View Words Entered
      </button>
    </div>
  );
}
