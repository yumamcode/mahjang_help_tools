import styles from "@/components/Input.module.css"
import SubmitButton from "@/components/SubmitButton";

export default function Input(props) {
  return (
  <div className={styles.content}>
    <label className={styles.label_name} htmlFor={props.id}>{props.name}</label>
    <input className={styles.input_hai} type="text" name={props.id} id={props.id}/>
    <SubmitButton name="決定" id="hai_submit_button"></SubmitButton>
  </div>
  );
}