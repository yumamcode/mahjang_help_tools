import Image from "next/image";

const haiArraySupplier = require('../src/haiArraySupplier.js');

export default function HaiImages(props) {

  const HAI_ARRAY = haiArraySupplier();

  const images = HAI_ARRAY.map(hai=>{
    const src = "/haiImg/" + hai + ".jpg";
    return <Image src={src} width="20" height="20" data-hai={hai} onClick={haiClickEvent}></Image>;
  });

  return (
  <div className="flex justify-center">
    <div className="flex flex-wrap  w-48">
      {images}
    </div>
  </div>
  );
}

const haiClickEvent = function (e) {
  const $input_hai = document.getElementById("input_hai");
  console.log(e.target.getAttribute("data-hai"));
  $input_hai.value += e.target.getAttribute("data-hai");
};