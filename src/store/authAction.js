import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: false,
  user: null,
  error: '',
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    signup(state, action) {
      state.user = action.payload;
      state.login = true;
    },
    logout(state) {
      state.login = false;
      state.user = null;
    },
    setError(state, action) {
      state.error = action.payload.message;
    },
    setLoading(state) {
      state.isLoading = !state.isLoading;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice;
