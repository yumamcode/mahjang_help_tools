import Image from "next/image";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Contents from "@/components/Contents";
import Description from "@/components/Description";
import SubmitButton from "@/components/SubmitButton";
import Result from "@/components/Result";
import ErrorMsg from "@/components/ErrorMsg";
import HaiImages from "@/components/HaiImages";

export default function Home() {
  return (
    <div>
      <Header title="シャンテン数確認"></Header>
      <Input name="手牌入力" id="input_hai"></Input>
      <HaiImages></HaiImages>
      <div className="flex justify-center">
        <div className="flex flex-wrap  w-48" id="disp_hai_area">

        </div>
      </div>
      <Result id="shanten_result"></Result>
      <ErrorMsg msg="牌の形式が正しくありません。" id="input_hai_error_msg"></ErrorMsg>
      <div className="my-20"></div>
      <Description></Description>
   </div>
  );
}