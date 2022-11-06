import React, {useEffect, useState} from 'react';
import CandidateInfo from '../molecules/CandidateInfo';
import SidebarWithHeader from '../organisms/SidebarWithHeader';
import {
  Flex,
} from '@chakra-ui/react';
import {connect} from 'react-redux';
import {getCandidates} from '../../state/actions/candidate';
import CandidateExtendedInfo from '../organisms/CandidateExtendedInfo';

const CandidateListings = ({candidates, getCandidates}) => {
  useEffect(() => {
    getCandidates();
  }, []);
  const [candidateId, setCandidateId] = useState(undefined);
  const goBack = () => setCandidateId(undefined);
  const getCandidate = (id) => candidates.find((item) => item.candidateToken === id);
  const viewCandidate = (id) => setCandidateId(id);
  return <SidebarWithHeader>
    { !candidateId ? <Flex direction="row">
      { candidates?.map((candidate, index) => (
        <CandidateInfo candidate={candidate} key={`candidate-list-${index}`} viewCandidate={viewCandidate}/>
      ))}
    </Flex> :
    <CandidateExtendedInfo candidate={getCandidate(candidateId)} goBack={goBack}/>
    }
  </SidebarWithHeader>;
};

const mapStateToProps = (state) => {
  return {
    candidates: state.candidateReducer.candidates,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getCandidates: () => dispatch(getCandidates()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateListings);
