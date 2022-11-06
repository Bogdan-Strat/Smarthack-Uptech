import React from 'react';
import {
  Box,
  Button,
  Flex,
  Tag,
  Text,
  Heading,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const STATUS = {
  IN_PROGRESS: 'null',
  REJECTED: 'false',
  HIRED: 'true',
};


const STATUS_COLOR = {
  [STATUS.IN_PROGRESS]: 'yellow',
  [STATUS.REJECTED]: 'red',
  [STATUS.HIRED]: 'green',
};

const CandidateExtendedInfo = ({candidate, goBack}) => {
  const { t} = useTranslation();
  const status = String(candidate.isPassed);
  return (
    <Flex>
      <Box>
        <Heading>
          {`${candidate.firstName} ${candidate.lastName}`}
        </Heading>
      </Box>
      <Tag
        size="sm"
        borderRadius='full'
        variant='solid'
        colorScheme={STATUS_COLOR[status]}
      >{t(`${status}-status`).toUpperCase()}</Tag>
      <Button
        size="lg"
        borderRadius="xl"
        bg={'primary.300'}
        color={'white'}
        _hover={{
          bg: 'primary.500',
        }}
        onClick={goBack}
      >
        Go back
      </Button>
    </Flex>
  );
};

export default CandidateExtendedInfo;
