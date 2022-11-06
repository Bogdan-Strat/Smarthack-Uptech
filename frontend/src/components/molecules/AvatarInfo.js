import React from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  Avatar,
  Heading,
  TagLabel,
  Tag,
  Icon,
} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

const STATUS = {
  IN_PROGRESS: 'null',
  REJECTED: 'false',
  HIRED: 'true',
};


const STATUS_COLOR = {
  [STATUS.IN_PROGRESS]: 'orange.400',
  [STATUS.REJECTED]: 'red.500',
  [STATUS.HIRED]: 'green.500',
};

const AvatarInfo = ({candidate}) => {
  const {t} = useTranslation();
  const status = String(candidate.isPassed);
  const candidateName = `${candidate.firstName} ${candidate.lastName}`;
  return (
    <Box w="400px" bgColor="white" shadow="md" borderRadius="xl" px="4" py="2">
      <Flex py="2">
        <Avatar size="md" name={candidateName} />
        <Flex
          ml="3"
          py="1"
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Text m="0" fontSize="15" fontWeight="medium">
            {candidateName}
          </Text>
        </Flex>
        <Tag
          ml="auto"
          h="6"
          my="auto"
          borderRadius="full"
          variant="outlined"
          color="white"
          bgColor={STATUS_COLOR[status]}
        >
          <TagLabel fontSize="11" m="auto">
            {t(`${status}-status`).toUpperCase()}
          </TagLabel>
        </Tag>
      </Flex>
    </Box>
  );
};


export default AvatarInfo;