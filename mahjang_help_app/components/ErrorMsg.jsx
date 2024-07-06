import styles from "@/components/ErrorMsg.module.css";

const ErrorMsg = function ErrorMsg(props) {
  return (
    <div id={props.id} className={styles.error_msg}>
      {props.msg}
    </div>
  );
};

export { ErrorMsg };
