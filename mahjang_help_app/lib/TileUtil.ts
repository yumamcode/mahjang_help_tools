class TileUtil {
  public static getSuit = (tile: string): string => {
    return tile.charAt(0);
  };

  public static getNumberString = (tile: string): string => {
    return tile.charAt(1);
  };
}

export { TileUtil };
