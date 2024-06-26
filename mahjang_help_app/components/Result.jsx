export default function Result(props) {
  return (
    <div id={props.id} className={props.className}>
      {props.result}
    </div>
  );
}
