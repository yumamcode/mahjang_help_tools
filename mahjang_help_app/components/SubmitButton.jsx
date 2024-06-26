export default function SubmitButton(props) {
  return (
    <div className="text-center py-3">
      <button
        type="button"
        id={props.id}
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br
      focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg
      text-sm px-3 py-2 text-center me-2 mb-2"
        onClick={props.onClick}
      >
        {props.name}
      </button>
    </div>
  );
}
