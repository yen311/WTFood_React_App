import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../UI/Card';
import BackBtn from '../UI/BackBtn';
import Welcome from './Welcome';
import FromHeader from './FormHeader';
import Form from './Form/Form';
import { useSelector, useDispatch } from 'react-redux';
import { formValidAction } from '../../store/formValid-action';
import { authAction } from '../../store/authAction';

import './Form.scss';
import '../Nav/NavBar.scss';

const formItem = [
  { type: 'input', name: 'email' },
  { type: 'input', name: 'password' },
  { type: 'button', name: 'Sign in' },
];

function LoginForm() {
  const dispatch = useDispatch();
  const resetHandler = () => {
    dispatch(formValidAction.reset());
    dispatch(authAction.setError({ message: '' }));
  };
  const emailValid = useSelector((state) => state.formValid.email.isValid);
  const emailIsTouch = useSelector((state) => state.formValid.email.touched);
  const passwordValid = useSelector(
    (state) => state.formValid.password.isValid,
  );
  const passwordIsTouch = useSelector(
    (state) => state.formValid.password.touched,
  );

  const error = useSelector((state) => state.auth.error);

  return (
    <React.Fragment>
      <div className='container'>
        <BackBtn to={'/home'} onClick={resetHandler}>
          Back to Home
        </BackBtn>
        <Card className='login-container'>
          <div className='login'>
            <Welcome />
          </div>
          <div className='login'>
            <div className='login-content'>
              <div className='sign-in-form'>
                <FromHeader>Already Have Account?</FromHeader>
                <Form items={formItem} />
                <p className='submit-error'>{error}</p>
                <Link className='form-link' to='forget'>
                  Forget password?
                </Link>
                <FromHeader>New User</FromHeader>
                <Link
                  to='/sign-up'
                  className='form-link'
                  onClick={resetHandler}
                >
                  Create an account
                </Link>
                <ul>
                  {!emailValid && emailIsTouch && (
                    <li className='error-message'>
                      Email empty or invalid format!
                    </li>
                  )}
                  {!passwordValid && passwordIsTouch && (
                    <li className='error-message'>
                      Password will be longer than 6 characters.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default LoginForm;
