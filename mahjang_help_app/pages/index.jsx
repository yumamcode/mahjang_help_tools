import Image from "next/image";
import Header from "@/components/Header";
import Contents from "@/components/Contents";
import BackGroundImg from "@/components/BackGroundImg";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <Image src="/haiImg/s1.jpg" width="20" height="20"></Image>
        <Header title="麻雀支援ツール"></Header>
        <Image src="/haiImg/s1.jpg" width="20" height="20"></Image>
      </div>
      <Contents></Contents>
   </div>
  );
}
