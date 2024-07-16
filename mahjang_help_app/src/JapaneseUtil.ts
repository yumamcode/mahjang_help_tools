function kanaToHira(str: string) {
  return str.replace(/[\u30a1-\u30f6]/g, function (match) {
    var chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}

function hiraToKana(str: string) {
  return str.replace(/[\u3041-\u3096]/g, function (match) {
    var chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
}

function isFullHiragana(str: string) {
  str = str == null ? "" : str;
  if (str.match(/^[\u3040-\u309f\u30fc]+$/)) {
    return true;
  } else {
    return false;
  }
}

function isFullKatakana(str: string) {
  str = str == null ? "" : str;
  if (str.match(/^[\u30A0-\u30ff\u30fc]+$/)) {
    return true;
  } else {
    return false;
  }
}
export { kanaToHira, hiraToKana, isFullHiragana, isFullKatakana };
