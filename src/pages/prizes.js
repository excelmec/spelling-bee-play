import CustomTitle from "../utils/customTitle"
import MainLayout from "../components/MainLayout/MainLayout"

import Image from "next/image"

import FirstPrize from "../assets/first.png"
import SecondPrize from "../assets/second.png"
import ThirdPrize from "../assets/third.png"

export default function prizes() {
  return (
    <MainLayout>
      <CustomTitle title="Prizes" />
      <h1 className="mt-32 mb-4 text-white font-bold text-5xl">Prizes</h1>
      <div className="prizes text-white flex flex-col sm:flex-row justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center gap-4 order-2 sm:order-1">
          <Image src={SecondPrize} width={100} height={100} />
          <p className="text-xl">₹2,000</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 order-1 sm:order-2 sm:-translate-y-8">
          <Image src={FirstPrize} width={100} height={100} />
          <p className="text-xl">₹3,000</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 order-3 sm:order-3">
          <Image src={ThirdPrize} width={100} height={100} />
          <p className="text-xl">₹1,000</p>
        </div>
      </div>
    </MainLayout>
  )
}
