import { Img } from "@chakra-ui/react";
import React from "react";
import { Provider } from "@/providers/Provider.jsx";

const Tile = ({
  tile,
  className,
  onClick,
  size,
}: {
  tile: string;
  className?: string;
  onClick?: Function;
  size?: "xs" | "s" | "m" | "l" | "xl";
}) => {
  const TILE_SIZE_AND_WIDTH_MAP = {
    xs: "20px",
    s: "30px",
    m: "40px",
    l: "50px",
    xl: "60px",
  };
  return (
    <Provider>
      <Img
        src={`/haiImg/${tile}.jpg`}
        alt={tile}
        className={className}
        width={size ? TILE_SIZE_AND_WIDTH_MAP[size] : "40px"}
        height="auto"
        onClick={() => onClick && onClick(tile)}
        style={{ cursor: "pointer" }}
      />
    </Provider>
  );
};

export { Tile };
