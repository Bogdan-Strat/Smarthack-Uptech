import {Box} from '@chakra-ui/react';
import React from 'react';

const Card = ({w, h, children, ...otherProps}) => {
  return <Box w={w} h={h} bg="white.300" borderRadius="xl" shadow="lg" {...otherProps}>
    {children}
  </Box>;
};

export default Card;
