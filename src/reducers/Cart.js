import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    loadCart(state, action) {
      state = action.payload;
    }
  }
});

export const { loadCart } = CartSlice.actions;

export default CartSlice.reducer;
