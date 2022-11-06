import React, {useEffect} from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Image,
  HStack,
  InputRightElement,
  InputLeftElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import ROUTES from '../../utils/Routes.js';
import {connect} from 'react-redux';
import {useState} from 'react';
import {getFeatures} from '../../service.js';
import {useNavigate} from 'react-router-dom';
import {updateCompany} from '../../state/actions/company.js';

const CompanyDetailSetup = ({currentUser, updateCompany}) => {
  const [step, setStep] = useState(1);
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [company, setCompany] = useState({
    Name: '',
    Description: '',
    Logo: 'dsfdsfsdf',
  });
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchFeatures() {
      const res = await getFeatures();
      setFeatures(res);
    }
    fetchFeatures();
  }, []);
  const toggleItem = (id) => {
    const index = selectedFeatures.findIndex((item) => item === id);
    if (index >= 0) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };
  const isItemSelected = (id) => selectedFeatures.findIndex((item) => item === id) > -1;
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateCompany({...company, BuilderOptionIds: JSON.stringify(selectedFeatures), CurrentUserId: currentUser.id}).then(() => {
      navigate(ROUTES.HOME);
    });
  };
  return (
    <Flex
      minH={'100vh'}
      w='100%'
      direction="row"
      justifyContent="center"
      alignItems='center'
      bgColor='white.300'
    >
      <Flex
        direction='column'
        height='400px'>
        <Heading fontSize={'3xl'}>
         It's great to have you on board, { currentUser.name}
        </Heading>
        <Text mb="12" fontSize={'md'} color={'gray.600'}>
          Now let's setup your company
        </Text>
        { step === 1 ? <>
          <Flex direction="column" gap="8">
            <FormControl id="name" isRequired>
              <FormLabel fontSize={'md'} color="gray.600">Company Name</FormLabel>
              <Input
                size="md"
                borderRadius="xl"
                type="text"
                value={company.name}
                onChange={(e) =>
                  setCompany({...company, Name: e.target.value})
                }
              />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel fontSize={'md'} color="gray.600">Description</FormLabel>
              <Input
                size="md"
                borderRadius="xl"
                type="text"
                value={company.description}
                onChange={(e) =>
                  setCompany({...company, Description: e.target.value})
                }
              />
            </FormControl>
            <Button
              loadingText="Submitting"
              size="lg"
              borderRadius="xl"
              bg={'primary.300'}
              color={'white'}
              _hover={{
                bg: 'primary.500',
              }}
              onClick={() => setStep(step + 1)}
            >
                Next
            </Button>
          </Flex>
        </> :
        <>
          <Flex direction="column">
            <Flex gap="8" direction="row" justifyContent="center">
              {
                features?.map((feature, index) => (
                  <Flex
                    key={`feature-${index}`}
                    h="28"
                    w="28"
                    borderRadius="xl"
                    shadow={isItemSelected(feature.builderOptionId) ? 'outline' : 'lg'}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => toggleItem(feature.builderOptionId)}
                  >
                    { feature.builderOptionMessage}
                  </Flex>
                ))
              }
            </Flex>
            <Button
              mx="auto"
              mt="12"
              w="80%"
              loadingText="Submitting"
              size="lg"
              borderRadius="xl"
              bg={'primary.300'}
              color={'white'}
              _hover={{
                bg: 'primary.500',
              }}
              onClick={handleSubmit}
            >
                Complete
            </Button>
          </Flex>

        </>}
      </Flex>
    </Flex>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.authReducer.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    updateCompany: (company) => dispatch(updateCompany(company)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetailSetup);

