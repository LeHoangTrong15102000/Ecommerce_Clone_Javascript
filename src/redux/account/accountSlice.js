// trong đây sẽ thực hiện hành động khi mà đã đăng nhập rồi
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callLogout } from '../../services/api';

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

// Nếu làm như này thì không cần dùng action bình thường nữa
export const handleLogoutAction = createAsyncThunk('account/logout', async (thunkAPI) => {
  try {
    return await callLogout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Chúng ta cần nạp lại data cho thằng redux mỗi lần chúng ta F5 lại trang

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    doLoginAction: (state, action) => {
      state.isAuthenticated = true; // Do nó đã sử dụng thư viện immerjs nên chúng ta có thể modify trực tiếp ko lo bị ảnh hưởng
      state.isLoading = false;
      state.user = action.payload; // payload là cả object bự bao gồm cả `accesS_token` và `user`
    },
    doGetAccountAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;

      // payload nhận vào là một cái object trong đó chứa key là `user: {}`
      // console.log(action.payload);
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
  extraReducers: (builder) => {
    builder
      .addCase(handleLogoutAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(handleLogoutAction.fulfilled, (state, action) => {
        localStorage.removeItem('access_token');
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = {
          email: '',
          phone: '',
          fullName: '',
          role: '',
          avatar: '',
          id: '',
        };
      })
      .addCase(handleLogoutAction.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { doLoginAction, doGetAccountAction, doLogoutAction } = accountSlice.actions;

export default accountSlice.reducer;
