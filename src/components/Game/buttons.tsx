import { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import WordsEnteredDialog from "../WordsEnteredDialog/WordsEnteredDialog";
import { postAnswer } from "../../api";


export default function Buttons({
  searchWord,
  shuffle,
  clearWord,
  revealedAnswers,
  qnid,
  answer
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="flex flex-col justify-center items-center ">
      <WordsEnteredDialog open={open} handleClose={handleClose} />
      <div
        className="buttons items-center "
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          
        }}
      >
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
          onClick={() => postAnswer(qnid,answer)}
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
        className="enter-btn buttons_1"
      >
        View Words Entered
      </button>
    </div>
  );
}
