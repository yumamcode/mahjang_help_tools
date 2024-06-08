import Image from "next/image";
import styles from "@/components/Header.module.css"
import xiangtingNum from "@/src/mahjang";

export default function Header(props) {
  return (
  <div className={styles.title}>
    {props.title}
  </div>
  );
}
