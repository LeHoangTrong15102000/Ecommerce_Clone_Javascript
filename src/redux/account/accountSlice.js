// trong đây sẽ thực hiện hành động khi mà đã đăng nhập rồi
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: {
    email: '',
    phone: '',
    fullName: '',
    role: '',
    avatar: '',
    id: '',
  },
};

// Chúng ta cần nạp lại data cho thằng redux mỗi lần chúng ta F5 lại trang

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticated = true; // Do nó đã sử dụng thư viện immerjs nên chúng ta có thể modify trực tiếp ko lo bị ảnh hưởng
      state.isLoading = false;
      state.user = action.payload;
    },
    doGetAccountAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload.user;
    },
    doLogoutAction: (state, action) => {
      localStorage.removeItem('access_token');

      state.isAuthenticated = false;
      state.user = {
        email: '',
        phone: '',
        fullName: '',
        role: '',
        avatar: '',
        id: '',
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { doLoginAction, doGetAccountAction, doLogoutAction } = accountSlice.actions;

export default accountSlice.reducer;
