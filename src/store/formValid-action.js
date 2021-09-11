import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: { value: '', isValid: false, touched: false },
  password: { value: '', isValid: false, touched: false },
  confirm: { value: '', isValid: false, touched: false },
  lastname: { value: '', isValid: false, touched: false },
  firstname: { value: '', isValid: false, touched: false },
};

const formValidSlice = createSlice({
  name: 'formValidate',
  initialState: initialState,
  reducers: {
    emailValidate(state, action) {
      state.email.value = action.payload.value.trim();
      if (
        action.payload.value.trim().length > 0 &&
        action.payload.value.includes('@')
      ) {
        state.email.isValid = true;
      } else {
        state.email.isValid = false;
      }
    },
    isEmailTouch(state) {
      state.email.touched = true;
    },
    passwordValidate(state, action) {
      state.password.value = action.payload.value.trim();
      if (action.payload.value.trim().length >= 6) {
        state.password.isValid = true;
      } else {
        state.password.isValid = false;
      }
    },
    isPasswordTouch(state) {
      state.password.touched = true;
    },
    confirmValidate(state, action) {
      state.confirm.value = action.payload.value.trim();
      if (
        action.payload.value.trim().length >= 6 &&
        action.payload.value.trim() === state.password.value
      ) {
        state.confirm.isValid = true;
      } else {
        state.confirm.isValid = false;
      }
    },
    isConfirmTouch(state) {
      state.confirm.touched = true;
    },
    firstnameValidate(state, action) {
      state.firstname.value = action.payload.value.trim();
      if (action.payload.value.trim().length > 0) {
        state.firstname.isValid = true;
      } else {
        state.firstname.isValid = false;
      }
    },
    isFirstnameTouch(state) {
      state.firstname.touched = true;
    },
    lastnameValidate(state, action) {
      state.lastname.value = action.payload.value.trim();
      if (action.payload.value.trim().length > 0) {
        state.lastname.isValid = true;
      } else {
        state.lastname.isValid = false;
      }
    },
    isLastnameTouch(state) {
      state.lastname.touched = true;
    },
    reset(state) {
      state.email = { isValid: false, touched: false };
      state.password = { isValid: false, touched: false };
      state.confirm = { isValid: false, touched: false };
      state.lastname = { isValid: false, touched: false };
      state.firstname = { isValid: false, touched: false };
    },
  },
});

export const formValidAction = formValidSlice.actions;
export default formValidSlice;
