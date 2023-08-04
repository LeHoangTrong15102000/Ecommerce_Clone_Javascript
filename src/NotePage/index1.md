# Tiếp tục với

## Module Books

> 40 Bài tập hiển thị /Filter / Sort Books

- Nếu chúng ta muốn sách nào mới thì chúng ta cho lên đầu thì mặc định sortQuery chúng ta sẽ để giá trị của nó là `sort=-updatedAt` thì những sách mới nó sẽ cho lên đầu tiên

> 41 Bài tập design chức năng xem chi tiết Book

- Đối với phần ảnh hiển thị cho sách chúng ta sử dụng component `Upload` của antd -> Khi mà chúng ta xem chi tiết thì chúng ta chỉ cần xem là được -> Còn sau này chức năng `thêm mới quyển sách` hoặc là `update quyển sách đó` thì chúng ta mới cho phép xem và xóa tấm ảnh của sách trong component `Upload` -> Còn bây giờ chúng ta phải học cách customize để cho nó có chức năng view thôi không có chức năng xóa

> 42 Hoàn thiện chức năng xem cho tiết Book

- Hiển thị động 4 ảnh khác nhau từ BE trả về -> hiển thị và hoàn thành giao diện cho phần `Xem chi tiết sản phẩm`

- Khi mà BE trả về dữ liệu thì hình ảnh chính diện của quyển sách chinh là `thumbnail` của nó
- `Slider` là phần chúng ta có thể scroll đi để xem chi tiết tổng quản của một sản phẩm -> Ý tưởng của chúng ta là ảnh đầu tiên sẽ là `thumbnail` các ảnh tiếp theo sẽ là ảnh trong mảng `slider` của chúng ta

- Cái ảnh `thumbnail` chính là ảnh đầu tiên của `slider` -> Nhưng mà do ở BE chúng ta đã tách ra để tạo độ khó

> 43 Design Form Add New Book

- Về ảnh Thumbnail chúng ta chỉ cho phép upload một ảnh duy nhất thôi, còn bên slider thì chúng ta mới cho phép upload nhiều ảnh

- Về phần thêm book này chúng ta sẽ tự làm -> để nâng cao kĩ năng thôi không còn cách nào khác để có thể nâng cao kĩ năng lúc này bằng cách luyện tập cường độ cao rồi

- Đối với phần thể loại của chúng ta chúng ta không nên `hardcode` thay vào đó chúng ta sẽ truyền từ database truyền xuống

- Thằng Options của select nó cần truyền vào cái object có đinh dạng như này `{value: Giá trị , label: Giá trị}`

- Để mà upload bên Thumbnail mà bên Slider không bị ảnh hưởng thì chúng ta cần cho nó làm 2 biến là `loading` và `loadingSlider` -> Và khi sử dụng hàm `onChange` thì cũng cần phải truyền vào `type` cho nó để phân biệt được là nó đang `onChange` cho biến nào

- Đối với thầng Upload mặc định nó sẽ có thằng action nhưng đối với chúng ta, chúng ta sẽ tạo ra một `customRequest` Để thực hiện việc `upload` ảnh

- Mỗi lần chúng ta nhấn `button` thì chúng ta phải `upload hình ảnh` đó lên server -> thì vấn đề này sẽ giải quyết ở bài giảng tiếp theo

> 44 Bài tập Uplaod File

- Trong video này sẽ tích hợp Api để upload hình ảnh

- Sau khi upload file thành công cần lưu vào state của react -> Lưu vào state của react để `submit form và validate file`

- Hàm `formatter`(transform giá trị hiển thị) -> Dùng hàm customize của nó để format giá tiền, hàm regular này có nghĩa là cứ 3 số(tính từ dưới) thì sẽ thêm một dấu phẩy -> Còn giá trị khi nhấn vào nút submit thì nó không hề có dấu phải đâu

- Đối với việc thêm mới một `thumbnail` thì chúng ta sẽ gọi một Api riêng và việc submit chúng ta sẽ gọi một Api riêng -> Việc làm như vậy để chúng ta giảm thiểu thời gian chờ đợi cho người dùng, sau này khi chúng ta nhấn nút tạo mới thì chúng ta `không cần gửi file lên server` nữa
  ++ Vì cái quá trình upload hình ảnh chỉ trả về tên `file` thôi(và quá trình đưa file lên server chính là quá trình ở đây luôn), nên khi người dùng tạo mới một quyển sách nên ở phần dữ liệu form của ảnh chỉ có `tên file của thumbnail và slider` gửi lên cùng `thông tin` của quyển sách -> Nên nó sẽ giảm thiểu được thời gian khi mà nhấn vào `tạo mới một quyển sách`

  ++ Khi mà chúng ta không gửi file lên server cái Api tạo mới này nó sẽ được viết đơn giản hơn, người viết BE Api nó sẽ nhàn hơn -> Đó là lý do tại sao chúng ta nên tách ra làm thành 2 Api -> Đó là lý do tại sao viết 2 Api trên một cái màn hình

- Api gửi file lên phía server dưới dạng `FormData` -> đồng thời sẽ ném về tên file khi mà upload thành công `fileUploaded: ${tên file}` -> Tên `file đã được mã hóa` cho nên không có chuyện `2 file có tên giống nhau`

- Khi mà upload file thành công thì chúng ta có thể , `preview ảnh` , `Xóa ảnh` và xóa toàn bộ dữ liệu khi thoát khỏi `Modal`

- Có một điều như thế này khi mà chúng ta `submit form` thì tấm ảnh `thumbnail hay slider` phải có tên hình ảnh nhưng mà khi chúng ta `upload` ảnh lên server thành công(chúng ta chỉ cần tên ảnh đó để đưa vào form thôi) -> Thì server sẽ trả về cho chúng ta một biến tên là `fileObject`(chính là file ảnh chúng ta upload lên) chứ không trả về cho chúng ta tên ảnh đâu -> Thành ra rằng để phục vụ cho mục đích là hôm sau chúng ta có data để truyền vào cái Api `CreateABook` -> Chúng ta sẽ lưu file ảnh upload thành công vào `state của thằng React`

  ++ Xử lý hàm `handleRemoveFile` -> để mỗi lần chúng ta xóa ảnh đi thì chúng ta cũng cần phải `cập nhật state của thằng React`

  ++ Song song với việc chúng ta thực hiện những thành động trên thì chúng ta cũng cần phải thực hiện thành động `PreviewImage` và khi close Modal thì `reset form`

- Đối với Api `/api/v1/file/upload` thì ở phần `Header` chúng ta cần truyền lên `upload-type: book(value)` -> Tiếp theo trong phần body `key` là `fileImg: file ảnh raw uplaod` kiểu dữ liệu của chúng ta là `FormData`

- Sau khi lấy gọi được Api để upload file ảnh -> Chúng ta sẽ tạo hàm handle việc `uploadFileThumbnail` và `uploadFileSlider` -> Lí do chia làm 2 hàm bởi vì mỗi một lần upload file thành công chúng ta cần lưu lại thông tin file đã upload thành công vào state của thằng React -> Chúng ta cần phải lưu lại bởi vì lát sau khi mà chúng ta nhấn vào nút `submitForm` chúng ta cần phải lấy ra được thông tin của cái `ảnh upload thành công` -> Nếu chúng ta muốn biết thằng form nó trả về gì cho chúng ta thì chúng ta cần `console.log` các thuộc tính `values` trong thằng form là được

- Mục đích lưu tên file uplaod của server trả về vào state của React bởi vì chúng ta muốn lấy ra cái `tên file trên server trả về` để khi mà `submit form` chúng ta sẽ gửi cái file ảnh đó lên `server thì server mới nhận diện được` -> còn nếu truyền tên file ảnh gốc ban đầu `lên server` thì nó sẽ không nhận biết được

- Đối với cái `Form` của chúng ta để hiển thị được ảnh(gọi đến Api upload ảnh) -> Thì nó đang lưu dưới dạng `fileObj` -> Đây không phải là điều mà chúng ta mong muốn, điều chúng ta mong muốn là `tên ảnh` chứ không phải `fileObj`
- Khi mà `submit form` tên file `thumbnail và slider` là tên file gốc -> Mà cái server mong muốn là `tên file lúc upload file ảnh lên server` -> Tại vì nếu `upload ảnh cùng tên` thì đứa upload sau nó sẽ ghi đè lên đứa upload trước -> Làm mất dữ liệu ảnh -> Nên chúng ta cần nhờ server trả về tên mới hoàn toàn không trùng nhau giữa các ảnh

- Đối với Slider khi mà ta `upload bao nhiều file ảnh thì nó sẽ gọi api bấy nhiêu lần` -> Nếu mà chúng ta không `clone lại dữ liệu ảnh upload trước` thì `ảnh upload sau nó sẽ đè lên` -> Nếu mà chúng ta gọi liên tiếp bao nhiêu lần thì `cái hàm setState nó ko chạy theo thứ tự đâu`(không biết state quá khứ) -> Thằng nào gọi cuối cùng thì nó sẽ chấp nhận mình thằng đấy

- Biến `file` là `tấm ảnh mình thao tác lên`

- Để biết lí do tại sao chúng ta lại làm vậy thì chúng ta cần console ra, và phía BE nó đang mong chờ cái gì -> Thì ở phía Fe chúng ta cần `customize` như nào dấy để chúng ta có thể lấy được data

> 45 Bài tập Create a new book

- Dựa vào các biến của thằng React như `dataThumbnail` và `dataSlider` để lấy ra tên của từng file `đưa vào form` sau đó gửi lên server

- Hoàn thành logic thêm mới một quyển sách -> Học được nhiều điều hay ho

> 46 Bài tập Design form update book

- Design form UI cho phần `update book`

- Trước khi gọi cái Api `Create a book` này đối với hàm `handleFinish` -> Nếu mà chúng ta không `upload file` vào `thumbnail và slider` mà chúng ta nhấn `submitForm` thì chúng ta sẽ thông báo lỗi -> Chúng ta sẽ validate thằng `thumbnail` khi mà người dùng ko `uploadFile ảnh lên` tại vì đối với thằng `Form của Antd` nó không hỗ trợ chúng ta validate trường `UploadFile` vì vậy chúng ta sẽ phải `validate bằng cơm`

> 47 Bài tập Update a book

- Đối với phần Update quyển để sách thì để có thể đưa hình anh quyển sách vào `ModalUpdateBook` thì ở `component Upload` chúng ta cần truyền vào(để init được giá trị cho nó) cho nó một cái props tên là `defaultFileList` -> Nó nhận vào giá trị là một `FileList`
  ++ Nên vấn đề đầu tiên là chúng ta cần phải build được data theo đúng dịnh dạng
  ++ Cần phải build được định dạng như này cho nó
  `uid: uuidv4(),
name: item, // item trong slider chính là tên bước ảnh
status: 'done',
url:`${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
      `

  ++ Thành ra ở phần `UpdateBook` đối với những ảnh nào chúng ta đã upload rồi chúng ta cần phải `build lên` cho nó -> Chúng ta tạo một state React để lưu giá trị `build của ảnh upload` -> Chúng ta dùng state của React `initForm` ở đây để mỗi một lần chúng ta thay đổi state thì chúng ta sẽ ép cái `Form render lại`

- Đối với cái form của `Update Book` có một vài vấn đề chúng ta sẽ không thể nào thích được -> Vấn đề của cái Form này, cho dù sau này cái biến state `initForm` mà cái form của chúng ta nó không render lại thì nó vẫn sai -> Chúng ta bị vấn đề này là do cái `Form` của chúng ta đang nằm trên phần Modal -> Thật chất là khi mà ta nhấn nút tắt Modal là Modal chúng ta sẽ tắt hoàn toàn đâu, nó vẫn nằm trên `cây DOM của thằng React` nó nhảy ảnh loạn xì ngầuu, nên chúng ta sẽ thêm cleanup function vào -> Khó mà làm nhiều thì chúng ta sẽ quen mà thôi

  ++ Build 1 data cho `ArrayThumbnail` , và sau đó build một data cho `ArraySlider` -> Hình ảnh chúng ta sẽ lấy dựa vào data trả về
  ++ Sau khi có 2 thầng `arrThumbnail và arrSlider` chúng ta sẽ build tất cả data của chúng ta lên trên cái `Form`
  ++ Về cái `_id` chúng ta cần phải truyền lên, nên chúng ta sẽ lưu luôn thằng `_id` này bên trong cái Form luôn

  ++ Ngoài ra để hiển thị ảnh của chúng ta sẽ gán 2 cái tên `arrThumbnail và arrSlider` với cái tên cực kì đặc biệt

- Đối với cái `component Form` của chúng ta mặc định nó sẽ lưu giá trị dưới 2 key là `file` và `fileList`
  ++ `fileList` chính là tất cả các ảnh đang hiển thị trên màn hình, còn `file` nó sẽ lưu tấm ảnh gần nhất chúng ta `upload` lên

  -> Thành ra rằng để `update quyển book` chúng ta cần `mòi` lại data cho nó -> Mục đích của việc mòi là để nó hiển thị lên màn hình -> Từ đó chúng ta mới có thể thao tác và chỉnh sửa được

- Đối với 2 thằng `UploadFileThumbnail và UploadFileSlider` chúng ta cần ghi đè giá trị của nó ở phần `defaultFileList` -> Nếu mà mặc dù chúng ta đã `form.setFieldsValue(init)` nhưng đôi khi nó sẽ không ăn vào `component Upload` cho chúng ta thường nó chỉ ăn vào hàm `Input` nên chúng ta cần phải ghi đè giá trị lại `defaultFileList={initForm?.thumbnail?.fileList ?? []}` -> Chúng ta phải ghi đè giá trị thì nó mói hiển thị được hình ảnh cho chúng ta

- Nếu mà dùng biến thuộc tính `fileList` thay vì `defaultFileList` -> Vì `fileList` thì lúc nào nó cũng cố đinh giá trị đó luôn không thể thay đổi được(thêm và xóa) ,còn `defaultFileList` thì khởi tạo nó đã có giá trị như vậy rồi sau đó chúng ta có thể thêm sửa xóa là chuyện của chúng ta

- Ở hàm `handlePreview` đối với các ảnh nào chúng ta đã `upload rồi` thì chúng ta `không cần convert` qua `base64` đâu

- Ở cái hàm handlePreview chúng ta `cần viết thêm logic cho component nếu ảnh chúng ta đã upload rồi` không cần phải `convert qua base64` nữa -> Vì thư viện lúc upload ảnh(thư viện nắm ảnh gốc của chúng ta) cho chúng ta `nó đã convert qua base64` nên chúng ta sẽ sử dụng đường link `url` để xem ảnh
  ++ Vì khi build ảnh chúng ta sẽ sử dụng ảnh có sẵn(đã được upload từ trước ), còn khi chúng ta tạo mới thì thư viện tạo mới cho chúng ta(nó nắm được file gốc)-> Còn khi mà `build ảnh thì chúng ta chỉ có đường link URL mà thôi`

- Tại sao chúng ta cần `reset cái form` mỗi lần chúng ta nhấn vào từng quyển sách -> Chúng ta ép cái Modal lúc nào nó cũng phải `resetData` lại cho chúng ta -> Mỗi lần `dataUpdate` thay đổi thì chúng ta ép Modal lúc nào cũng phải `reset data` hết

> 48 Bài tập Delete a book

- Hoàn thành bài tập delete Book

> 49 Ôn tập các kiến thức đã học

- Đã ôn lại tất kiến thức đã học được ở chương này -> Vận dụng tự làm các project khác nhau

> 50 Bài tập design giao diện client(homepage)

- Chúng sử dụng component Form ở trong component Filter để khi mà chúng ta filter thì giao diện sản phẩm nó sẽ được render lại
- Đối với thằng Form nó có hàm là `onValuesChange` khi chúng ta nhấn vào `ô checkbox` hay nhấn vào `button Áp dụng` thì nó cũng sẽ load dữ liệu cho chúng ta hết

> 51 Hiểm thị home page

- Phần đầu tiên load động danh mục sản phẩm

- Đối với phần filter có hàm khá chi là hay là hàm `onValuesChange` -> Mỗi lần cái giá trị của chúng ta thay đổi thì cái hàm này nó sẽ được gọi

- Hàm onValuesChange giúp lưu được những thay đổi trong form -> Về phần xử lý data trong video tiếp theo thì chúng ta sẽ xử lý, Còn với việc dùng cái `component của thằng antd` chúng ta dùng thằng `Form` nó đã lấy hết các giá trị cần thiết cho chúng ta rồi -> Việc code logic giao diện được giảm thiểu rất chi là nhiều

- Cái thứ 2 chúng ta cần phải làm là việc render ra đóng sách

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
