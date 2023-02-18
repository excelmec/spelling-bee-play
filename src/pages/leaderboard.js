import Leaderboard from "../components/Leaderboard/Leaderboard";
import CustomTitle from "../utils/customTitle";
import MainLayout from "../components/MainLayout/MainLayout";

export default function leaderboard() {
  return (
    <MainLayout>
      <CustomTitle title="Leaderboard" />
      <div
        className="leaderboard"
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingTop: "8rem",
        }}
      >
        <Leaderboard />
      </div>
    </MainLayout>
  );
}
