import { useLocation } from 'react-router-dom';

const BookPage = () => {
  let location = useLocation();

  console.log('>>> Check location', location);
  console.log('>>>> Check search', location.search);

  let params = new URLSearchParams(location.search); // convert thành cái object chứa key và value, cũng có thể dùng `fromEntries`
  console.log('>>> Check Search params', params);
  const bookId = params.get('id'); // từ cái params lấy ra giá trị của `id` phía sau dấu chấm hỏi

  console.log('>>>>> Check id book', bookId);

  return <div>Book page</div>;
};

export default BookPage;
