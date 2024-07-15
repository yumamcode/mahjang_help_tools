import { Header } from "@/components/Header";
import { MahjangHeader } from "@/components/MahjangHeader";
import { WordDictionaryInput } from "@/components/WordDictionaryInput";
import { Provider } from "@/providers/Provider";

export default function Home() {
  return (
    <Provider>
      <MahjangHeader></MahjangHeader>
      <Header className="text-center py-3" title="用語集管理画面"></Header>
      <WordDictionaryInput></WordDictionaryInput>
    </Provider>
  );
}
