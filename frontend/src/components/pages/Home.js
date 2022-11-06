import {Text} from '@chakra-ui/react';
import React from 'react';
import SidebarWithHeader from '../organisms/SidebarWithHeader';

const Home = (props) => {
  return <SidebarWithHeader>
    <Text fontSize="4xl">Welcome!</Text>
  </SidebarWithHeader>;
};

export default Home;
