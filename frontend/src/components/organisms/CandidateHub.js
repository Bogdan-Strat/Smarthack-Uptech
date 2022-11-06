import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AddInterviewForm from './AddInterviewForm';

const CandidateHub = () => {
  const recruiterState = useSelector((state) => state.auth);
  const candidateState = useSelector((state) => state.candidate);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    if (recruiterState) {
      setIsRecruiter(true);
    }
  });
  return (
    <div>
      {/* {isRecruiter && <p>sunt recruiter</p>} */}
      <AddInterviewForm />
    </div>
  );
};

export default CandidateHub;
