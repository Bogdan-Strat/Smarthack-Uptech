import React, {useEffect} from 'react';
import axios from 'axios';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import {useState} from 'react';
import ROUTES from '../../utils/Routes.js';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const submitHandler = (e) => {
    e.preventDefault();

    let data = {};
    axios
        .post('https://localhost:7132/UserAccount/register', newUser)
        .then((res) => {
          data = res.data;
          setNewUser({
            firstName: '',
            lastName: '',
            username: '',
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
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={newUser.firstName}
                    onChange={(e) =>
                      setNewUser({...newUser, firstName: e.target.value})
                    }
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={newUser.lastName}
                    onChange={(e) =>
                      setNewUser({...newUser, lastName: e.target.value})
                    }
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="username" isRequired>
              <FormLabel>Username:</FormLabel>
              <Input
                type="text"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({...newUser, username: e.target.value})
                }
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({...newUser, email: e.target.value})
                }
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({...newUser, password: e.target.value})
                  }
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={submitHandler}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} href={ROUTES.SIGN_IN}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
