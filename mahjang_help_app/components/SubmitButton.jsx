import ErrorMsg from './ErrorMsg.jsx';

const haiConverter = require('../src/haiConverterTextToArray.js');

const Majiang = require('@kobalab/majiang-core');

let isValidShoupai;

export default function SubmitButton(props) {
  return (
    <div className='text-center py-2'>
      <button type="button"
      id={props.id}
      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br
      focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg
      text-sm px-3 py-2 text-center me-2 mb-2"
      onClick={()=>buttonHandler(props)}>
        {props.name}
      </button>
      <ErrorMsg msg="牌の形式が正しくありません。" id="input_hai_error_msg" valid={isValidShoupai}></ErrorMsg>
    </div>
  );
}

const buttonHandler = (props)=>{
  const input_hai_value = props.input;

  if(input_hai_value === ""){
    alert("入力欄が空です。");
    return false;
  }

  const input_hai_array = haiConverter(input_hai_value);
  let shoupai;

  try{
   shoupai = new Majiang.Shoupai(input_hai_array);
  }catch(err){
    isValidShoupai = false;
    return false;
  }
  isValidShoupai = true;
  
  const $result = document.getElementById("shanten_result");
  $result.textContent = "シャンテン数は" + Majiang.Util.xiangting(shoupai) + "です。";
};