import Image from "next/image";
import styles from "@/components/ErrorMsg.module.css"
import Link from "next/link";

export default function ErrorMsg(props) {
    return (
    <div id={props.id} className={styles.error_msg}>
      {props.msg}
    </div>
    );
}
