module.exports = function(haiTextInput){
  const hai_array = haiTextInput.split('/d');
  let dom = "";
  for(const hai of hai_array){
    const src = `/haiImg/${hai}.jpg`;
    const image =  "<image src={src} alt={input_hai} key={index} />";
    dom+=image;
    console.log(dom);
  }
  return dom;
};