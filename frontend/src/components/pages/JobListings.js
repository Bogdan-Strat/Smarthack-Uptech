import React, {useEffect, useState} from 'react';
import {Box, Button, Collapse, Flex, Tag, Text} from '@chakra-ui/react';
import {MdLocationPin} from 'react-icons/md';
import {RiSuitcaseLine} from 'react-icons/ri';
import {connect} from 'react-redux';
import {getAllJobs as getAllJobsAction} from '../../state/actions/job';
import Card from '../atoms/Card';
import SidebarWithHeader from '../organisms/SidebarWithHeader';

const JobListings = ({jobs, getAllJobs}) => {
  const [showMore, setShowMore] = useState(true);
  const [isOpen, setIsOpen] = useState(Array(jobs.length).fill(false));

  useEffect(() => {
    getAllJobs();
  }, []);

  const updateOpened = (newIdx) => {
    const newArr = Array(jobs.length).fill(false);
    newArr[newIdx] = !isOpen[newIdx];
    setIsOpen(newArr);
  };

  return <SidebarWithHeader>
    <Text fontSize="4xl">All Jobs</Text>
    {jobs.map((job, index) => (
      <>
        <Card w="100%" mr="5" mt="4" p="6" key={index}>
          <Flex justifyContent="space-between">
            <Box>
              <Text fontSize="2xl" as="b" color="primary.500">{job.title}</Text>
              <Text color="black.300">{job.type}</Text>
              <Tag>{job.jobLevel}</Tag>
              <Flex justifyContent="space-between" flexDirection="row">
                <Text>Number of positions:</Text>
                <Tag bg="secondary.300" ml="3">{job.nrOfPositions}</Tag>
              </Flex>
            </Box>
            <Box alignSelf="flex-end" >
              <Button size="xs" bg="primary.300" _hover={{bg: 'primary.500'}} color="white.300" onClick={() => updateOpened(index)}>{isOpen[index] ? 'Show Less' : 'Show More'}</Button>
            </Box>
          </Flex>
        </Card>
        <Collapse w="100%" in={isOpen[index]} animateOpacity>
          <Box
            p='40px'
            bg='white.300'
            rounded='md'
            shadow='md'>
            <Button size="md" mb="2" bg="primary.300" _hover={{bg: 'primary.500'}} color="white.300">Apply</Button>
            <Flex flexDirection="row" w="40%" justifyContent="space-between">
              <Flex flexDirection="row">
                <MdLocationPin size="20"/>
                <Text fontWeight="900" size="28" ml="2">{job.location}</Text>
              </Flex>
              <Flex flexDirection="row">
                <RiSuitcaseLine size="20"/>
                <Text fontWeight="900" size="28" ml="2">{job.jobType}</Text>
              </Flex>
            </Flex>
            <Text>{job.description}</Text>
          </Box>
        </Collapse>
      </>
    ))}
  </SidebarWithHeader>;
};

const mapStateToProps = (state) => {
  return {
    jobs: state.jobReducer.jobs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getAllJobs: () => dispatch(getAllJobsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobListings);

