import React, {useState} from 'react';
import {Flex, Input, ButtonGroup, FormLabel, Button} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import {validateToken} from '../../state/actions/candidate.js';

const TokenValidationPage = ({validationSetter}) => {
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" w='100%' h='100%' bg='#F2F0EB'>
      <FormLabel fontSize='xl'>
        Enter your candidate token
      </FormLabel>
      <ButtonGroup size='xl' isAttached variant='outline'>
        <Input bg='white' placeholder='your token' value={token} onChange={(e) => setToken(e.target.value)}></Input>
        <Button bg='#00754A' color='white' p='0.5rem' onClick={() => dispatch(validateToken(token, validationSetter))}>Save</Button>
      </ButtonGroup>
    </Flex>
  );
};

export default TokenValidationPage;
