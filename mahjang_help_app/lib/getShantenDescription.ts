import { CHINESE_COUNT_DESCRIPTIONS } from "@/lib/constants/Constant";

const getShantenDescription = (n: number): string | undefined => {
  if (n === -1) {
    return "上がり形";
  }

  if (n === 0) {
    return "テンパイ";
  }

  const chineseCountDescription = CHINESE_COUNT_DESCRIPTIONS.get(n);

  if (chineseCountDescription === undefined) {
    return undefined;
  }

  return `${chineseCountDescription}シャンテン`;
};

export { getShantenDescription };
