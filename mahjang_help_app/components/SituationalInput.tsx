import React, { Dispatch, SetStateAction } from "react";
import { HStack } from "@chakra-ui/react";
import { Header } from "./Header";
import { SITUATIONALS } from "../src/Constant";
import type { Meld } from "./MeldInput";

const SituationalInput = ({
  melds,
  situational,
  setSituational,
}: {
  melds: Meld[];
  situational: string[];
  setSituational: Dispatch<SetStateAction<string[]>>;
}) => {
  const addSituational = (newSituational: string) => {
    setSituational([...situational, newSituational]);
  };

  const deleteSituational = (targetSituational: string) => {
    setSituational(situational.filter((sit) => sit != targetSituational));
  };

  return (
    <div>
      <Header title="状況役入力" className="text-center text-lg py-3"></Header>
      <HStack className="flex justify-center py-3 flex-wrap">
        {Object.values(SITUATIONALS).map((role, idx) => {
          return (
            <label key={role}>
              <input
                type="checkbox"
                disabled={
                  melds.length > 0 &&
                  (role == SITUATIONALS.RICHI || role == SITUATIONALS.W_RICHI)
                }
                checked={situational.includes(role)}
                onChange={() =>
                  situational.includes(role)
                    ? deleteSituational(role)
                    : addSituational(role)
                }
              />
              {role}
            </label>
          );
        })}
      </HStack>
    </div>
  );
};

export { SituationalInput };
