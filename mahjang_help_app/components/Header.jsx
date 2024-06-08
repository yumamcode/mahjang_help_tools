import Image from "next/image";
import styles from "@/components/Header.module.css"

export default function Header(props) {
  return (
  <div className={styles.title}>
    {props.title}
  </div>
  );
}
