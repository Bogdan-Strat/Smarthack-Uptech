import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import CandidateHub from '../organisms/CandidateHub.js';
import SidebarWithHeader from '../organisms/SidebarWithHeader.js';
import TokenValidationPage from '../organisms/TokenValidationPage.js';

const CandidatePage = () => {
  const [isValidated, setIsValidated] = useState(false);
  const token = useSelector((state) => state.candidate);
  return (
    <>
      <SidebarWithHeader>
        {isValidated ? (
          <CandidateHub />
        ) : (
          <TokenValidationPage validationSetter={setIsValidated} />
        )}
      </SidebarWithHeader>
    </>
  );
};

export default CandidatePage;
