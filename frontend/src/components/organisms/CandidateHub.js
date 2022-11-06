import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AddInterviewForm from './AddInterviewForm';
import {BASE_URL} from '../../utils/constants';

const CandidateHub = () => {
  const recruiterState = useSelector((state) => state.auth);
  const candidateState = useSelector((state) => state.candidate);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    if (recruiterState) {
      debugger;
      setIsRecruiter(true);
      const sendReq = async () =>{
        const res = await fetch(`${BASE_URL}/Interview/getRecruiterInterview`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recruiterState.token),
        });
        const data = await res.json();
        console.log(data);
        setInterviews(data);
      }
      sendReq();
    }
    else{
      debugger;
      const sendReq = async () =>{
        const res = await fetch(`${BASE_URL}/Interview/getCandidateInterview`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(candidateState.token),
        });
        const data = await res.json();
        console.log(data);
        setInterviews(data);
      }
      sendReq();
    }
  },[]);
  return (
    <div>
      {/* {isRecruiter && <p>sunt recruiter</p>} */}
      {/* <AddInterviewForm /> */}
    </div>
  );
};

export default CandidateHub;
