import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import CandidateHub from '../organisms/CandidateHub.js';
import TokenValidationPage from '../organisms/TokenValidationPage.js';

const InterviewsPage = () => {
  const authStore = useSelector((state) => state.authReducer);
  const [isValidated, setIsValidated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const token = useSelector((state) => state.candidate);
useEffect(() => {
    if(authStore != undefined){
        setIsAuthenticated(authStore.authenticated)
    }
  }, []);
  return (
    <>
      {isAuthenticated || isValidated ? (
          <CandidateHub />
        ) : (
          <TokenValidationPage validationSetter={setIsValidated} />
        )}
    </>
  );
};

export default InterviewsPage;
