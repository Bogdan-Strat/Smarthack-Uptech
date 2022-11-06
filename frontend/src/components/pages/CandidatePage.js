import React, {useState} from 'react';
import {Flex, Input, ButtonGroup, FormLabel, Button} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import {validateToken as validateAction, validateToken} from '../../state/actions/candidate.js';

const CandidatePage = () => {
  const [token, setToken] = useState('');
  const dispatch = useDispatch();

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" w='100vw' h='100vh' bg='#F2F0EB'>
      <FormLabel fontSize='xl'>
        Enter your candidate token
      </FormLabel>
      <ButtonGroup size='xl' isAttached variant='outline'>
        <Input placeholder='buna' value={token} onChange={(e) => setToken(e.target.value)}></Input>
        <Button onClick={() => dispatch(validateToken(token))}>Save</Button>
      </ButtonGroup>
    </Flex>
  );
};

export default CandidatePage;
