# Chức năng giỏ hàng

## Module Orders

> 59 setup redux persist

- Cái data sách của chúng ta đang ở phân body trong khi cái giỏ hàng đang ở phần header , hai phần này đang ở 2 component khác nhau làm sao để chúng có thể giao tiếp được với nhau để chia sẻ dữ liệu chung với nhau -> Chúng ta sẽ sử dụng redux persist tại vì khi refresh lại trang thì data trong redux nó sẽ bị mất

- Chúng ta chỉ lưu những thông tin nào ít nhạy cảm trong redux persist, bản chất của thằng `redux persist` là nó lưu vào bên trong `localStorage` và khi chúng ta F5 lại trang thì nó sẽ lấy từ `localStorage` nạp lại vào bên trong redux của chúng ta như vậy thì chúng ta sẽ có lại data

  ++ Ví dụ như thông tin tài khoản của người dùng thì chúng ta sẽ không lưu lại, chúng ta sẽ dựa vào thông tin của server nó sẽ chính xác hơn, thường thì sẽ dùng api từ server để lấy lại thông tin người dùng

  ++ Khi người dùng thêm vào giỏ hàng và khi chúng ta F5 lại giỏ hàng thì người dùng cũng cần phải thấy được -> Nên là lúc này chúng ta mới cần tới thư viện redux-persist

- Setup redux persist của chúng ta ở đây

- Dùng một hàm tên là combineReducers sau đó chúng ta truyền vào thôi (các slice của reducer vào thôi) -> rootReducer sẽ được định nghĩa bằng `combineReducers`

- Làm sao để không lưu một thông tin vào trong redux persist -> để làm được điều đó thì chúng ta sẽ đọc docs thôi, nó có một khái niệm là `blackList` tất cả reducer nào thuộc blackList thì nó sẽ không lưu vào

> 60 Bài tập Add/Remove Product

- Bài tập add và remove product

> 61 Bài tập hiển thị số lượng giỏ hàng

- Bài tập hiển thị số lượng giỏ hàng

> 62 Design Preview Cart

> 63 Design Base order Page

> 64 Bài tập order page

> 65 Bài tập Payment page

> 66 Api Create An Order

> 67 Bài tập View Order History

> 68 Bài tập Update Current User

> 69 Bài tập Display Order Page + Api Dashboard

> 70 Các bug còn tồn đọng
