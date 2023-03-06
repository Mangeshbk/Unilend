import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: '0.00',
  address: '',
  isConnected: 'disconnected',
};
const wallet = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setBalance(state, action) {
      state.balance = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
    setIsConnected(state, action) {
      state.isConnected = action.payload;
    },
  },
});

const walletReducer = wallet.reducer;
export const walletActions = wallet.actions;
export default walletReducer;
