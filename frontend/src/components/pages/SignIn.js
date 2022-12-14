import React from 'react';
import {useState} from 'react';
import {connect} from 'react-redux';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {signIn} from '../../state/actions/auth';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import ROUTES from '../../utils/Routes';

const SignIn = ({signIn}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    signIn(newUser).then(() => setTimeout(navigate(ROUTES.HOME), 0));
  };
  return (
    <Flex
      minH={'100vh'}
      direction="row"
      justifyContent="flex-end"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Box
        w='50w'>
        <Image objectFit='cover' h='100%' src='https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80' alt='Dan Abramov' />
      </Box>
      <Flex
        w='50vw'
        px="28"
        justifyContent='center'
        direction='column'
        gap="12"
        bg={useColorModeValue('white', 'gray.700')}>
        <Stack>
          <Heading fontSize={'xl'}>
            Sign In
          </Heading>
          <Text fontSize={'md'} color={'gray.600'}>
            Welcome back!
          </Text>
        </Stack>
        <Box
          w='450px'
        >
          <Stack gap="4">
            <FormControl id="email" isRequired>
              <FormLabel fontSize={'md'} color="gray.600">Email address</FormLabel>
              <Input
                size="md"
                borderRadius="xl"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({...newUser, email: e.target.value})
                }
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel fontSize={'md'} color="gray.600">Password</FormLabel>
              <InputGroup>
                <Input
                  size="md"
                  borderRadius="xl"
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
            <Stack spacing="2">
              <Button
                loadingText="Submitting"
                size="lg"
                borderRadius="xl"
                bg={'primary.300'}
                color={'white'}
                _hover={{
                  bg: 'primary.500',
                }}
                onClick={submitHandler}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};


const mapStateToProps = (state) => {
  return {
    authenticated: state.authReducer.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    signIn: (user) => dispatch(signIn(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
