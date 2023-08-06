import { useLocation } from 'react-router-dom';
import ViewDetail from './ViewDetail/ViewDetail';
import { useEffect, useState } from 'react';
import { callFetchBookById } from '../../services/api';

const BookPage = () => {
  const [dataBook, setDataBook] = useState(null);
  let location = useLocation();

  let params = new URLSearchParams(location.search); // convert thành cái object chứa key và value, cũng có thể dùng `fromEntries`
  const bookId = params.get('id'); // từ cái params lấy ra giá trị của `id` phía sau dấu chấm hỏi

  useEffect(() => {
    fetchBook(bookId);
  }, [bookId]);

  const fetchBook = async (id) => {
    const res = await callFetchBookById(id);

    if (res && res.data) {
      let rawData = res.data;
      // process data
      rawData.items = getImage(rawData); // xử lý dữ liệu thô với thumbnail và slider

      // setDataBook(rawData);

      setTimeout(() => {
        setDataBook(rawData);
      }, 1500);
    }
  };

  // xử lý ảnh thumbnail và slider
  const getImage = (rawData) => {
    let images = []; // ban đầu tạo array rỗng
    if (rawData.thumbnail) {
      // Cần phải build lên được dữ liêu giống dịnh dạng mà react-iamge-gallery yêu cầu
      images.push({
        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${rawData.thumbnail}`,
        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${rawData.thumbnail}`,
        originalClass: 'original-image',
        thumbnailClass: 'thumbnail-image',
      });
    }

    if (rawData.slider) {
      rawData.slider?.map((item, index) => {
        images.push({
          original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
          thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
          originalClass: 'original-image',
          thumbnailClass: 'thumbnail-image',
        });
      });
    }

    return images;
  };

  return (
    <>
      <ViewDetail dataBook={dataBook} />
    </>
  );
};

export default BookPage;
