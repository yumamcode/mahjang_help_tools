import Image from "next/image";
import styles from "@/components/Header.module.css"

export default function Header(props) {
  return (
  <div className="text-center text-4xl my-10">
    {props.title}
  </div>
  );
}
