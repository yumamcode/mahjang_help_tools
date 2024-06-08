const haiConverter = require('../src/haiConverter.js');

const Majiang = require('@kobalab/majiang-core');

export default function SubmitButton(props) {
  return (
    <div className='text-center py-2'>
      <button type="button"
      id={props.id}
      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br
      focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg
      text-sm px-3 py-2 text-center me-2 mb-2"
      onClick={buttonHandler}>
        {props.name}
      </button>
    </div>
  );
}

const buttonHandler = ()=>{
  const $input_hai = document.getElementById("input_hai");
  const input_hai_value = $input_hai.value;
  

  if(input_hai_value === ""){
    alert("入力欄が空です。");
    return false;
  }

  const input_hai_array = haiConverter(input_hai_value);
  const $err_meg = document.getElementById("input_hai_error_msg");
  let shoupai;

  try{
   shoupai = new Majiang.Shoupai(input_hai_array);
  }catch(err){
    $err_meg.style.display = "block";
    return false;
  }
  
  $err_meg.style.display = "none";
  const $result = document.getElementById("shanten_result");
  $result.textContent = "シャンテン数は" + Majiang.Util.xiangting(shoupai) + "です。";
};