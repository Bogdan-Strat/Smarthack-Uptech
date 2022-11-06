import React from 'react';
import {connect} from 'react-redux';
import {
  Button,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {signOut} from '../../state/actions/auth';
import ROUTES from '../../utils/Routes';

const SignOut = ({signOut}) => {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    signOut();
    setTimeout(navigate(ROUTES.LANDING), 100);
  };
  return (
    <Button
      size="lg"
      borderRadius="xl"
      bg={'primary.300'}
      color={'white'}
      _hover={{
        bg: 'primary.500',
      }}
      onClick={submitHandler}
    >
    Sign out
    </Button>
  );
};


const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
