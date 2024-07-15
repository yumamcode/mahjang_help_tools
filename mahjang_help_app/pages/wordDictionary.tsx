import { MahjangHeader } from "@/components/MahjangHeader";
import { SearchBox } from "@/components/SearchBox";
import { Provider } from "@/providers/Provider";
import {
  Dictionary,
  selectAll,
} from "@/supaBaseFunctions/MahjangWordDectionary/selectAll";
import { Box, Center } from "@chakra-ui/react";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { SearchWord } from "@/components/SearchBox";

export default function Home() {
  const [dictionary, setDictionary] =
    useState<PostgrestSingleResponse<Dictionary[]>>();
  useEffect(() => {
    const fetchDictionary = async () => {
      setDictionary(await selectAll());
    };
    fetchDictionary();
  }, []);

  const convertDictionaryToSearchWords = (
    dictionaryResult: PostgrestSingleResponse<Dictionary[]> | undefined
  ): SearchWord[] => {
    const searchWords: SearchWord[] = [];
    if (!dictionaryResult) {
      return searchWords;
    }
    if (!dictionaryResult.data) {
      return searchWords;
    }

    for (let dictionary of dictionaryResult.data) {
      const searchWord: SearchWord = {
        word: dictionary.word,
        description: dictionary.description,
      };
      searchWords.push(searchWord);
    }

    return searchWords;
  };

  return (
    <Provider>
      <MahjangHeader></MahjangHeader>
      <SearchBox
        searchWords={convertDictionaryToSearchWords(dictionary)}
      ></SearchBox>
    </Provider>
  );
}
