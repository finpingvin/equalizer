import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'equalizer',
  initialState: {
    frequencyBins: []
  },
  reducers: {
    setFrequencyBins: (state, action) => {
      state.frequencyBins = action.payload;
    }
  }
});

export const { setFrequencyBins } = slice.actions;

export const selectFrequencyBins = (state) => state.equalizer.frequencyBins;

export default slice.reducer;