import React from 'react';
import {
  Route,
  Routes} from 'react-router-dom';
import './i18n/config.js';
import ROUTES from './utils/Routes.js';
import LandingPage from './components/pages/Landing.js';
import SignUpPage from './components/pages/SignUp.js';
import SignInPage from './components/pages/SignIn.js';
import HomePage from './components/pages/Home.js';
import {connect} from 'react-redux';
import PrivateRoute from './components/PrivateRoute.js';
import CompanyDetailSetup from './components/pages/CompanyDetailSetup.js';
import JobListings from './components/pages/JobListings.js';
import CandidateListings from './components/pages/CandidateListings.js';
import RecruiterListings from './components/pages/RecruiterListings.js';
import InterviewsPage from './components/pages/InterviewsPage.js';

function App() {
  return (
    <>
      {/* to do: show navbar only when authenticated: {authenticated && <Navbar/>} */}
      <div>
        <Routes>
          <Route path={ROUTES.LANDING} element={<LandingPage/>}/>
          <Route path={ROUTES.HOME} element={<PrivateRoute><HomePage/></PrivateRoute>}/>
          <Route path={ROUTES.SIGN_IN} element={<SignInPage/>}/>
          <Route path={ROUTES.SIGN_UP} element={<SignUpPage/>}/>
          <Route path={ROUTES.JOBS} element={<JobListings/>}/>
          <Route path={ROUTES.CANDIDATES} element={<CandidateListings />}/>
          {/* TODO: restrict this path to admins only */}
          <Route path={ROUTES.RECRUITERS} element={<RecruiterListings />}/>
          <Route path={ROUTES.HOME} element={<PrivateRoute><HomePage/></PrivateRoute>}/>
          <Route path={ROUTES.SETUP} element={<PrivateRoute><CompanyDetailSetup/></PrivateRoute>}/>
          <Route path={ROUTES.INTERVIEWS} element={<InterviewsPage/>}/>
          {/*  <Route path={`${ROUTES.PROFILE}/:uid`} element={<PrivateRoute><Profile/></PrivateRoute>} />  */}
        </Routes>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    // authenticated: state.authReducer.authenticated,
    // userId: state.authReducer.userId,
  };
}

export default connect(mapStateToProps)(App);
