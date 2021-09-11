import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/index';
import DetailPages from './pages/DetailPage/index';
import LoginPage from './pages/Login_SignUp/Login';
import SignUpPage from './pages/Login_SignUp/SignUp';
import NotFound from './pages/NotFound';
import { useSelector } from 'react-redux';

function App() {
  const isLogin = useSelector((state) => state.auth.login);

  return (
    <React.Fragment>
      <div className='page-container'>
        <main>
          <Switch>
            <Route path='/' exact>
              <Redirect to='/home' />
            </Route>
            <Route path='/home' component={HomePage} exact />

            <Route
              path='/home/:id'
              component={isLogin ? DetailPages : LoginPage}
            ></Route>
            <Route path='/login' component={LoginPage} exact />
            <Route path='/sign-up' component={SignUpPage} exact />
            <Route path='*' component={NotFound} />
          </Switch>
        </main>
      </div>
    </React.Fragment>
  );
}

export default App;
