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
      setIsRecruiter(true);
      const sendReq = async () =>{
        const res = await fetch(`${BASE_URL}/Interview/getRecruiterInterview`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...newInterview, hRIntiator: '52556B27-BF51-4294-8848-259A54B26D63'}),
        });
        const data = await res.json();
        setRecruiters(data);
      };
    } else {

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
