import React from 'react';
import ROUTES from '../utils/Routes.js';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({children, authenticated}) => {
  return authenticated ? children : <Navigate to={ROUTES.SIGN_IN}/>;
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authReducer.authenticated,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
