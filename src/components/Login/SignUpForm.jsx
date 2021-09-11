import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../UI/Card';
import BackBtn from '../UI/BackBtn';
import Welcome from './Welcome';
import FromHeader from './FormHeader';
import Form from './Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { formValidAction } from '../../store/formValid-action';
import { authAction } from '../../store/authAction';
import './Form.scss';

const formItem = [
  { type: 'input', name: 'email' },
  { type: 'input', name: 'password' },
  { type: 'input', name: 'confirm' },
  { type: 'input', name: 'firstname' },
  { type: 'input', name: 'lastname' },
  { type: 'button', name: 'Sign Up' },
];

function SignUpForm() {
  const dispatch = useDispatch(true);
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
  const confirmValid = useSelector((state) => state.formValid.confirm.isValid);
  const confirmIsTouch = useSelector(
    (state) => state.formValid.confirm.touched,
  );
  const firstnameValid = useSelector(
    (state) => state.formValid.firstname.isValid,
  );
  const firstnameIsTouch = useSelector(
    (state) => state.formValid.firstname.touched,
  );
  const lastnameValid = useSelector(
    (state) => state.formValid.lastname.isValid,
  );
  const lastnameIsTouch = useSelector(
    (state) => state.formValid.lastname.touched,
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
                <FromHeader>Create account</FromHeader>
                <Form items={formItem} />
                <p className='submit-error'>{error}</p>
                <Link to='/login' className='form-link' onClick={resetHandler}>
                  Already have account?
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
                  {!confirmValid && confirmIsTouch && (
                    <li className='error-message'>
                      Confirm password doesn't match
                    </li>
                  )}
                  {!firstnameValid && firstnameIsTouch && (
                    <li className='error-message'>firstname cannot be empty</li>
                  )}
                  {!lastnameValid && lastnameIsTouch && (
                    <li className='error-message'>lastname cannot be empty</li>
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

export default SignUpForm;
