import { useContext, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import WordsEnteredDialog from "../WordsEnteredDialog/WordsEnteredDialog";
import { postAnswer } from "../../api";
import { ClipLoader } from "react-spinners";
import { UserContext } from "../../contexts/UserContext";
import { toast } from "react-hot-toast";

export default function Buttons({
  mainLetter,
  setUserWord,
  shuffle,
  clearWord,
  qnid,
  answer,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { refresh, setRefresh,answers } = useContext(UserContext);
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
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <WordsEnteredDialog open={open} handleClose={handleClose} />
      <div className="flex flex-row items-center justify-center gap-4">
        <button onClick={() => clearWord()} className="delete-btn">
          Delete
        </button>
        <button
          className="refresh-btn"
          data-testid="shuffle-btn"
          onClick={() => shuffle()}
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
              answers,
              setLoading,
              setRefresh
            );
            // toast.error("We will be back soon! Stay tuned!")
          }}
          className="enter-btn"
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
