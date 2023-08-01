import axios from '../utils/axios-customize';

export const callRegister = (fullName, email, password, phone) => {
  return axios.post('/api/v1/user/register', { fullName, email, password, phone });
};

export const callLogin = (username, password) => {
  return axios.post('/api/v1/auth/login', { username, password });
};

export const callFetchAccount = () => {
  return axios.get('/api/v1/auth/account');
};

export const callLogout = () => {
  return axios.post('/api/v1/auth/logout');
};

export const callRefreshToken = () => {
  return axios.get('/api/v1/auth/refresh');
};

// Fetch ListUser
export const callFetchListUser = (query) => {
  // curren=1&pageSize=3, thay vì phải hardcode chúng ta sẽ truyền động query này từ phía client luôn
  return axios.get(`/api/v1/user?${query}`);
};

// Create a user
export const callCreateAUser = (fullName, password, email, phone) => {
  return axios.post('/api/v1/user', { fullName, password, email, phone });
};

// Create Multiple user with excel
export const callCreateMultipleUser = (dataArray) => {
  return axios.post('/api/v1/user/bulk-create', dataArray);
};

// Dùng để xóa User -> Cần truyền lên _id của user
export const callDeleteUser = (userId) => {
  return axios.delete(`/api/v1/user/${userId}`);
};

// Update user -> truyền lên một cái body mới, chỉ đươc cập nhật fullName và phone
export const callUpdateUser = (_id, fullName, phone) => {
  return axios.put('/api/v1/user', { _id, fullName, phone });
};

//
export const callFetchListBook = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};

// Create a book
export const callCreateABook = () => {
  return axios.post('/api/v1/book', {});
};
