import { Img } from '@chakra-ui/react';
import React from 'react';
import { Provider } from "@/providers/Provider.jsx";

const Tile = ({ tile,className,onClick }) => (
  <Provider>
    <Img 
      src={`/haiImg/${tile}.jpg`}
      alt={tile}
      className={className}
      width="40px"
      height="auto"
      onClick={() => onClick(tile)} style={{ cursor: 'pointer' }} />
  </Provider>
);

export default Tile;
