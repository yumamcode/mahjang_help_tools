import Image from "next/image";
import styles from "@/components/Description.module.css"

export default function Description(props) {
  return (
  
<div class="mx-auto max-w-lg">
  <div class="divide-y divide-gray-100">
    <details class="group">
      <summary class="flex cursor-pointer list-none items-center justify-between py-1 text-lg font-medium text-secondary-900 bg-orange-400 rounded-xl w-24">
        <div className={styles.description}>
          使い方
        </div>
        <div class="text-secondary-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="block h-5 w-5 transition-all duration-300 group-open:rotate-180">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </summary>
        <div class="pl-1 pb-4 bg-gray-200 text-secondary-500 rounded-xl">
          萬子をm,筒子をp,索子をs,字牌をzと表し、
          <br/>その後に数字をつけて麻雀稗を表現します。
          <br/>例えば、m3は萬子の3,p9は筒子の9,s5は索子の5です。
          <br/>字牌はz1が東,z2が南,...,z5が白,z6が發,z7が中です。
        </div>
    </details>
  </div>
</div>
  );
}
