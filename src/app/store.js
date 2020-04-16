import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import equalizerReducer from '../features/equalizer/equalizerSlice';

export function createStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      equalizer: equalizerReducer
    },
  });
}

export default createStore();
