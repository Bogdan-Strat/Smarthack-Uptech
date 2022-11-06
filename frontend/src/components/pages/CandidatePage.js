import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import CandidateHub from '../organisms/CandidateHub.js';
import SidebarWithHeader from '../organisms/SidebarWithHeader.js';
import TokenValidationPage from '../organisms/TokenValidationPage.js';

const InterviewsPage = () => {
  const authStore = useSelector(state => state.authReducer);
  const [isValidated, setIsValidated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const token = useSelector((state) => state.candidate);
useEffect(() => {
    if(authStore != undefined){
        console.log(authStore.authenticated)
        setIsAuthenticated(authStore.authenticated)
    }
    
},[])
  return (
    <>
      <SidebarWithHeader>
        {isAuthenticated || isValidated ? (
          <CandidateHub />
        ) : (
          <TokenValidationPage validationSetter={setIsValidated} />
        )}
      </SidebarWithHeader>
    </>
  );
};

export default InterviewsPage;
