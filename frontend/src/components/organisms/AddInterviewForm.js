import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

import {
  FormControl,
  Heading,
  FormLabel,
  Select,
  Input,
  GridItem,
} from "@chakra-ui/react";

const AddInterviewForm = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [chosenRecruiters, setChosenRecruiters] = useState([]);

  useEffect(() => {
    const fetchRecruiters = async () => {
      const res = await fetch(`${BASE_URL}/Recruiter/fetchRecruiters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify("52556B27-BF51-4294-8848-259A54B26D63"),
      });
      const data = await res.json();
      setRecruiters(data);
    };
    fetchRecruiters();
  }, []);

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        New interview form
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="recruiters"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          Recruiters
        </FormLabel>
        <Select
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
            color: "gray.50",
          }}
          mt="2%"
        >
          Start date
        </FormLabel>
        <Input
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
            color: "gray.50",
          }}
          mt="2%"
        >
          End date
        </FormLabel>
        <Input
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
            color: "gray.50",
          }}
          mt="2%"
        >
          Candidate email
        </FormLabel>
        <Input
          type="email"
          id="candidate"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
    </>
  );
};

export default AddInterviewForm;
