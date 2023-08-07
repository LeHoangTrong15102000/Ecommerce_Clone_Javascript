import { useRef, useState } from 'react';
import '../book.scss';
import ModalGallery from '../ModalGallery/ModalGallery';
import ImageGallery from 'react-image-gallery';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { BsCartPlus } from 'react-icons/bs';
import { Col, Divider, Rate, Row } from 'antd';
import BookLoader from '../BookLoader';
import { useDispatch } from 'react-redux';
import { doAddBookAction } from '../../../redux/order/orderSlice';

const ViewDetail = (props) => {
  const { dataBook } = props;

  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const refGallery = useRef(null);

  const [currentQuantity, setCurrentQuantity] = useState(1);
  const dispatch = useDispatch();

  const images = dataBook?.items ?? [];

  // const images = [
  //   {
  //     original: 'https://picsum.photos/id/1018/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1018/250/150/',
  //     originalClass: 'original-image',
  //     thumbnailClass: 'thumbnail-image',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1015/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1015/250/150/',
  //     originalClass: 'original-image',
  //     thumbnailClass: 'thumbnail-image',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1019/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1019/250/150/',
  //     originalClass: 'original-image',
  //     thumbnailClass: 'thumbnail-image',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1018/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1018/250/150/',
  //     originalClass: 'original-image',
  //     thumbnailClass: 'thumbnail-image',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1015/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1015/250/150/',
  //     originalClass: 'original-image',
  //     thumbnailClass: 'thumbnail-image',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1019/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1019/250/150/',
  //     originalClass: 'original-image',
  //     thumbnailClass: 'thumbnail-image',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1018/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1018/250/150/',
  //     originalClass: 'original-image',
  //     thumbnailClass: 'thumbnail-image',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1015/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1015/250/150/',
  //     originalClass: 'original-image',
  //     thumbnailClass: 'thumbnail-image',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1019/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1019/250/150/',
  //     originalClass: 'original-image',
  //     thumbnailClass: 'thumbnail-image',
  //   },
  // ];

  const handleOnClickImage = () => {
    // get current index onclick
    // alert(refGallery?.current?.getCurrentIndex())
    setIsOpenModalGallery(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0); // lấy ra cái index hiện tại(image đang đứng hiên tại -> trả về number)
    // refGallery?.current?.fullscreen()
  };

  const handleChangeButton = (type) => {
    if (type === 'MINUS') {
      if (currentQuantity - 1 <= 0) return;
      setCurrentQuantity(currentQuantity - 1);
    }

    if (type === 'PLUS') {
      if (currentQuantity === +dataBook.quantity) return; // max, nếu đã bằng thì không cho cộng nữa
      setCurrentQuantity(currentQuantity + 1);
    }
  };

  const handleChangeInput = (value) => {
    // Nếu giá trị không phải là isNaN(là một số nguyên hay không)
    const quantityBookInStorage = dataBook.quantity - dataBook.sold;
    if (!isNaN(value)) {
      if (+value > 0 && +value < +quantityBookInStorage) {
        setCurrentQuantity(+value); // +value là lấy value là số dương
      } else if (+value > +quantityBookInStorage) {
        setCurrentQuantity(+quantityBookInStorage);
      }
    }
  };

  // truyền số lượng đông thời truyền luôn thông tin sản phẩm vừa mua
  const handleAddToCart = (quantity, book) => {
    dispatch(doAddBookAction({ quantity, detail: book, _id: book._id }));
  };

  const onChange = (value) => {
    console.log('Changed', value);
  };

  return (
    <div style={{ background: '#efefef', padding: '20px 0' }}>
      <div
        className="view-detail-book"
        style={{ maxWidth: 1440, margin: '0 auto', minHeight: 'calc(100vh - 150px)' }}
      >
        <div style={{ padding: '20px', background: '#fff', borderRadius: 5 }}>
          {dataBook && dataBook._id ? (
            <Row gutter={[20, 20]}>
              <Col md={10} sm={0} xs={0}>
                <ImageGallery
                  ref={refGallery}
                  items={images}
                  showPlayButton={false} // hide play button
                  showFullscreenButton={false} // hide fullscreen button
                  renderLeftNav={() => <></>} // left arrow === <></>
                  renderRightNav={() => <></>} // right arrow === <></>
                  slideOnThumbnailOver={true}
                  onClick={() => handleOnClickImage()}
                />
              </Col>
              <Col md={14} sm={24}>
                <Col md={0} sm={24} xs={24}>
                  <ImageGallery
                    ref={refGallery}
                    items={images}
                    showPlayButton={false} //hide play button
                    showFullscreenButton={false} //hide fullscreen button
                    renderLeftNav={() => <></>} //left arrow === <> </>
                    renderRightNav={() => <></>} //right arrow === <> </>
                    showThumbnails={false}
                  />
                </Col>
                <Col span={24}>
                  <div className="author">
                    Tác giả: <a href="#">{dataBook?.author}</a>{' '}
                  </div>
                  <div className="title">{dataBook?.mainText}</div>
                  <div className="rating">
                    <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                    <span className="sold">
                      <Divider type="vertical" />
                      Đã bán {dataBook?.sold}
                    </span>
                  </div>
                  <div className="price">
                    <span className="currency">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(dataBook?.price ?? 0)}
                    </span>
                  </div>
                  <div className="delivery">
                    <div>
                      <span className="left-side">Vận chuyển</span>
                      <span className="right-side">Miễn phí vận chuyển</span>
                    </div>
                  </div>

                  <div className="quantity">
                    <span className="left-side">Số lượng</span>
                    <span className="right-side">
                      <button onClick={() => handleChangeButton('MINUS')}>
                        <MinusOutlined />
                      </button>
                      <input
                        // defaultValue={1}
                        value={currentQuantity}
                        onChange={(event) => handleChangeInput(event.target.value)}
                      />
                      <button onClick={() => handleChangeButton('PLUS')}>
                        <PlusOutlined />
                      </button>
                    </span>

                    <span
                      className="right-side"
                      style={{ marginLeft: '35px', fontSize: '15px' }}
                    >
                      {' '}
                      {dataBook?.quantity - dataBook?.sold} Sản phẩm có sẵn
                    </span>
                  </div>

                  <div className="buy">
                    <button
                      className="cart"
                      onClick={() => handleAddToCart(currentQuantity, dataBook)}
                    >
                      <BsCartPlus className="icon-cart" />
                      <span>Thêm vào giỏ hàng</span>
                    </button>
                    <button className="now">Mua ngay</button>
                  </div>
                </Col>
              </Col>
            </Row>
          ) : (
            <BookLoader />
          )}
        </div>
      </div>
      <ModalGallery
        isOpen={isOpenModalGallery}
        setIsOpen={setIsOpenModalGallery}
        currentIndex={currentIndex}
        items={images}
        title={'hardcode'}
      />
    </div>
  );
};

export default ViewDetail;
