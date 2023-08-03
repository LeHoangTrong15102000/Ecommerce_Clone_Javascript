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

/**
 * Api Book module
 */

// Fetch List Book ở phân trang `Admin`
export const callFetchListBook = (query) => {
  return axios.get(`/api/v1/book?${query}`);
};

// Create a book, phải truyền giá trị theo thứ tự để nó có thể mapping được
export const callCreateABook = (
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.post('/api/v1/book', {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  });
};

export const callUpdateBook = (bookId, body) => {
  return axios.put(`/api/v1/book/${bookId}`, body);
};

export const callDeleteBook = (bookId) => {
  return axios.delete(`/api/v1/book/${bookId}`);
};

// FetchCategory
export const callFetchCategory = () => {
  return axios.get('/api/v1/database/category');
};

// call Upload book img
export const callUploadBookImg = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append('fileImg', fileImg); // cái biến gửi lên server phải cố tên là gifi fileImg
  return axios({
    method: 'post',
    url: '/api/v1/file/upload',
    data: bodyFormData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'upload-type': 'book',
    },
  });
};

/**
 * Api orders
 */

/**
 * Api dashboard
 */
