import React from 'react';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Link,
  Icon,
} from '@chakra-ui/react';
import {ReactComponent as OutlinedRightArrow} from '../../assets/icons/outlined-right-arrow.svg';
import ROUTES from '../../utils/Routes.js';
import {useTranslation} from 'react-i18next';

const Landing = () => {
  const {t} = useTranslation();
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{base: 8, md: 14}}
          py={{base: 20, md: 36}}>
          <Heading
            fontWeight={600}
            color="primary"
            fontSize={{base: '2xl', sm: '4xl', md: '6xl'}}
            lineHeight={'110%'}>
            Interviewer
          </Heading>
          <Text color={'gray.500'}>
            { t('landing-description')}
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              size="lg"
              w="340px"
              borderRadius="xl"
              bg={'primary.300'}
              color={'white'}
              _hover={{
                bg: 'primary.500',
              }}>
              <Link href={ROUTES.SIGN_IN}>Sign In</Link>
              {/* <Icon ml="2" as={OutlinedRightArrow} size="sm"/> */}
            </Button>
            <Link href={ROUTES.SIGN_UP}>Sign Up</Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Landing;
