import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formValidAction } from '../../../store/formValid-action';
import { authAction } from '../../../store/authAction';
import FormItem from './FormItem';
import './FormItem.scss';
import { auth } from '../../../firebase/firebase';
import { useParams, useHistory } from 'react-router-dom';

const errorCase = (error) => {
  console.log(error);
  switch (error) {
    case 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).':
      return 'Wrong Password!';
    case 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).':
      return 'User Not Found';
    case 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).':
      return 'Email already be in used!';
    default:
      return error;
  }
};

const keyListener = (e, inputUp, inputDown, first, end, middle) => {
  if (first || end) {
    if (first) {
      if (e.key === 'ArrowDown') inputDown.current.focus();
    }
    if (end) {
      if (e.key === 'ArrowUp') inputUp.current.focus();
    }
  } else {
    if (middle) {
      if (inputDown.current) {
        if (e.key === 'ArrowDown') inputDown.current.focus();
      }
      if (e.key === 'ArrowUp') inputUp.current.focus();
    } else {
      if (e.key === 'ArrowUp') inputUp.current.focus();
      if (e.key === 'ArrowDown') inputDown.current.focus();
    }
  }
};

const Form = (props) => {
  const loading = useSelector((state) => state.auth.isLoading);
  /**
   * Rendering different type of custom FormItem
   */
  const inputField = (item, index, info) => {
    if (info.type !== 'button') {
      return (
        <FormItem
          className={info.validation ? '' : 'invalid'}
          key={index}
          type={info.type}
          ref={info.ref}
          onKeyDown={info.onKeyDown}
          onChange={info.onChange}
          onClick={info.onClick}
          onBlur={info.onBlur}
        >
          {item.name}
        </FormItem>
      );
    } else {
      return (
        <button
          key={index}
          className={`submit-btn${loading ? '-disabled' : ''}`}
          disabled={loading}
        >
          {item.name}
        </button>
      );
    }
  };
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();

  // Toggle password visibility button
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const passwordVisibleHandler = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  useEffect(() => {
    if (passwordVisibility) {
      passwordRef.current.type = 'text';
      if (confirmRef.current) {
        confirmRef.current.type = 'text';
      }
    } else {
      passwordRef.current.type = 'password';
      if (confirmRef.current) {
        confirmRef.current.type = 'password';
      }
    }
  }, [passwordVisibility, passwordRef]);

  // Handling each input field focus by useing helper function: keyListener.
  const emailKeyPress = (e) => {
    keyListener(e, null, passwordRef, true, false, false);
  };
  const passwordKeyPress = (e) => {
    keyListener(e, emailRef, confirmRef, false, false, true);
  };
  const confirmKeyPress = (e) => {
    keyListener(e, passwordRef, firstnameRef, false, false, false);
  };
  const firstnameKeyPress = (e) => {
    keyListener(e, confirmRef, lastnameRef, false, false, false);
  };
  const lastnameKeyPress = (e) => {
    keyListener(e, firstnameRef, null, false, true, false);
  };

  // Foucs email input at the start
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  /**
   * The code below is for validation, it might be better to move these logic to backend.
   */
  const dispatch = useDispatch();
  // email validation
  const emailValid = useSelector((state) => state.formValid.email.isValid);
  const emailIsTouch = useSelector((state) => state.formValid.email.touched);
  const emailValidate = (e) => {
    dispatch(formValidAction.emailValidate({ value: e.target.value }));
  };
  const emailTouchHandler = () => {
    dispatch(formValidAction.isEmailTouch());
  };
  // password validation
  const passwordValid = useSelector(
    (state) => state.formValid.password.isValid,
  );
  const passwordIsTouch = useSelector(
    (state) => state.formValid.password.touched,
  );
  const passwordValidate = (e) => {
    dispatch(formValidAction.passwordValidate({ value: e.target.value }));
  };
  const passwordTouchHandler = () => {
    dispatch(formValidAction.isPasswordTouch());
  };
  // confirm validation
  const confirmValid = useSelector((state) => state.formValid.confirm.isValid);
  const confirmIsTouch = useSelector(
    (state) => state.formValid.confirm.touched,
  );
  const confirmValidate = (e) => {
    dispatch(formValidAction.confirmValidate({ value: e.target.value }));
  };
  const confirmTouchHandler = () => {
    dispatch(formValidAction.isConfirmTouch());
  };
  // lastname validation
  const lastnameValid = useSelector(
    (state) => state.formValid.lastname.isValid,
  );
  const lastnameIsTouch = useSelector(
    (state) => state.formValid.lastname.touched,
  );
  const lastnameValidate = (e) => {
    dispatch(formValidAction.lastnameValidate({ value: e.target.value }));
  };
  const lastNameTouchHandler = () => {
    dispatch(formValidAction.isLastnameTouch());
  };
  // firstnamevalidation
  const firstnameValid = useSelector(
    (state) => state.formValid.firstname.isValid,
  );
  const firstnameIsTouch = useSelector(
    (state) => state.formValid.firstname.touched,
  );
  const firstnameValidate = (e) => {
    dispatch(formValidAction.firstnameValidate({ value: e.target.value }));
  };
  const firstNameTouchHandler = () => {
    dispatch(formValidAction.isFirstnameTouch());
  };
  //Check input validation and send data to firebase.
  let { id } = useParams();
  const history = useHistory();
  const submitHandler = async (e) => {
    e.preventDefault();
    // SignUp
    if (confirmRef.current) {
      const userInput = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        confirm: confirmRef.current.value,
        firstName: firstnameRef.current.value,
        lastName: lastnameRef.current.value,
      };
      if (
        firstnameValid &&
        lastnameValid &&
        confirmValid &&
        emailValid &&
        passwordValid
      ) {
        try {
          dispatch(authAction.setLoading());
          const userCredentials = await auth.createUserWithEmailAndPassword(
            userInput.email,
            userInput.password,
          );
          await userCredentials.user.updateProfile({
            displayName: `${userInput.firstName} ${userInput.lastName}`,
          });
          dispatch(authAction.signup(userCredentials.user));
          dispatch(authAction.setError({ message: '' }));
          dispatch(authAction.setLoading());
          history.push('/home');
        } catch (e) {
          const error = errorCase(e.message);
          dispatch(authAction.setError({ message: error }));
          dispatch(authAction.setLoading());
        }
      }
    }
    // Login
    else {
      if (emailValid && passwordValid) {
        try {
          dispatch(authAction.setLoading());
          const userInput = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          };
          const userCredentials = await auth.signInWithEmailAndPassword(
            userInput.email,
            userInput.password,
          );
          dispatch(authAction.signup(userCredentials.user));
          dispatch(authAction.setError({ message: '' }));
          dispatch(authAction.setLoading());
          if (!id) {
            history.push('/home');
          }
        } catch (e) {
          const error = errorCase(e.message);
          dispatch(authAction.setError({ message: error }));
          dispatch(authAction.setLoading());
        }
      }
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        {props.items.map((item, index) => {
          if (item.type === 'input') {
            switch (item.name) {
              case 'email':
                return inputField(item, index, {
                  validation: emailValid || !emailIsTouch,
                  type: 'email',
                  ref: emailRef,
                  onKeyDown: emailKeyPress,
                  onChange: emailValidate,
                  onBlur: emailTouchHandler,
                });
              case 'password':
                return inputField(item, index, {
                  validation: passwordValid || !passwordIsTouch,
                  type: 'password',
                  ref: passwordRef,
                  onKeyDown: passwordKeyPress,
                  onChange: passwordValidate,
                  onClick: passwordVisibleHandler,
                  onBlur: passwordTouchHandler,
                });
              case 'confirm':
                return inputField(item, index, {
                  validation: confirmValid || !confirmIsTouch,
                  type: 'confirm',
                  ref: confirmRef,
                  onKeyDown: confirmKeyPress,
                  onChange: confirmValidate,
                  onClick: passwordVisibleHandler,
                  onBlur: confirmTouchHandler,
                });
              case 'firstname':
                return inputField(item, index, {
                  validation: firstnameValid || !firstnameIsTouch,
                  type: 'firstname',
                  ref: firstnameRef,
                  onKeyDown: firstnameKeyPress,
                  onChange: firstnameValidate,
                  onBlur: firstNameTouchHandler,
                });
              case 'lastname':
                return inputField(item, index, {
                  validation: lastnameValid || !lastnameIsTouch,
                  type: 'lastname',
                  ref: lastnameRef,
                  onKeyDown: lastnameKeyPress,
                  onChange: lastnameValidate,
                  onBlur: lastNameTouchHandler,
                });
              default:
                throw new Error('Invalid');
            }
          }
          if (item.type === 'button') {
            return inputField(item, index, {
              type: 'button',
            });
          }
          return <div />;
        })}
      </form>
    </React.Fragment>
  );
};

export default Form;
