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

const CandidateExtendedInfo = ({candidateToken, candidate, goBack, getJobsByEmail}) => {
  const {t} = useTranslation();
  const [photo, setPhoto] = useState(undefined);
  useEffect(() => {
    if (candidate?.email) {
      getJobsByEmail(candidate.email);
    }
  }, [candidate]);
  return (
    <Flex>
      <Flex direction="row" alignItems="center">
        <AvatarInfo candidate={candidate}/>
      </Flex>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateExtendedInfo);


