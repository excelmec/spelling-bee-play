import Leaderboard from "../components/Leaderboard/Leaderboard";
import { Navbar, Footer } from "../components";
import MainLayout from "../components/MainLayout/MainLayout";

export default function leaderboard() {
  return (
    <MainLayout>
      <div
        className="leaderboard"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "5rem",
        }}
      >
        <Leaderboard />
      </div>
    </MainLayout>
  );
}
