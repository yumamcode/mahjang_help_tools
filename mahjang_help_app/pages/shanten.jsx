import Image from "next/image";
import Header from "@/components/Header";
import Contents from "@/components/Contents";
import Description from "@/components/Description";
import Result from "@/components/Result";
import ErrorMsg from "@/components/ErrorMsg";
import HaiInputForm from "@/components/HaiInputForm";
import SubmitButton from "@/components/SubmitButton";
import { Provider } from "@/providers/Provider";


export default function Home() {
  return (
    <Provider>
      <Header title="シャンテン数確認"></Header>
      <HaiInputForm></HaiInputForm>
      <div className="my-20"></div>
      <div className="flex justify-center">
        <div className="flex flex-wrap  w-48">
        </div>
      </div>
      <Result id="shanten_result"></Result>
      {/* <div class="mx-auto max-w-sm transform hover:-translate-y-1 duration-300 bg-orange-200 hover:shadow-xl cursor-pointer">
        <div class="my-auto pb-12 ">
            <h1 class="text-lg font-semibold mb-auto text-gray-700">入力した牌</h1>
            <p className="flex justify-center content-center py-5" id="disp_hai_area">
            </p>
            <input type="hidden" id="input_hai"></input>
        </div>
      </div> */}
      <div className="my-20"></div>
   </Provider>
  );
}
