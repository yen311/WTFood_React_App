import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restaurants: [],
};

const restaurantSlice = createSlice({
  name: 'item',
  initialState: initialState,
  reducers: {
    add(state, action) {
      state.restaurants = action.payload;
    },
    reset(state) {
      state.restaurants = [];
    },
  },
});

export const restaurantAction = restaurantSlice.actions;
export default restaurantSlice;
