import Header from "@/components/Header";
import HaiInputForm from "@/components/HaiInputForm";
import { Provider } from "@/providers/Provider";
import {Box} from "@chakra-ui/react";


export default function Home() {
  return (
    <Provider>
      <Header title="シャンテン数確認"></Header>
      <HaiInputForm></HaiInputForm>
      <Box py="20"></Box>
   </Provider>
  );
}
