import { HandInput } from "@/components/HandInput";
import { MeldInput } from "@/components/MeldInput";
import { KanInput } from "@/components/KanInput";
import { useState } from "react";
import type { Meld } from "@/components/MeldInput";

export default function Home(){
  const [hand,setHand] = useState<string[]>([]);
  const [melds, setMelds] = useState<Meld[]>([]);
  const [kans, setKans] = useState<string[][]>([]);

  return <>
    <HandInput hand={hand} setHand={setHand}></HandInput>
    <MeldInput melds={melds} setMelds={setMelds} kans={kans}></MeldInput>
    <KanInput kans={kans} setKans={setKans} melds={melds}></KanInput>
  </>
}