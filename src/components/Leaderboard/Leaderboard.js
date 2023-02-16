export default function Leaderboard() {
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
      <h1 className="text-5xl font-bold ">Leaderboard</h1>
      <div className="flex flex-col gap-4 text-center w-96 mx-auto overflow-y-hidden">
        <div className="flex flex-row justify-evenly text-xl">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <div>Rank</div>
            <div
              style={{
                width: 8,
                height: 8,
              }}
            ></div>
          </div>
          <p>Name</p>
          <p>Score</p>
        </div>

        <LeaderboardTopScorer name="Daniel" score="88" rank="1" />
        <LeaderboardTopScorer name="Daniel" score="88" rank="2" />
        <LeaderboardTopScorer name="Daniel" score="88" rank="3" />

        <LeaderboardEntry name="Daniel" score="88" rank="4" />
        <LeaderboardEntry name="Daniel" score="88" rank="5" />
        <LeaderboardEntry name="Daniel" score="88" rank="1" />
        <LeaderboardEntry name="Daniel" score="88" rank="1" />
        <LeaderboardEntry name="Daniel" score="88" rank="1" />
        <LeaderboardEntry name="Daniel" score="88" rank="1" />
        <LeaderboardEntry name="Daniel" score="88" rank="1" />
        <LeaderboardEntry name="Daniel" score="88" rank="1" />
      </div>
    </div>
  );
}

function LeaderboardEntry({ name, score, rank }) {
  return (
    <div className="flex flex-row justify-evenly items-center h-14 bg-gray-800 rounded-lg">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <div
          style={{
            fontSize: "1.1rem",
          }}
        >
          {rank}
        </div>
        <img
          src="https://avatars.githubusercontent.com/u/47032027?v=4"
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
      </div>

      <p
        style={{
          fontSize: "1.1rem",
        }}
      >
        {name}
      </p>
      <p
        style={{
          fontSize: "1.1rem",
        }}
      >
        {score}
      </p>
    </div>
  );
}

function LeaderboardTopScorer({ name, score, rank }) {
  return (
    <div className="flex flex-row justify-evenly items-center h-14 bg-gray-800 rounded-lg font-bold">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <div
          style={{
            fontSize: "1.1rem",
          }}
        >
          {rank}
        </div>
        <img
          src="https://avatars.githubusercontent.com/u/47032027?v=4"
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
      <p
        style={{
          fontSize: "1.1rem",
        }}
      >
        {name}
      </p>
      <p
        style={{
          fontSize: "1.1rem",
        }}
      >
        {score}
      </p>
    </div>
  );
}
