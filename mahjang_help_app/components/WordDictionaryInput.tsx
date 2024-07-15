import { MouseEventHandler, useRef, useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { Box, Input } from "@chakra-ui/react";
import { insertWord } from "@/supaBaseFunctions/MahjangWordDectionary/insertWord";

const WordDictionaryInput = () => {
  const [word, setWord] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <Box className="text-center">
        <label>単語</label>
        <Input
          type="text"
          value={word}
          backgroundColor="white"
          onChange={(e) => setWord(e.target.value)}
        ></Input>
      </Box>
      <Box className="text-center">
        <label>説明</label>
        <Box>
          <textarea
            value={description}
            style={{ width: "300px", height: "300px" }}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </Box>
      </Box>
      <SubmitButton
        name="登録"
        onClick={async () => {
          const isInsertError = await insertWord({
            word: word,
            description: description,
          });
          if (isInsertError) {
            alert("登録エラー");
          } else {
            alert("登録成功");
          }
        }}
      ></SubmitButton>
    </>
  );
};

export { WordDictionaryInput };
