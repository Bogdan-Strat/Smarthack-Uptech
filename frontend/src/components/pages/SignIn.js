import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const SignIn = () => {
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
  });
  const submitHandler = (e) => {
    e.preventDefault();

    let data = {};
    axios
        .post('https://localhost:7132/UserAccount/login', newUser)
        .then((res) => {
          data = res.data;
          setNewUser({
            email: '',
            password: '',
          });
          console.log(data);
        });
  };
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({...newUser, email: e.target.value})
                }
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({...newUser, password: e.target.value})
                }
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{base: 'column', sm: 'row'}}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                onClick={submitHandler}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignIn;
