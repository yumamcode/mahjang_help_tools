import Image from "next/image";
import Header from "@/components/Header";
import Contents from "@/components/Contents";
import Description from "@/components/Description";
import Result from "@/components/Result";
import ErrorMsg from "@/components/ErrorMsg";
import HaiImages from "@/components/HaiImages";
import SubmitButton from "@/components/SubmitButton";


export default function Home() {
  return (
    <div>
      <Header title="シャンテン数確認"></Header>
      <HaiImages></HaiImages>
      <SubmitButton name="決定" id="hai_submit_button"></SubmitButton>
      <div className="my-20"></div>
      <div className="flex justify-center">
        <div className="flex flex-wrap  w-48">
        </div>
      </div>
      <Result id="shanten_result"></Result>
      <div class="mx-auto max-w-sm transform hover:-translate-y-1 duration-300 bg-orange-200 hover:shadow-xl cursor-pointer">
        <div class="my-auto pb-12 ">
            <h1 class="text-lg font-semibold mb-auto text-gray-700">入力した牌</h1>
            <p className="flex justify-center content-center py-5" id="disp_hai_area">
            </p>
            <input type="hidden" id="input_hai"></input>
        </div>
        </div>
      <ErrorMsg msg="牌の形式が正しくありません。" id="input_hai_error_msg"></ErrorMsg>
      <div className="my-20"></div>
      <Description></Description>
   </div>
  );
}
