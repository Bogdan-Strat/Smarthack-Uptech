import React, {useEffect, useState} from 'react';
import {BASE_URL} from '../../utils/constants';

import {
  FormControl,
  Heading,
  FormLabel,
  Select,
  Input,
  GridItem,
  Button,
} from '@chakra-ui/react';

const AddInterviewForm = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [newInterview, setNewInterview] = useState({
    recruiter: '',
    startDate: '',
    endDate: '',
    candidateEmail: '',
    interviewLink: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/Interview/addInterview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...newInterview, hRIntiator: '52556B27-BF51-4294-8848-259A54B26D63'}),
    });
    const data = await res.json();
    setRecruiters(data);
  };

  useEffect(() => {
    const fetchRecruiters = async () => {
      const res = await fetch(`${BASE_URL}/Recruiter/fetchRecruiters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify('52556B27-BF51-4294-8848-259A54B26D63'),
      });
      const data = await res.json();
      setRecruiters(data);
    };
    fetchRecruiters();
  }, []);


  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        New interview form
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="recruiters"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
        >
          Recruiters
        </FormLabel>
        <Select
          value={newInterview.recruiter}
          onChange={(e) => setNewInterview({...newInterview, recruiter: e.target.value})}
          id="recruiters"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        >
          {recruiters.map((r) => {
            return (
              <option value={r.value} key={r.value}>
                {r.text}
              </option>
            );
          })}
        </Select>
      </FormControl>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="start_date"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%"
        >
          Start date
        </FormLabel>
        <Input
          value={newInterview.startDate}
          onChange={(e) => setNewInterview({...newInterview, startDate: e.target.value})}
          type="date"
          id="start_date"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="end_date"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%"
        >
          End date
        </FormLabel>
        <Input
          value={newInterview.endDate}
          onChange={(e) => setNewInterview({...newInterview, endDate: e.target.value})}
          type="date"
          id="end_date"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="candidate"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%"
        >
          Candidate email
        </FormLabel>
        <Input
          value={newInterview.candidateEmail}
          onChange={(e) => setNewInterview({...newInterview, candidateEmail: e.target.value})}
          type="email"
          id="candidate"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="link"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%"
        >
          Interview link
        </FormLabel>
        <Input
          value={newInterview.interviewLink}
          onChange={(e) => setNewInterview({...newInterview, interviewLink: e.target.value})}
          type="email"
          id="candidate"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
      <FormControl>
        <Button onClick={submitHandler}>
            Submit
        </Button>
      </FormControl>
    </>
  );
};

export default AddInterviewForm;
