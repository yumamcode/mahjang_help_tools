import Image from "next/image";
import xiangtingNum from "@/src/mahjang";
import styles from "@/components/Description.module.css"

export default function Description(props) {
  return (
  <div className={styles.description}>
      萬子をm,筒子をp,索子をs,字牌をzと表し、
      <br/>その後に数字をつけて麻雀稗を表現します。
      <br/>例えば、m3は萬子の3,p9は筒子の9,s5は索子の5です。
      <br/>字牌はz1が東,z2が南,...,z5が白,z6が發,z7が中です。
  </div>
  );
}
