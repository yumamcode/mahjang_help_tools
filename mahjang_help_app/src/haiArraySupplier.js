module.exports = ()=>{

const NUM_HAI_KINDS = ["m","p","s"];

const HAI_ARRAY = [];

for(let kind of NUM_HAI_KINDS){
  for(let i=1;i < 10;i++){
    HAI_ARRAY.push(kind + i);
  }
}

for(let i=1;i < 8;i++){
  HAI_ARRAY.push("z"+i);
}

return HAI_ARRAY;
};