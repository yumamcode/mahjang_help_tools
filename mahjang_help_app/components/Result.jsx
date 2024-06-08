import Image from "next/image";
import styles from "@/components/Result.module.css"

export default function Result(props) {
  return (
  <div id={props.id} className={styles.result}>
    {props.result}
  </div>
  );
}
