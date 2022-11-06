import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddInterviewForm from "./AddInterviewForm";
import { BASE_URL } from "../../utils/constants";
import SidebarWithHeader from "./SidebarWithHeader";
import Card from "../atoms/Card";
import { Heading } from "@chakra-ui/react";

const CandidateHub = () => {
  const recruiterState = useSelector((state) => state.auth);
  const candidateState = useSelector((state) => state.candidate);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (recruiterState) {
      debugger;
      setIsRecruiter(true);
      const sendReq = async () => {
        const res = await fetch(`${BASE_URL}/Interview/getRecruiterInterview`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recruiterState.token),
        });
        const data = await res.json();
        console.log(data);
        setInterviews(data);
      };
      sendReq();
    } else {
      debugger;
      const sendReq = async () => {
        const res = await fetch(`${BASE_URL}/Interview/getCandidateInterview`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(candidateState.token),
        });
        const data = await res.json();
        console.log(data);
        setInterviews(data);
      };
      sendReq();
    }
  }, []);
  return (
    <>
    <Heading alignSelf='center'>Your interviews</Heading>
      {isRecruiter && (
        <div>
          <button onClick={(e) => setShowForm(!showForm)}>
            Add new interview
          </button>
          {showForm && <AddInterviewForm />}
        </div>
      )}
      {interviews.map((i, index) => {
        return (
          <Card p="5" mb="10">
            <h4>Interview {index + 1}</h4>
            <h5>
              Interview period: {i.startDate} - {i.endDate}
            </h5>
            <h6>Interview link: {i.interviewLink}</h6>
          </Card>
        );
      })}
    </>
  );
};

export default CandidateHub;
