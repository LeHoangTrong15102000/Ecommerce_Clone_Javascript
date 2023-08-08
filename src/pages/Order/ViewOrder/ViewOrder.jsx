import { Col, Divider, Empty, InputNumber, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteTwoTone } from '@ant-design/icons';
import {
  doDeleteItemCartAction,
  doUpdateCartAction,
} from '../../../redux/order/orderSlice';
import '../order.scss';

const ViewOrder = (props) => {
  const { setCurrentStep } = props;
  const [totalPrice, setTotalPrice] = useState(0);
  const { carts } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    if (carts && carts.length > 0) {
      let sum = 0;
      carts.map((item) => {
        sum += item.quantity * item.detail.price;
      });
      setTotalPrice(sum);
    } else {
      setTotalPrice(0);
    }
  }, [carts]);

  const handleOnChangeInput = (value, book) => {
    if (!value || value < 1) return; // Nếu như ko điền gì vào hoặc điền kí tự thì ko bắt sự kiênj
    if (!isNaN(value)) {
      // console.log('>>>> Check book', book);
      dispatch(
        doUpdateCartAction({ quantity: value, detail: book.detail, _id: book._id })
      );
    }
  };

  return (
    <div style={{ background: '#efefef', marginTop: '20px', minHeight: '700px' }}>
      <div className="order-container" style={{ maxWidth: 1800, margin: '0 auto' }}>
        <Row gutter={[20, 20]}>
          {/* Cột sản phẩm */}
          <Col md={18} xs={24} style={{ gap: 10 }}>
            {carts &&
              carts?.map((bookItem, index) => {
                const currentBookPrice = bookItem?.detail?.price ?? 0;
                return (
                  <div className="order-book" key={`book-${index}`}>
                    <div className="book-content">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                          bookItem?.detail?.thumbnail
                        }`}
                      />
                      <div className="title">{bookItem?.detail.mainText}</div>
                      <div className="price">
                        {new Intl.NumberFormat('vi-Vn', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(currentBookPrice)}
                      </div>
                    </div>
                    <div className="action">
                      <div className="quantity">
                        <InputNumber
                          // Khi onChange thì thực hiện 1 cái action update
                          onChange={(value) => handleOnChangeInput(value, bookItem)}
                          value={bookItem.quantity}
                        />
                      </div>
                      <div className="sum">
                        Tổng:{' '}
                        {new Intl.NumberFormat('vi-Vn', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(currentBookPrice * bookItem.quantity)}
                      </div>
                      <DeleteTwoTone
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          dispatch(doDeleteItemCartAction({ _id: bookItem._id }))
                        }
                        twoToneColor="#eb2f96"
                      />
                    </div>
                  </div>
                );
              })}

            {carts.length === 0 && (
              <div className="order-book-empty">
                <Empty description={'Không có sản phẩm trong giỏ hàng'} />
              </div>
            )}
          </Col>

          {/* Cột thông tin và thanh toán */}
          <Col md={6} xs={24}>
            <div className="order-sum">
              <div className="calculate">
                <span> Tạm tính</span>
                <span>
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(totalPrice || 0)}
                </span>
              </div>
              <Divider />
              <div className="calculate">
                <span> Tổng tiền</span>
                <span className="sum-final">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(totalPrice || 0)}
                </span>
              </div>
              <Divider style={{ margin: '10px 0' }} />
              <button onClick={() => setCurrentStep(1)}>
                Mua Hàng ({carts?.length ?? 0})
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ViewOrder;
