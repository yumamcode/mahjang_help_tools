import Image from "next/image";
import { createRoot } from "react-dom/client";
import styles from "@/components/HaiImages.module.css"
import { useState } from "react";

const haiArraySupplier = require('../src/haiArraySupplier.js');

export default function HaiImages(props) {

  const [imageList,setImageList] = useState([]);

  const addImage = (hai) =>{
    if(imageList.length >= 14){
      return false;
    }
    imageList.push(`/haiImg/${hai}.jpg`);
    setImageList(imageList);
    const root = createRoot(document.getElementById("disp_hai_area"));
    root.render(
      imageList.map(
        (img,index)=>{
      return <Image src={img} width="20" height="20" alt="" key={index}></Image>
    }));
  }

  const HAI_ARRAY = haiArraySupplier();

  const images = HAI_ARRAY.map((hai,index)=>{
    const src = "/haiImg/" + hai + ".jpg";
    return <Image src={src} width="20" height="20" data-hai={hai} 
    onClick={
      (e)=>
        {
          addImage(e.target.getAttribute("data-hai"));
          updateHiddenHaiInput(e);
        }
      } alt="" key={index}></Image>;
  });

  return (
  <div className="flex justify-center">
    <div className="flex flex-wrap  w-48">
      {images}
    </div>
  </div>
  );
}

const updateHiddenHaiInput = function (e) {
  const $input_hai = document.getElementById("input_hai");
  const hai_value = e.target.getAttribute("data-hai");
  $input_hai.value += hai_value;
};