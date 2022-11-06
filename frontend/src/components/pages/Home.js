import React, {useState} from 'react';
import SidebarWithHeader from '../organisms/SidebarWithHeader';
import Calendar from 'react-calendar';
import { 
  Box
} from '@chakra-ui/react';

const Home = (props) => {
  const [value, setValue] = useState(new Date());
  const onChange = (val) => {
    setValue(val);
  };
  return <SidebarWithHeader>
    <Box>
      <Calendar onChange={onChange} value={value} />
    </Box>
  </SidebarWithHeader>;
};

export default Home;
