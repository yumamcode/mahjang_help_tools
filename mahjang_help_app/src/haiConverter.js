module.exports = 
(haiText) =>
  {
const regex = /([a-zA-Z]+)(\d+)/g;
const matches = haiText.match(regex);
if(matches == null){
  return false;
}
const result = matches.map(match => {
    return match.substring(0,1) + match.substring(1);
  });
return result;
}