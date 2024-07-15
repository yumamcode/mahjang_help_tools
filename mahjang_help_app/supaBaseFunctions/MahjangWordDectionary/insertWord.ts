import { supabase } from "@/providers/SupaBase";
import { selectNextId } from "./selectNextId";

const insertWord = async ({
  word,
  description,
}: {
  word: string | null | undefined;
  description: string | null | undefined;
}) => {
  const nextId = await selectNextId();
  const { error } = await supabase
    .from("MahjangWordDectionary")
    .insert({ id: nextId, word: word, description: description });

  if (error) {
    return false;
  }
};

export { insertWord };
