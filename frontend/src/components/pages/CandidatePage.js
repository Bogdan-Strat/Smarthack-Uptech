import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import CandidateHub from '../organisms/CandidateHub.js';
import TokenValidationPage from '../organisms/TokenValidationPage.js';

const CandidatePage = () => {
  const [isValidated, setIsValidated] = useState(false);
  const token = useSelector((state) => state.candidate);
  return (
    <>
        {isValidated ? (
          <CandidateHub />
        ) : (
          <TokenValidationPage validationSetter={setIsValidated} />
        )}
    </>
  );
};

export default CandidatePage;
