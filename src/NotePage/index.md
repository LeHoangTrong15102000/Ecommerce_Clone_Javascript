# Thực hiện bài Test Frontend - Fresher

## Module Auth

> 18.1 Protected Page trong trường hợp người dùng bị lỗi 401 thì chúng ta sẽ gọi Api `RefreshToken` và đá người dùng về trang home

- Trong Video tiếp theo thì sẽ fix cái bug còn tồn động lại khi mà chúng ta xử lý người dùng đăng nhập vào trang admin

> 19.2 Có cách làm thứ 2 với thz logout là sử dụng Reduxthunk

> 20 Axios Retry - Handle Refresh Token

- Cái thư viện ms sẽ convert chuỗi string sang `ms` cho chúng ta -> Ở phía BE của chúng ta nó chỉ hiểu ms mà thôi nên cần phải convert về

- Sẽ dùng cơ chế re-try khi mà gọi Api fail thì sẽ gọi lại Api bị failed bằng cách thêm vào `RefreshToken` để lấy ra được `access_token` mới

- Nếu mà hàm bất đồng bộ thì bắt buộc chúng ta phải có `async await` và nó phải chờ code cho chúng ta nếu không thì chúng ta cần phải 'chấm' .then() để biết rằng đây là một hành động bất đồng bộ và nó sẽ trả về một Promise<>

- Nhưng nó vẫn bị lỗi do con Redux ko được nạp vào data của `User`

- Trong trường hợp mà cái handleRefreshToken nó trả ra mã lỗi là 401 luôn thì nó sẽ Retry liên tục đãn tới bị lập vô hạn, nó sẽ chạy không bao giờ ngừng nghỉ luôn -> Nên trong thực tế để tránh thực hiện cái vòng lập này vô hạn, -> Chúng ta sẽ đặt một cái `Flag` nếu chúng ta đã retry rồi thì lần sau gọi 401 chúng ta sẽ không `retry` nữa -> Chỉ được retry được đúng 1 lần
  ++ Mặc định tham số headers[NO_RETRY_HEADER] nó sẽ không có tồn tại trong headers nó chỉ tồn tại khi nó bằng `true` , khi mà nó đã có giá trị rồi
  cho người dùng

> 21 Fix lỗi hết hạn RefreshToken

- Trong thực tế con trường hợp gây ra lỗi nữa là cái `refreshToken` nó hết hạn

## Module Users

> 22 Giới thiệu Table Component

- Chúng ta sẽ filter theo nhiều tiêu chí, chúng ta có thể filter một lúc nhiều trường dữ liệu, còn table của `antd` chỉ filter được theo 1 trường -> Nên chúng ta sẽ tổ chức thanh search `filter` để filter theo nhiều trường dũ liệu

- Việc mà muốn filter theo nhiều tiêu chí thì sang version2 của thz Antd là `Antd Pro` nó sẽ làm điều đó cho chúng ta

- Sau này mỗi lần chúng ta nhấn vào thz sort thì chúng ta sẽ gọi Api và sắp xếp lại dữ liệu luôn chứ không phải là chúng ta sắp xếp chỉ trên 1 trang

- Đối với cái table của chúng ta mỗi lần chúng ta nhấn `onChange` nó sẽ hiện tất cả các tham số chúng ta đã cấu hình trên màn hình cho chúng ta

> 23 Api hiển thị danh sách User

- Làm sao để chúng ta biết được rằng cái table có những cái props nào --> Thì đây chính là lúc chúng ta đọc ngược lại mã nguồn -> Đây là câu chuyện thực tế sau này đi làm để có thể sinh tồn được

- Mặc định thằng showSizeChanger nó sẽ là `false` khi mà total > 50 thì nó mới là true, còn `PageSize` chỉ hiển thị khi mà `showSizeChanger` là `true` phải thêm vào bằng `true` để chúng ta mới có thể hiển thị số bản ghi trên 1 trang (là cái dropdown) số lượng bản ghi trên một `page`

- Nên về ý tưởng là mỗi một lần chúng ta onChange thì chúng ta sẽ thay đổi các tham số như `pageSize, current, pages , total(tổng số bản ghi)`(lấy từ BE gửi lên) -> Thay vì chúng ta hard code phần props `pagination` thì chúng ta sẽ truyền động -> Phải có kết quả thì BE mới tiến hành phân trang

-

> 24 Bài tập hiển thị danh sách User

- Mỗi lần phân trang thì chỉ cần thay đổi tham số `current` phần `pageSize` để mặc định là 2

- Trước khi chưa vội nói về phần Api , sẽ đi nói phần hiển thị dữ liệu lên table trước -> Để hiển thị lên được table thì chúng ta cần khai báo phần `columns`

- Bây giờ sẽ tới phần khó hơn, mỗi lần chúng ta chuyển trang thì làm sao nó lấy được dữ liệu mới

> 25 API Filter

- Chúng ta sẽ không viết Api mới cho phần `Filter` vì nó sẽ cực kì lãng phí và không tối ưu hóa -> Thay vào đó chúng ta sẽ truyền thêm vào một vài tham số -> Vẫn là Api lấy danh sách `ListUser` thôi nhưng chúng ta cần truyền thêm các tham số

- Demo với 2 dạng Filter

  ++ Dạng đầu tiên là basic
  ++ Dạng thứ 2 là theo `Regx`

- Do `query` trên `Url` là so sánh tuyệt đối nếu tên truyền vào không đúng chính xác thì nó sẽ không trả ra kết quả chúng ta không muốn điều đó -> Chúng ta nó muốn nó giống như là toán tử `Like` trong `sql` là `Nó sẽ tìm kiếm tương đối` -> để làm điều này với `Mongodb` chúng ta sẽ sử dụng `Regx` cú pháp sẽ thêm vào là `&fullName=/I'm Admin/i` -> Là thêm phần `&fullName=/{tên_search}/i` nào vào đường link URL -> Tìm kiếm theo điều kiện `$like$` này thì sẽ dễ dàng hơn không làm trải nghiệm người dùng đi xuống.

> 26 Bài tập Filter danh sách User

> 27 Api Sorter

> 28 Bài tập Sorter

> 29.1 Bài tập chức năng View Detail User

> 29.2 Bài tập Add Avatar

> 30 Bài tập chức năng thêm mới User

> 31 Design Modal Upload (Drag & Drop)

> 32 Read File Excel

> 33 Bài tập chức năng Import User

> 34 Download sample file

> 35 Export To CSV

> 36 Bài tập chức năng Export User

> 37 Bài tập chức năng Update User

> 38 Bài tập chức năng Delete User

> 39 Ôn tập các kiến thức đã học

## Module Books

> 40 Bài tập hiển thị /Filter / Sort Books

> 41 Bài tập design chức năng xem chi tiết Book

> 42 Hoàn thiện chức năng xem cho tiết Book

> 43 Design Form Add New Book

> 44 Bài tập Uplaod File

> 45 Bài tập Create a new book

> 46 Bài tập Design form update hook

> 47 Bài tập Update a hook

> 48 Bài tập Delete a hook

> 49 Ôn tập các kiến thức đã học

> 50 Bài tập design giao diện client(homepage)

> 51 Hiểm thị home page

> 52 Bài tập Filter/Sorter

> 53 Url với Params/Query

> 54 Bài tập Design View Detail Page

> 55 Chức năng View Detail Book

> 56 Thêm Loading Skeleton

> 57 Hoàn thiện view detail page

> 58 Quá trình xây dựng giao diện

## Module Orders

> 59 setup redux persist

> 60 Bài tập Add/Remove Product

> 61 Bài tập hiển thị số lượng giỏ hàng

> 62 Design Preview Cart

> 63 Design Base order Page

> 64 Bài tập order page

> 65 Bài tập Payment page

> 66 Api Create An Order

> 67 Bài tập View Order History

> 68 Bài tập Update Current User

> 69 Bài tập Display Order Page + Api Dashboard

> 70 Các bug còn tồn đọng
