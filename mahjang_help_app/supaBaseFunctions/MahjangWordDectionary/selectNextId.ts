import { supabase } from "@/providers/SupaBase";

const selectNextId = async () => {
  const { data, error } = await supabase
    .from("MahjangWordDectionary")
    .select("id");
  if (error) {
    return 1;
  }
  if (!data) {
    return 1;
  }
  const ids: number[] = data.map((d) => d.id);
  return Math.max(...ids) + 1;
};
export { selectNextId };
