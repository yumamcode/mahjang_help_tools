import Image from "next/image";
import xiangtingNum from "@/src/mahjang";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Contents from "@/components/Contents";
import Description from "@/components/Description";
import SubmitButton from "@/components/SubmitButton";

export default function Home() {
  return (
    <div>
      <Header title="シャンテン数確認"></Header>
      <Input name="手牌入力" id="input_hai"></Input>
      <Description></Description>
   </div>
  );
}
