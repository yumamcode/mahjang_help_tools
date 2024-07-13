import styles from "@/styles/RequiredIcon.module.css";
const RequiredIcon = ({ innerText }: { innerText: string }) => {
  return <label className={styles.requiredLabel}>{innerText}</label>;
};

export { RequiredIcon };
