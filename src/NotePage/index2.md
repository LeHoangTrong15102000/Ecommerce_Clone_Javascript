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

- Xử lý cái hiệu ứng tăng giảm trong giỏ hàng, nhấn vào thêm giỏ hàng thì sẽ cập nhật vào bên trong con redux

- Chúng ta sẽ lấy thông tin sản phẩm mà thêm vào giỏ hàng(phải coi là cách lưu data vào như thế nào) -> Để sau này chúng ta sẽ lấy thông tin này để hiển thị động lên `icon cart`

- Trong Array giỏ hàng chúng ta sẽ lưu 3 thuộc tính: quantity, `_id`, detail: {id: abc , name: abc, price, category} (trong đây chứa chi tiết sản phẩm)

> 61 Bài tập hiển thị số lượng giỏ hàng

- Bài tập hiển thị số lượng giỏ hàng

- Chúng ta phải tính toán lại biến quantity lưu bên trong thz Redux nếu nó vượt qua số lượng sản phẩm có trong kho thì chúng ta sẽ `thông báo` và gán nó chính bằng số lượng trong kho của chúng ta luôn

- Component `Badge` của thằng `antd` mặc định nó sẽ ẩn đi khi mà nó có giá trị là 0, nên để show cho nó giá trị là `0` thì chúng ta cần sử dụng props của thằng antd là `showZero`

> 62 Design Preview Cart

- Moi data từ bên trong con redux và render nó vào trong `cart` sử dụng `popover` của thằng `antd`

- Nhờ có việc sử dụng thằng redux nên data giữa các component của chúng ta nó được lưu lại

- Ở thực tế thì cái Modal và Popover nó thường hiển thị ở bên ngoài cái `div id="root"` của chúng ta, hiển thị ở bên ngoài cái div root thì nó sẽ giúp chúng ta css cực kì dễ(ví dụ như chúng ta muốn override lên như z-index) -> Thành ra đối với các thư viện xử ký animation hoặc là làm các hiệu ứng thông thường nó sẽ ra ngoài cái `div id="root"`

  ++ Lý do thứ 2 là `div root` chứa source code của React, source của các component nó css lẫn vào nhau

  ++ Việc nằm ra ngoài cái div root thì nó sẽ cung cấp sự thoải mái cho chúng ta, chúng ta sẽ không bị ảnh hưởng css của bố con thằng nào hết

  ++ Để định nghĩa class cho `Popover` chúng ta nên định nghĩa class riêng của chúng ta, chúng ta không nên ghi đè lại class của thư viện, như vậy nếu như sau này chúng ta dùng component ở nơi khác thì nó sẽ bị ảnh hưởng code

  ++ Nếu chúng ta style cho thằng `Popover` bên trong file scss của header thì nó sẽ không ăn đâu, nên chúng ta sẽ định nghĩa file `scss global`

> 63 Design Base order Page

- Khi nhấn vào `Xem giỏ hàng` thì cần phải vào trang `Giỏ hàng`

> 64 Bài tập order page

- Cần phải build được cục Api trước khi gửi lên cho server xử lý

> 65 Bài tập Payment page

- Trong đầu chúng ta cần phải nhảy số rằng là nếu bước bằng 1 chúng ta cần phải render nội dung ứng với bước bằng 1

- Làm thêm cái màn hình nữa để nhập thông tin người dùng vào

> 66 Api Create An Order

- Tạo một cái đơn hàng

> 67 Bài tập View Order History

- Sau khi đặt hàng thành công, thì tạo giao diện xem lịch sử để xem người dùng đã đặt những đơn hàng nào

- Giới thiệu 1 công cụ đôi khi sau này đi làm chúng ta sẽ dùng tới đó là hiển thị data dưới dạng `JSON`

> 68 Bài tập Update Current User

- Trong `quản lý tài khoản` có thể thay đổi được Avatar, tên hiển thị và số điện thoại người dùng

- Để giải quyết phần `Cập nhật thông tin` chúng ta cần phải có 2 Api
  ++ Api đầu tiền là `Upload hình ảnh`
  ++ Api thứ 2 là cập nhật thông tin người dùng `Upload info user`

  ++ Sau khi upload hình ảnh thành công chúng ta cần phải trả về cái tên file ảnh upload đó -> Sau đó đưa nó vào chung với phần cập nhật thông tin -> Sau đó gọi Apii cập nhật để cập nhật thông tin người dùng

- Để giải quyết phần `Thay đổi thông tin mật khẩu` chúng ta cần

> 69 Bài tập Display Order Page + Api Dashboard

- Dùng component có sẵn có của thằng antd để xây dựng

> 70 Các bug còn tồn đọng

- Bug cuối cùng là `activeNav` để làm được điều đấy chúng ta cần có cơ chế gì đó để lưu lại đường link này -> Chúng ta sẽ căn cứ vào đường Link Url sau đó set lại trạng thái `active` của chúng ta
