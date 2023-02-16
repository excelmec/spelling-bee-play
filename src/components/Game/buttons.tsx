import { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import WordsEnteredDialog from "../WordsEnteredDialog/WordsEnteredDialog";

export default function Buttons({
  searchWord,
  shuffle,
  clearWord,
  revealedAnswers,
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <WordsEnteredDialog open={open} handleClose={handleClose} />
      <div
        className="buttons"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          marginLeft: "2rem",
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
          onClick={() => searchWord()}
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
        className="enter-btn buttons"
      >
        View Words Entered
      </button>
    </>
  );
}
