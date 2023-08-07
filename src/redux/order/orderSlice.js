import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

// carts lưu là arr để có thể đếm được bao nhiêu sản phẩm trong giỏ hàng là được
const initialState = {
  carts: [], // thông tin cart
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    doAddBookAction: (state, action) => {
      let carts = state.carts;
      const item = action.payload;

      const isExistIndex = carts.findIndex((c) => c._id === item._id);

      if (isExistIndex !== -1) {
        carts[isExistIndex].quantity = carts[isExistIndex].quantity + item.quantity;
        const productInStorage =
          carts[isExistIndex].detail.quantity - carts[isExistIndex].detail.sold;

        if (carts[isExistIndex].quantity > productInStorage) {
          carts[isExistIndex].quantity = Number(productInStorage);
        }
      } else {
        carts.push({ quantity: item.quantity, _id: item._id, detail: item.detail });
      }

      // update carts
      state.carts = carts;
      message.success('Sản phẩm đã được thêm vào Giỏ hàng');
    },
    doUpdateCartAction: (state, action) => {},
  },
  extraReducers: {},
});

export const { doAddBookAction, doUpdateCartAction } = orderSlice.actions;

export default orderSlice.reducer;
