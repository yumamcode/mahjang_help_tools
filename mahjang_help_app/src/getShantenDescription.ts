import { CHINESE_COUNT_DESCRIPTIONS } from "./Constant";

const getShantenDescription = (n: number): string | undefined => {
  if (n === -1) {
    return "上がり形";
  }
  if (n === 0) {
    return "テンパイ";
  }

  if (typeof CHINESE_COUNT_DESCRIPTIONS.get(n) === undefined) {
    return undefined;
  }

  return CHINESE_COUNT_DESCRIPTIONS.get(n) + "シャンテン";
};

export { getShantenDescription };
