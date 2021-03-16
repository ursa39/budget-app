import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('currentList')) || [];

const currentSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    currentAdded(state, action) {
      const currentRecord = action.payload;
      state.unshift(currentRecord);
      state.sort((a, b) => {
        return a.date > b.date ? -1 : 1;
      });
    },
    currentSaved(state, action) {
      localStorage.setItem('currentList', JSON.stringify(state));
    }
  },
})

export const { currentAdded, currentSaved } = currentSlice.actions;
export default currentSlice.reducer;
