import Image from "next/image";
import xiangtingNum from "@/src/mahjang";
import Header from "@/components/Header";
import Contents from "@/components/Contents";
import BackGroundImg from "@/components/BackGroundImg";

export default function Home() {
  return (
    <div>
      <Header title="麻雀支援ツール"></Header>
      <Contents></Contents>
   </div>
  );
}
