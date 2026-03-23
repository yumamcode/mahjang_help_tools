const isChiable = (n: number | string): boolean => {
  if (typeof n == "string") {
    try {
      n = Number.parseInt(n);
    } catch (e) {
      return false;
    }
  }
  if (!Number.isInteger(n)) {
    return false;
  }
  if (1 <= n && n <= 7) {
    return true;
  }
  return false;
};

export { isChiable };
