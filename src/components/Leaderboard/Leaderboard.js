export default function Leaderboard() {
  return (
    <div className="text-white">
      <h1 className="text-5xl font-bold tracking-wider">Leaderboard</h1>
      <div className="flex flex-col gap-4 text-center w-96 mx-auto overflow-y-hidden">
        <div className="flex flex-row justify-evenly text-xl">
          <p>Rank</p>
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
  )
}

function LeaderboardEntry({ name, score, rank }) {
  return (
    <div className="flex flex-row justify-evenly items-center h-10 bg-gray-800 rounded-lg">
      <p>{rank}</p>
      <p>{name}</p>
      <p>{score}</p>
    </div>
  )
}

function LeaderboardTopScorer({ name, score, rank }) {
  return (
    <div className="flex flex-row justify-evenly items-center h-14 bg-gray-800 rounded-lg font-bold">
      <p>{rank}</p>
      <p>{name}</p>
      <p>{score}</p>
    </div>
  )
}
