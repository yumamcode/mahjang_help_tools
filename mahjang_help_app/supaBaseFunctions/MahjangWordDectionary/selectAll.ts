import { supabase } from "@/providers/SupaBase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { DateTime } from "next-auth/providers/kakao";

type Dictionary = {
  id: number;
  created_at: DateTime;
  chinese_word: string;
  word: string;
  description: string;
  relative_word_id: number;
};

const selectAll = async (): Promise<PostgrestSingleResponse<Dictionary[]>> => {
  return await supabase.from("MahjangWordDectionary").select("*");
};

export { selectAll };
export type { Dictionary };
