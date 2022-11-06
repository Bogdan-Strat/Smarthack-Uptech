import React from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
} from '@chakra-ui/react';

const CandidateInfo = ({candidate, viewCandidate}) => {
  return (
    <Flex w="18" h="18" boxShadow='xl'>
      <Box>
        <Heading>
          {`${candidate.firstName} ${candidate.lastName}`}
        </Heading>
        <Text>{candidate.isPassed}</Text>
      </Box>
      <Button
        size="lg"
        borderRadius="xl"
        bg={'primary.300'}
        color={'white'}
        _hover={{
          bg: 'primary.500',
        }}
        onClick={() => viewCandidate(candidate.candidateToken)}
      >
        View candidate
      </Button>
    </Flex>
  );
};

export default CandidateInfo;
