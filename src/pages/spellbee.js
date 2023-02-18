import { useState, useEffect, useContext } from "react";
import Buttons from "../components/Game/buttons";
import Letters from "../components/Game/letters";
import AnswerDialog from "../components/AnswersDialog/AnswerDialog";
import useSwr from "swr";
import { Loader } from "../components";
import MainLayout from "../components/MainLayout/MainLayout";
import { useRouter } from "next/router";
import CustomTitle from "../utils/customTitle";
import { UserContext } from "../contexts/UserContext";
import Protected from "../components/protectedRoute";
import { toast } from "react-hot-toast";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const answerSum = (wordList, pangramCount) => {
  let sum = 0;

  if (wordList?.length === undefined || wordList === null) {
    return sum;
  }

  if (pangramCount?.length > 0) {
    for (let i = 0; i < pangramCount.length; i++) {
      if (pangramCount[i].length > 0) {
        sum += 7;
      }
    }
  }

  for (let i = 0; i < wordList?.length; i++) {
    if (wordList[i].length === 4) {
      sum += 1;
    } else if (wordList[i].length > 4) {
      sum += wordList[i].length - 3;
    }
  }

  return sum;
};

export default function SpellBee() {
  const { data, error } = useSwr("/api/question", fetcher);
  const router = useRouter();
  const [userWord, setUserWord] = useState("");
  const [shuffledLetters, setShuffledLetters] = useState(null);

  const { score } = useContext(UserContext);

  useEffect(() => {
    try{
    if (localStorage.getItem("refreshToken") == null) {
      router.push("/");
      return;
    }
  }
  catch(err){
    toast.error("Enable Third Party Cookies in your Browser Settings.")
  }
  }, []);

  if (!data) {
    return <Loader />;
  }

  const clearWord = () => {
    setUserWord(userWord.substring(0, userWord.length - 1));
  };

  const shuffle = async () => {
    let newArr = [...data.letters].sort(() => Math.random() - 0.5);
    setShuffledLetters([]);
    await new Promise((res) => setTimeout(res, 200));
    setShuffledLetters(newArr);
  };

  return (
    <Protected>
      <MainLayout>
        <CustomTitle title="Game" />
        <AnswerDialog />
        <div className="flex flex-col items-center m-auto game md:flex-row justify-evenly">
          <div className="flex flex-col items-center">
            <div
              style={{
                paddingTop: "5rem",
                paddingBottom: "2rem",
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#fff",
                marginTop: "5rem",
              }}
            >
              Today's Score :{" "}
              <span
                style={{
                  color: "#1cf9c9",
                }}
              >
                {score}
              </span>
            </div>
            <Letters
              data={data}
              shuffledLetters={
                shuffledLetters === null
                  ? data?.letters?.map((i) => i.toUpperCase())
                  : shuffledLetters.map((i) => i.toUpperCase())
              }
              setLetter={(e) => setUserWord(userWord.concat(e))}
            />
          </div>
          <div className="flex flex-col h-72 justify-evenly">
            {userWord.length < 1 ? (
              <h2 className="self-center text-gray-300 input ">
                <span className="cursor">|</span>Click the Letters
              </h2>
            ) : (
              <h2 className="self-center input ">
                {userWord.split("").map((i) => (
                  <span
                    key={i}
                    className={
                      i === data.mainLetter.toUpperCase()
                        ? "text-yellow-500"
                        : data.letters.includes(i.toLowerCase())
                        ? "text-gray-100"
                        : "text-gray-300"
                    }
                  >
                    {i}
                  </span>
                ))}
                <span className="cursor">|</span>
              </h2>
            )}
            <Buttons
              mainLetter={data?.mainLetter}
              shuffle={() => shuffle()}
              clearWord={() => clearWord()}
              setUserWord={setUserWord}
              answer={userWord}
              qnid={data?._id}
            />
          </div>
        </div>
        {/* </div> */}
      </MainLayout>
    </Protected>
  );
}
