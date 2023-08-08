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

        if (carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity) {
          carts[isExistIndex].quantity = Number(carts[isExistIndex].detail.quantity);
        }
      } else {
        carts.push({ quantity: item.quantity, _id: item._id, detail: item.detail });
      }

      // update carts
      state.carts = carts;
      message.success('Sản phẩm đã được thêm vào Giỏ hàng');
    },
    doUpdateCartAction: (state, action) => {
      let carts = state.carts;
      const item = action.payload;

      const isExistIndex = carts.findIndex((c) => c._id === item._id);

      if (isExistIndex !== -1) {
        carts[isExistIndex].quantity = item.quantity;

        //  sản phẩm còn tồn trong kho
        const productInStorage =
          carts[isExistIndex].detail.quantity - carts[isExistIndex].detail.sold;

        if (carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity) {
          carts[isExistIndex].quantity = Number(carts[isExistIndex].detail.quantity);
        }
      } else {
        carts.push({ quantity: item.quantity, _id: item._id, detail: item.detail });
      }

      // update carts
      state.carts = carts;
    },
    doDeleteItemCartAction: (state, action) => {
      state.carts = state.carts.filter((item) => item._id !== action.payload._id);
    },
    // Sau khi đặt hàng  thành công muốn cho cái giỏ hàng của chúng ta trống trơn thì cần phải cập nhật lại con redux
    doPlaceOrderAction: (state, action) => {
      // reset lại carts cho nó trở lại rỗng
      state.carts = [];
    },
  },
  extraReducers: {},
});

export const {
  doAddBookAction,
  doUpdateCartAction,
  doDeleteItemCartAction,
  doPlaceOrderAction,
} = orderSlice.actions;

export default orderSlice.reducer;
