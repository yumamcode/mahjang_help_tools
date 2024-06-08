import Image from "next/image";
import styles from "@/components/Contents.module.css"
import Link from "next/link";

export default function Contents() {
  return (
  <div>
    <div className={styles.items}>
      <Link href="/shanten">
        シャンテン数確認
      </Link>
    </div>
  </div>
  );
}