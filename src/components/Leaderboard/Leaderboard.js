import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLeaderboard = async () => {
    await axios.get(`/api/leaderboard`).then((response) => {
      setLeaderboard(response.data);
      //console.log(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="text-white"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <h1 className="text-4xl font-bold md:text-5xl">Leaderboard</h1>
      <div className="flex flex-col gap-4 mx-auto overflow-y-hidden text-center w-96">
        <div className="flex flex-row text-xl justify-evenly">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>Rank</div>
            <div style={{ width: 8, height: 8 }}></div>
          </div>
          <p>Name</p>
          <p>Score</p>
        </div>
        <div style={{
          paddingLeft: "1rem",
          paddingRight: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>
        {leaderboard.map((entry, index) => {
          return (
            <LeaderboardEntry
              key={index}
              name={entry.name}
              score={entry.score}
              rank={index + 1}
              picture={entry.picture}
            />
          );
        })}
        </div>
      </div>
    </div>
  );
}

function LeaderboardEntry({ name, score, rank, picture }) {
  return (
    <div className="flex flex-row items-center bg-gray-800 rounded-lg justify-evenly shrink-1 grow-0 h-14">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <div style={{ fontSize: "1.1rem" }}>{rank}</div>
        <img src={picture} alt="profile" className="w-8 h-8 rounded-full" />
      </div>
      <p style={{ fontSize: "1.1rem" }} className="w-36 ">{name}</p>
      <p style={{ fontSize: "1.1rem" }}>{score}</p>
    </div>
  );
}
