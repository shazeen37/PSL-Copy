import React, { Fragment, useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import cards from './components/layout/cards/cards';
import Aboutus from './components/layout/Aboutus';
import Register from './components/auths/Register';
import Login from './components/auths/Login';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Createprofile from './components/profile-form/Createprofile';
import Editprofile from './components/profile-form/Editprofile';
import Profiles from './components/profiles/Profiles';
import Post from './components/Posts/Post-form';
import upload from './components/Posts/upload';

//Redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alerts />
            <switch>
              <Route exact path='/' component={cards} />

              <Route exact path='/register' component={Register} />
              <Route exact path='/Profiles' component={Profiles} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/Createprofile'
                component={Createprofile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={Editprofile}
              />
              <PrivateRoute exact path='/upload' component={upload} />
            </switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
