/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ztRZe4vvD47
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Input } from "@chakra-ui/react";

type SearchWord = {
  word: string;
  description: string;
};

const SearchBox = ({ searchWords }: { searchWords: SearchWord[] }) => {
  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden w-full max-w-md mx-auto">
      <div className="p-4 border-b dark:border-gray-800">
        <Input
          placeholder="Search..."
          className="bg-muted dark:bg-gray-900 rounded-md w-full"
        />
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        <ul className="divide-y dark:divide-gray-800">
          {searchWords.map((w) => {
            return (
              <li
                key={w.description}
                className="px-4 py-3 hover:bg-muted/50 dark:hover:bg-gray-900 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{w.word}</h4>
                    <p className="text-sm text-muted-foreground">
                      {w.description}
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
