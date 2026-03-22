const NUM_HAI_KINDS = ["m", "p", "s"];

const HAI_ARRAY: string[] = [];

//　数牌(萬子・筒子・索子)
for (let kind of NUM_HAI_KINDS) {
  for (let i = 1; i < 10; i++) {
    HAI_ARRAY.push(kind + i);
  }
}

// 字牌(東南西北白發中をz1～z7で表す。)
for (let i = 1; i < 8; i++) {
  HAI_ARRAY.push("z" + i);
}

export { HAI_ARRAY };
