import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // set bằng true thì kể từ bây giờ FE và BE của chúng ta có thể trao đổi cookies được rồi, lúc trước do HttpOnly= true nên chỉ có BE mới có thể sử dụng được cookies
  // Việc check token hợp lệ hay không được phép sử dụng hay không, có quyền gì hay không thì BE sẽ làm phần đó cho chúng ta, còn việc FE là lưu token về và sử dụng
  // Ở phần này chúng ta không cần lưu  RT về nó đã lưu sẵn dưới cookies rồi -> Chỉ cần lấy về rồi dùng thôi
});

const access_token = localStorage.getItem('access_token');
instance.defaults.headers.common = {
  Authorization: `Bearer ${access_token}`,
};

//  Để mà lấy được RefreshToken thì mặc định chúng ta phải có Cookies, cookies nó đã trả về sẵn cho chúng ta rồi
const handleRefreshToken = async () => {
  const res = await instance.get('/api/v1/auth/refresh');
  if (res && res.data) return res.data.access_token;
  else null;
};

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const NO_RETRY_HEADER = 'x-no-retry';

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (
      error.config &&
      error.response &&
      // Thêm dấu '+'  để khi mà nó trả về một chuỗi string thì sẽ convert nó về một số nguyên
      +error.response.status === 401 &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const access_token = await handleRefreshToken(); //  Lấy ra access_token mới
      error.config.headers[NO_RETRY_HEADER] = 'true'; // nó sẽ chạy vào cái `key x-no-retry` trong `config.headers` và nó biết là biến này có giá trị
      if (access_token) {
        error.config.headers['Authorization'] = `Bearer ${access_token}`;
        localStorage.setItem('access_token', access_token); // Lấy ra được access_token mới thì gán nó vào lại localStorage
        return instance.request(error.config); // phải return về instance.request(error.config) khi mà nó có lỗi về token để người dùng mới được phép đăng nhập tiếp
      }
    }

    // Nếu RefreshToken và url = '/api/v1/auth/refresh' thì chúng ta sẽ đá người dùng về trang login
    // Việc chúng ta redirects người dùng thì nó sẽ refresh lại trang và nó sẽ không ghi lại load phần Api nào hết
    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === '/api/v1/auth/refresh'
    ) {
      window.location.href = '/login';
    }

    return error?.response?.data ?? Promise.reject(error);
  }
);

export default instance;
