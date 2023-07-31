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

- Bây giờ cái hàm `FetchUser` của chúng ta sẽ có thêm thằng params là `searchFilter`

- DO Api này là động nên là truyền lên kiểu gì thì filter kiểu đấy

> 26 Bài tập Filter danh sách User

- Todo

> 27 Api Sorter

- Để mà sort dữ liệu thì chúng ta cần điền vào keyword là sort

- Nếu mà sắp xếp theo chiều tăng dần thì chúng ta không cần phải truyền cái gì vào hết , còn nếu muốn sắp xếp theo chiều giảm dần thì chúng ta cần phải thêm dấu trừ phía trước đó là quy định của mongodb

- Sort theo 1 tiêu chí thì nó không có ích lợi gì hết, thông thường đi làm chúng ta thường sắp xếp theo một tiêu chí mà thôi

- Thằng `sort` chúng ta chỉ cần truyền tên trường chúng ta muốn sắp xếp vào là được

> 28 Bài tập Sorter

- Đối với thầng này chúng ta phải làm như nào để không bị conflict với thằng `Filter Search` -> Sao này dùng `antd Pro` thì nó đã `handle` hết cho chúng ta rồi

- Tạo thêm 2 thằng state nữa là `filter` và `sortQuery`

> 29.1 Bài tập chức năng View Detail User

> 29.2 Bài tập Add Avatar

- Để hiển thị cái ảnh sử dụng cú pháp url_backned/images/avatar/image_id_here

- Sử dụng cái component của thằng `antd` là `avatar-antd` -> Đối với thằng avatar này thì cũng chỉ cần điền vào là `src` thì nó sẽ hiển thị cái avatar cho chúng ta

- Đối với thằng vite thì để lấy giá trị của file env thì cú pháp phải là `import.meta.env.{tên_biến}`

- Thằng title trong Component là `Table` thì sau này sử dụng sử dụng `Antd Pro` chúng ta không cần phải khổ sở vì nó nữa => Thì thằng title trong `Table` nó muốn chúng ta trả về cho nó kiểu là `React.ReactNode` -> Sẽ viết một hàm return về `JSX`

- Thằng `antd` màu sắc của nó thiết kế là giành cho doanh nghiệp -> Màu sắc chủ đạo của doanh nghiệp đó -> Chúng ta không nên dùng `backgroundColor` để thay đổi màu sắc cho nó thay vào đó chúng ta nên `change theme` của thằng `antd`

> 30 Bài tập chức năng thêm mới User

- Thêm Modal và khi người dùng click ra ngoài sẽ ngăn chặn cái modal này đóng lại

- Về phần này thì chúng ta sử dụng Api là `POST localhost:8080/api/v1/user` để tạo mới `user`, truyền lên fullName, password, email ,phone

- Về phần Form thì chúng ta sẽ nhúng phần Form vào bên trong body của cái `Modal` -> Nhúng cái Form bởi vì chúng ta muốn cái Form làm nhiệm vụ `validate` dữ liệu cho chúng ta(Phần Header và phần Button thì cái Modal đã có sẵn cho chúng ta) -> Tuy nhiên khi sử dụng thầng `Form` bên trong thằng `Modal` nó nảy sinh vấn đề rất là chi là khó yêu cầu chúng ta cần phải tư duy -> Thông thường chúng nhấn nút submit thì nút submit thường nằm trong cái Form nhưng mà đối với trường hợp này thì nút submit nó lại nằm ở phần `Modal`, thì làm sao chúng ta có thể bắt được sự kiện người dùng submit cái Form -> để làm được điều đấy thì rất chi là may cái `Form` nó cung cấp cho chúng ta `vài cái hook` -> hooks này cho phép chúng ta truy cập vào cái `Form` này -> Cung cấp cái hook tên là `useForm`

- Mỗi lần nhấn nút submit của cái Modal nó sẽ bằng hành động nhất nút submit của cái `Form` nên vì điều đó chúng ta mới có thể control được cái sự kiện submit ở trong `Modal`

> 31 Design Modal Upload (Drag & Drop)

- Làm chức năng Import và Export dữ liệu ra file `csv` -> Các chức năng này khá chi là hay

- Đầu tiên phải design Modal Upload(Drag & Drop) sau đó mới thực hiện chức năng, -> Cách design một phần upload như nào cho đúng

- Bài tập Import User List dùng Api là `POST localhost:8080/api/v1/user/bulk-create(bulk)` giúp tạo mới nhiều người dùng

- Bây giờ thay vì chúng ta thêm mới từng người dùng thì ngta muốn chức năng upload file Excel -> Người ta sẽ nhập danh sách `User` vào `excel` sau đó chúng ta sẽ import vào hệ thống

- Trong thực tế để giải quyết bài toán này sẽ có 2 quy trình, giải pháp về upload file
  ++ Cách 1
  +-+ User dùng browser(client) upload file lên website(file raw)
  +-+ Client gửi file (raw) lên server
  +-+ Server đọc file (raw) này, convert dữ liệu ra định dạng mong muốn(json)
  +-+ Server xử lý và lưu dữ liệu vào database
  +-+ Server trả về kết quả cho client
  -> Cách làm đầu tiên này thì phía BE phải xử lý khá là nhiều vì phải convert kiểu raw sang json

  ++ Cách 2
  +-+ User dùng browser(client) upload file lên website(file raw)
  +-+ Client đọc file upload, convert dữ liệu ra định dạng mong muốn(json) -> Thông thường chúng ta sẽ sử dụng định dạng là `Json`
  +-+ Client gửi dữ liệu json này lên server(không gửi file raw)
  +-+ Server đọc dữ liệu json gửi lên, xử lý, lưu dữ liệu vào đatabase
  +-+ Server trả về kết quả cho Client
  -> Cách làm này thì người phía FE sẽ phải xử lý khá là nhiều

  -> Nhưng nên biết cả 2 vì sớm mượn gì cũng phải trở thành fullstack dev

-> Trong hướng dẫn này chúng ta sẽ làm cách thứ 2 -> Vì chúng ta đang làm việc với tư cách là một FE developer -> khi đã làm được rồi sau này chúng ta sẽ đẩy về cho phía BE làm

- Quay trở lại giao diện thì chúng ta sẽ có cái `Form` -> Chúng ta có thể click để upload file hoặc là chúng ta có thể kéo thả để upload `File` như vậy thì tính thực tế nó sẽ cao hơn -> Sau khi đã upload File thì chúng ta sẽ đọc file ấy nó sẽ hiển thị ở dưới table
- Trong Video này chúng ta chỉ desgin giao diện thôi, trong video tiếp theo chúng ta sẽ đọc và ghi giao diện -> Phân tích cấu tạo của một cái `Modal UploadFile` -> Khi mà nhấn vào import thì chúng ta sẽ mở `Modal Import` -> Tiếp theo sẽ là phần upload, upload thành công thì cho hiển thị cái fileUpload ở phía dưới đồng thời có thể xóa nếu cần (khối lượng code như thế này thì thư viện nó đã làm hết cho chúng ta) -> Nhiệm vụ của chúng ta là phải lấy ra được cái output mà thư viện nó nhả ra cho chúng ta thôi -> Khi mà dùng giao diện thấy sướng như vậy thì khách hàng chúng ta họ cũng gật đầu mà thôi

- Để làm phần này thì chúng ta cần sử dụng cái component của thằng `antd` tên là `Upload` -> Cái component này thì độ khó của nó khá chi là cao cho dù độ khó là cao nhưng vẫn muốn giới thiệu tới -> Sau này đi làm thực tế nó sẽ là như vậy nếu mà làm những cái basic quá thì sau này đi làm người ta yêu cầu cao chúng ta sẽ bị ngợp -> Và đây chính là dạng thực tế cực kì cao luôn

- Ở đây đối với component upload này, chúng ta sẽ có cái mẹo nhỏ -> Nhấn Ctrl F rồi tìm tên cực kì nhanh đối với docs của thằng `antd` -> Thằng antd nó khá là tiện lợi, cái component đầu tiên chúng ta cần là `Upload`, component thứ 2 là `Table` để hôm sau chúng ta hiển thị dữ liệu

- Đối với thz `Dragger` props của nó có một thông số là action, cái action này nó muốn là mỗi một lần chúng ta xác nhận `upload` một cái là `File của chúng ta cần phải upload lên server` đường link url trong action là nơi mà file ảnh cần phải truy cập tới hay nói một cách cụ thể mỗi lần chúng ta nhấn nút xác nhận cái ảnh của chúng ta cần phải upload lên server -> Sau khi upload thành công thì chúng ta cần phải trả về trạng thái cho phía client biết là upload thành công hay thất bại -> Nó không phải là một cái component để hiển thị ảnh -> Để giải quyết bài toán của chúng ta chúng ta sẽ sử dụng component này mà không upload file -> Chúng ta chỉ muốn sử dụng giao diện của nó để `đọc file` thôi chứ chúng ta ko muốn upload(không cần phải sử dụng hết tính năng của nó) -> Chúng ta cần phải `customize thằng Antd`

- Chúng ta sử dụng cái component Upload mà không uploadFile thì chúng ta sẽ sử dụng tới cái hàm `customRequest` -> customRequest nó sẽ trả về kiểu `void`

-> Việc chúng ta đọc docs của thằng antd đôi khi là không đủ chi tiết nên đôi khi chúng ta phải đọc ngược lại `source code` -> Đây là cách học và sinh tồn

> 32 Read File Excel

- Trong bài này sẽ học cách `Read file excel` từ bên ngoài truyền vào -> Trước tiên sẽ demo thành quả mà chúng ta đặt được sau khi kết thức cái video này -> Sau khi mà kéo vào trong thì nó sẽ đọc cái dữ liệu trong file excel, sau đó nó phải fill vào trong cái component `Table`

- Trong phần này chúng ta sẽ cái thư viện giúp chúng ta có thể đọc được dữ liệu bên trong file excel -> `yarn add xlsx` -> Phần này chúng ta sẽ tự làm không đi code từ A-Z để cho chúng ta có thể tự làm được

- Sau khi đã cài đặt thành công thư viện `XLSX` vậy câu hỏi đặt ra là làm sau để chúng ta có thể đọc được dữ liệu trong file `Excel` -> Trong đầu chúng ta phải tư duy như thế này, bản chất của vấn đề, từ cái file góc chúng ta phải lấy được data trên từng dòng của `excel` và cái component `Table` nó phải cần dữ liệu dưới dạng `JSON` -> Chúng ta cần phải lên mạng search kết quả, rồi sau đó chúng ta cần phải thử, quá trình đó sẽ phải lập đi lập lại khá nhiều lần(chúng ta phải sai rồi sửa) như vậy chúng ta mới tiến bộ được -> Hầu hết xử lý file đều được viết dưới dạng `callBack` để đảm bảo rằng từng dòng code bên trong sẽ được thực thi, `còn nếu chúng ta viết từng dòng code một thì chưa chắc nó đã được thực thi`

- Bên trong hàm `onLoad` nó sẽ convert định dạng file qua định dạng `Byte(Unit8Array)` -> Sau khi đã convert rồi thì nó sẽ ném cho thư viện `XLXS` của chúng ta để xử lý -> Và sau đó nó lấy ra data `sheet1` và sau cùng là convert từ dạng `sheet` sang `json`

- Vấn đề là chúng ta cần phải lấy ra được cái `file = files[0]` -> Cái giá trị này thì nó nằm ở đoạn onChange của component `Upload` -> Đối với thằng antd khi mà chúng ta upload file thành công thì bên trong thằng `info` của hàm onChange nó đã có `file = files[0]` rồi

- `header: ['fullName', 'email', 'phone']` những cái hàm số này là gì và tại sao chúng ta lại biết tương tự như hôm trước thì chúng ta cần phải đọc ngược lại mã nguồn của thư viện -> Ở đây chúng ta truyền vào cái `options` -> Chúng ta lấy ra header vì chúng ta muốn `output format` cho nó và `range` là chúng ta đang `override worksheet range`

- Trong video tiếp theo sẽ làm chức năng import `User` vào `UserTable`

> 33 Bài tập chức năng Import User

- Về yêu cầu mỗi lần chúng ta đóng mở cái `Modal` thì chúng ta cần clear cái data đi và nhấn vào nút `cancel` thì data cũng phải mất đi -> Để có thể sử dụng được chức năng này chúng ta cần sử dụng cái Api `create list users(bulk) /api/v1/user/bulk-create` -> Tuy nhiên rằng đối với `Object` trong api đang được yêu cầu một trường mật khẩu trong khi rằng cái file excel không có trường mật khẩu ở đây -> Thành ra rằng trước khi chúng ta gửi data lên phía server chúng ta cần phải chế biến lại data trong cái `table` của chúng ta rằng chúng ta sẽ thêm cái thuộc tính là `password` -> Chúng ta cố tình làm như vậy để sau này khi chúng ta đặt mật khẩu cố định cho người dùng chúng ta không nên điền vào file excel thay vì vậy chúng ta nên `hardcode` ở trong code

- Chúng ta có handle Việc khi mà `Upload` bản ghi có email trùng thì nó sẽ thông báo cho chúng ta trường hợp này thì Be Nó đã handle điều đó chúng ta rồi, để giảm tải cho Fe nên Be đã xử lý và Fe chỉ hiển thị ra thông báo lỗi

> 34 Download sample file

- Sau này người dùng vào hệ thống của chúng ta người dùng tạo file excel như thế nào thì chúng ta cho phép người dùng down file mẫu về -> Download sample file

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
