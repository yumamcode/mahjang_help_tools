import Image from "next/image";
import styles from "@/components/BackGroundImg.module.css"
import Link from "next/link";

export default function BackGroundImg() {
  return (
  <div className={styles.back_ground_img}>
    <Image src="/contemporary_china_2.jpg" fill sizes="50vw" alt=""/>
  </div>
  );
}