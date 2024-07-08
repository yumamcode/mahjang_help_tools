import styles from "./RequiredIcon.module.css";
const RequiredIcon = ({ innerText }: { innerText: string }) => {
  return <label className={styles.requiredLabel}>{innerText}</label>;
};

export { RequiredIcon };
