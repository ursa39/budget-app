import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('currentList')) || [];

const currentSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    currentAdded(state, action) {
      const currentRecord = action.payload;
      state.push(currentRecord);
      state.sort((a, b) => {
        return a.date > b.date ? -1 : 1;
      });
    },
    currentSaved(state, action) {
      localStorage.setItem('currentList', JSON.stringify(state));
    },
    currentDeleted(state, action) {
      const deleteTargetIndex = state.findIndex(item => item.id === action.payload);
      state.splice(deleteTargetIndex, 1);
    }
  },
})

export const { currentAdded, currentSaved, currentDeleted } = currentSlice.actions;
export default currentSlice.reducer;
