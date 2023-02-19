import CustomTitle from "../utils/customTitle";
import MainLayout from "../components/MainLayout/MainLayout";

import Image from "next/image";

import FirstPrize from "../assets/first.png";
import SecondPrize from "../assets/second.png";
import ThirdPrize from "../assets/third.png";

export default function prizes() {
  return (
    <MainLayout>
      <CustomTitle title="Prizes" />
      <div
        style={{
          minHeight: "90vh",
          paddingTop: "8rem",
          display: "flex",
          gap: "3rem",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          className="text-4xl font-bold md:text-5xl"
          style={{
            color: "#fff",
          }}
        >
          Prizes
        </h1>
        <div
          className="flex flex-col items-center justify-center gap-10 text-white prizes sm:flex-row"
          style={{
            padding: "2rem",
            paddingTop: "3rem",
            paddingBottom: "3rem",
          }}
        >
          <div className="flex flex-col items-center justify-center order-2 gap-4 sm:order-1">
            <Image src={SecondPrize} className="first-image" />
            <p
              className="text-xl"
              style={{
                color: "#1cf9c9",
                fontWeight: "700",
                fontSize: "2rem",
              }}
            >
              ₹2,000
            </p>
          </div>
          <div className="flex flex-col items-center justify-center order-1 gap-4 sm:order-2 sm:-translate-y-8">
            <Image src={FirstPrize} className="first-image" />
            <p
              className="text-xl"
              style={{
                color: "#1cf9c9",
                fontWeight: "700",
                fontSize: "2rem",
              }}
            >
              ₹3,000
            </p>
          </div>
          <div className="flex flex-col items-center justify-center order-3 gap-4 sm:order-3">
            <Image src={ThirdPrize} className="first-image" />
            <p
              className="text-xl"
              style={{
                color: "#1cf9c9",
                fontWeight: "700",
                fontSize: "2rem",
              }}
            >
              ₹1,000
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
