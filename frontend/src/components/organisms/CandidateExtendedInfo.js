import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Flex,
  Tag,
  Avatar,
  Heading,
} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {getJobsByEmail} from '../../state/actions/candidate';
import AvatarInfo from '../molecules/AvatarInfo';
import {getCV} from '../../state/actions/candidate';

const CandidateExtendedInfo = ({candidateToken, candidate, goBack, getCV, getJobsByEmail}) => {
  const {t} = useTranslation();
  useEffect(() => {
    if (candidate?.email) {
      getJobsByEmail(candidate.email);
      // getCV(candidateToken);
    }
  }, [candidate]);
  return (
    <Flex>
      <Flex direction="row" alignItems="center">
        <AvatarInfo candidate={candidate}/>
      </Flex>
      {/* <img src={candidate?.photo}/> */}
      <Button
        size="lg"
        borderRadius="xl"
        bg={'primary.300'}
        color={'white'}
        _hover={{
          bg: 'primary.500',
        }}
        onClick={goBack}
      >
        Go back
      </Button>
    </Flex>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.authReducer.currentUser,
    candidate: state.candidateReducer.candidates?.find((item) => item.candidateToken === ownProps.candidateToken),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getJobsByEmail: (email) => dispatch(getJobsByEmail(email)),
    getCV: (token) => dispatch(getCV(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateExtendedInfo);


