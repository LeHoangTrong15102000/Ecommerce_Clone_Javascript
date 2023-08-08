import { DeleteTwoTone, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import {
  Col,
  Row,
  Form,
  Divider,
  Button,
  Radio,
  Input,
  Spin,
  Result,
  message,
  notification,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../order.scss';
import {
  doDeleteItemCartAction,
  doPlaceOrderAction,
} from '../../../redux/order/orderSlice';
import { Link } from 'react-router-dom';
import { callPlaceOrder } from '../../../services/api';

const { TextArea } = Input; // Chỗ này có thể khai báo như này hoặc là có thể Input.TextArea
const Payment = (props) => {
  const { setCurrentStep } = props;
  const { carts } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.account);

  // console.log('>>>> Check  carts', carts);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, []);

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

  const handleFinish = async (values) => {
    setIsSubmit(true);
    const { fullName, phone, address } = values;
    if (fullName === '' || phone === '' || address === '') {
      message.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const detailOrder = carts.map((item, index) => {
      return {
        bookName: item.detail.mainText,
        quantity: item.quantity,
        _id: item._id,
      };
    });

    //  Build data cần build lên
    const data = {
      name: values.fullName,
      phone: values.phone,
      address: values.address,
      totalPrice: totalPrice,
      detail: detailOrder,
    };

    const res = await callPlaceOrder(data);
    if (res && res.data) {
      message.success('Đặt hàng thành công');
      dispatch(doPlaceOrderAction());
      setCurrentStep(2);
    } else {
      notification.error({
        message: 'Có lỗi xảy ra',
        description: res.message,
      });
    }

    setIsSubmit(true);
  };

  return (
    <div style={{ background: '#efefef', marginTop: '20px', minHeight: '700px' }}>
      {carts && carts.length > 0 ? (
        <div className="order-container" style={{ maxWidth: 1800, margin: '0 auto' }}>
          <Spin spinning={isSubmit} tip="Loading...">
            <Row gutter={[20, 20]}>
              {/* Cột sản phẩm */}
              <Col md={17} xs={24} style={{ gap: 10 }}>
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
                            {/* <InputNumber
                          // Khi onChange thì thực hiện 1 cái action update
                          onChange={(value) => handleOnChangeInput(value, bookItem)}
                          value={bookItem.quantity}
                        /> */}
                            <span>Số lượng: {bookItem.quantity}</span>
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
              </Col>

              {/* Cột thông tin và thanh toán */}
              <Col md={7} xs={24}>
                <div className="order-sum">
                  <Form
                    form={form}
                    name="basic"
                    style={{ maxWidth: 600, width: '100%' }}
                    onFinish={handleFinish}
                    autoComplete="off"
                  >
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="Tên người nhận"
                      name="fullName"
                      style={{ marginBottom: '12px' }}
                      rules={[
                        {
                          required: true,
                          message: 'Tên người nhận không được để trống!',
                        },
                      ]}
                    >
                      <Input placeholder="FullName" />
                    </Form.Item>

                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="Số điện thoại"
                      name="phone"
                      style={{ marginBottom: '12px' }}
                      rules={[
                        { required: true, message: 'Số điện thoại không được để trống' },
                      ]}
                    >
                      <Input placeholder="Phone" />
                    </Form.Item>

                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="Địa chỉ"
                      name="address"
                      style={{ marginBottom: '24px' }}
                      rules={[{ required: true, message: 'Địa chỉ không được để trống' }]}
                    >
                      <TextArea rows={4} maxLength={100} allowClear />
                    </Form.Item>
                  </Form>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <span>Hình thức thanh toán</span>
                    <div>
                      <Radio defaultChecked={true}> Thanh toán khi nhận hàng</Radio>
                    </div>
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
                  <button
                    htmlType="submit"
                    disabled={isSubmit}
                    // loading={isSubmit}
                    onClick={() => {
                      form.submit(); // submit() nó sẽ fire cái hàm handleFinish
                    }}
                  >
                    {isSubmit && (
                      <span>
                        <LoadingOutlined />
                      </span>
                    )}
                    Đặt Hàng ({carts?.length ?? 0})
                  </button>
                </div>
              </Col>
            </Row>
          </Spin>
        </div>
      ) : (
        <>
          <Result
            icon={<SmileOutlined />}
            title="Vui lòng chọn sản phẩm trước khi thanh toán"
            extra={
              <Link to="/">
                <Button type="primary" style={{ backgroundColor: '#1677ff' }}>
                  Xem lịch sử
                </Button>
              </Link>
            }
          />
        </>
      )}
    </div>
  );
};

export default Payment;
