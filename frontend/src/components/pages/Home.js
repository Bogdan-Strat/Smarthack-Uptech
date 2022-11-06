
import {Text} from '@chakra-ui/react';
import React, {useState} from 'react';
import SidebarWithHeader from '../organisms/SidebarWithHeader';
import Calendar from 'react-calendar';
import {
  Image,
  Flex,
} from '@chakra-ui/react';

const Home = (props) => {
  const [value, setValue] = useState(new Date());
  const onChange = (val) => {
    setValue(val);
  };
  return <SidebarWithHeader>
    <Text fontSize="4xl">Welcome!</Text>
    <Flex h="auto" w="auto" display="inline" borderRadius="xl">
      <Image mb="4" fit="cover" borderRadius="xl" src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
        h="400px" w="100%"></Image>
      <Calendar onChange={onChange} value={value} />
    </Flex>
  </SidebarWithHeader>;
};

export default Home;
