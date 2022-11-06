import React from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
} from '@chakra-ui/react';
import AvatarInfo from './AvatarInfo';

const CandidateInfo = ({candidate, viewCandidate}) => {
  return (
    <Box style={{cursor: 'pointer'}} onClick={() => viewCandidate(candidate.candidateToken)}>
      <AvatarInfo candidate={candidate} >
      </AvatarInfo>
      {/* <Button
        size="lg"
        borderRadius="xl"
        bg={'primary.300'}
        color={'white'}
        _hover={{
          bg: 'primary.500',
        }}
      
      >
        View candidate
      </Button> */}
    </Box>
  );
};

export default CandidateInfo;
