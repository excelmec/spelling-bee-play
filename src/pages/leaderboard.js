import Leaderboard from "../components/Leaderboard/Leaderboard";
import { Navbar, Footer } from "../components";
import MainLayout from "../components/MainLayout/MainLayout";

export default function leaderboard() {
  return (
    <MainLayout>
      <div
        className="leaderboard"
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingTop: "6rem",
        }}
      >
        <Leaderboard />
      </div>
    </MainLayout>
  );
}
