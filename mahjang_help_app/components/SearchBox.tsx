/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ztRZe4vvD47
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { hiraToKana, isFullHiragana } from "@/src/JapaneseUtil";
import { Input } from "@chakra-ui/react";
import { useState } from "react";

type SearchWord = {
  word: string;
  description: string;
};

const SearchBox = ({ searchWords }: { searchWords: SearchWord[] }) => {
  const [searchInput, setSearchInput] = useState<string>("");

  //辞書の単語を単語の五十音順で並べる。
  const searchWordComparetor = (a: SearchWord, b: SearchWord) => {
    const minLength = Math.min(a.word.length, b.word.length);
    for (let i = 0; i < minLength; i++) {
      if (a.word.charCodeAt(i) > b.word.charCodeAt(i)) {
        return 1;
      }

      if (a.word.charCodeAt(i) < b.word.charCodeAt(i)) {
        return -1;
      }
    }

    return 0;
  };
  searchWords = searchWords.sort((before, after) =>
    searchWordComparetor(before, after)
  );
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md mx-auto">
      <div className="p-4 border-b">
        <Input
          as="input"
          placeholder="Search..."
          value={searchInput}
          className="bg-muted rounded-md w-full"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        ></Input>
      </div>
      <div className="max-h-[500px] overflow-y-auto">
        <ul className="divide-y">
          {searchWords
            .filter((sw) => {
              if (isFullHiragana(searchInput)) {
                return sw.word.includes(hiraToKana(searchInput));
              } else {
                return sw.word.includes(searchInput);
              }
            })
            .map((sw) => {
              return (
                <li
                  key={sw.description}
                  className="px-4 py-3 hover:bg-muted/50 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{sw.word}</h4>
                      <p className="text-sm text-muted-foreground">
                        {sw.description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export { SearchBox };
export type { SearchWord };
