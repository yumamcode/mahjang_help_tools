import styles from "@/styles/ErrorMsg.module.css";

const ErrorMsg = ({ msg }: { msg: string }) => {
  return <div className={styles.error_msg}>{msg}</div>;
};

export { ErrorMsg };
