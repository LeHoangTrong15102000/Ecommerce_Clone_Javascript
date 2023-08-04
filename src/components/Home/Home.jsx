import { FilterTwoTone, ReloadOutlined } from '@ant-design/icons';
import {
  Form,
  Row,
  Col,
  Tabs,
  Checkbox,
  Divider,
  InputNumber,
  Button,
  Rate,
  Pagination,
} from 'antd';
import './home.scss';
import { callFetchCategory, callFetchListBook, callLogin } from '../../services/api';
import { useEffect, useState } from 'react';

const Home = () => {
  const [listCategory, setListCategory] = useState([]);
  const [form] = Form.useForm();

  const [listBook, setListBook] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [current, setCurrent] = useState(1); // lưu lại trạng thái table để biết chúng ta đang ở trang bao nhiêu
  const [pageSize, setPageSize] = useState(5); // pageSize mặc định cho nó là 2 nếu có lẻ 1 bản ghi thì sẽ thay thế pageSize === pagination.pageSize
  const [total, setTotal] = useState(0); // tham số này để biết được chúng ta cần có bao nhiêu trang
  const [filter, setFilter] = useState('');

  // Sắp xếp từ cái bán nhiều nhất
  const [sortQuery, setSortQuery] = useState('sort=-sold'); // Nếu mà '' thì nó sẽ lấy theo thứ tự tăng dần (từ A - Z)

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const dataCategory = res.data.map((item) => {
          return { label: item, value: item };
        });
        setListCategory(dataCategory);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchBook();
  }, [current, pageSize, filter, sortQuery]);

  const fetchBook = async () => {
    setIsLoading(true);

    let query = `current=${current}&pageSize=${pageSize}`;

    if (filter) {
      query += `&${filter}`;
    }

    if (sortQuery) {
      query += `&${sortQuery}`;
    }

    const res = await callFetchListBook(query);
    if (res && res.data) {
      setListBook(res.data.result);
      setTotal(res.data.meta.total);
    }

    console.log('Check listBook >>>>>', listBook);

    setIsLoading(false);
  };

  const handleChangeFilter = (changedValues, values) => {
    console.log('>>>> check handleChangeFilter', changedValues, values);
  };

  // Đúng ra thì chỉ cần điền vào params là current và pageSize thôi do chúng ta lười :v
  const handleOnChangePage = (pagination) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  const handleFinish = (values) => {
    const {} = values;
  };

  const handleChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: 'Phổ Biến',
      children: <></>,
    },
    {
      key: '2',
      label: 'Hàng Mới',
      children: <></>,
    },
    {
      key: '3',
      label: 'Giá Thấp Đến Cao',
      children: <></>,
    },
    {
      key: '4',
      label: 'Giá Cao Đến Thấp',
      children: <></>,
    },
  ];

  return (
    <div style={{ backgroundColor: '#efefef', padding: '20px 0' }}>
      <div className="homepage-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
        <Row gutter={[20, 20]}>
          <Col md={4} sm={0} xs={0}>
            <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: 5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  {' '}
                  <FilterTwoTone />
                  <span style={{ fontWeight: 500 }}> Bộc lọc tìm kiếm </span>
                </span>

                {/* Để reset cái filter chỉ cần form.resetFields() */}
                <ReloadOutlined title="Reset" onClick={() => form.resetFields()} />
              </div>
              <Divider />

              {/* Hàm onValuesChange giúp lưu được những thay đổi trong form */}
              <Form
                form={form}
                onFinish={handleFinish}
                onValuesChange={(changedValues, values) =>
                  handleChangeFilter(changedValues, values)
                }
              >
                {/* Danh  mục sản phẩm */}
                <Form.Item
                  name="category"
                  label="Danh mục sản phẩm"
                  labelCol={{ span: 24 }}
                >
                  <Checkbox.Group>
                    <Row>
                      {listCategory.map((item, index) => {
                        return (
                          <Col
                            key={`index-${index}`}
                            span={24}
                            style={{ padding: '7px 0' }}
                          >
                            <Checkbox value={item.value}>{item.label}</Checkbox>
                          </Col>
                        );
                      })}
                      {/* <Col span={24}>
                    <Checkbox value="A">A</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="B">B</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="C">C</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="D">D</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="E">E</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="F">F</Checkbox>
                  </Col> */}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>

                <Divider />

                {/* Khoảng giá */}
                <Form.Item label="Khoảng giá" labelCol={{ span: 24 }}>
                  <Row gutter={[10, 10]} style={{ width: '100%' }}>
                    <Col xl={11} md={24}>
                      <Form.Item name={['range', 'from']}>
                        <InputNumber
                          name="from"
                          min={0}
                          placeholder="đ TỪ"
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                    <Col xl={2} md={0}>
                      <div> - </div>
                    </Col>
                    <Col xl={11} md={24}>
                      <Form.Item name={['range', 'to']}>
                        <InputNumber
                          name="to"
                          min={0}
                          placeholder="đ ĐẾN"
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div>
                    <Button
                      onClick={() => form.submit()}
                      style={{ width: '100%', backgroundColor: '#1677ff' }}
                      type="primary"
                    >
                      Áp dụng
                    </Button>
                  </div>
                </Form.Item>

                <Divider />

                {/* Rating - đánh giá sản phẩm */}
                <Form.Item label="Đánh giá" labelCol={{ span: 24 }}>
                  <div>
                    <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                    <span className="ant-rate-text"></span>
                  </div>
                  <div>
                    <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                    <span className="ant-rate-text">trở lên</span>
                  </div>
                  <div>
                    <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                    <span className="ant-rate-text">trở lên</span>
                  </div>
                  <div>
                    <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                    <span className="ant-rate-text">trở lên</span>
                  </div>
                  <div>
                    <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                    <span className="ant-rate-text">trở lên</span>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>

          {/* Mặc định số cột trong antd là 24 */}
          {/* Cột sản phẩm chính  */}
          <Col md={20} xs={24}>
            <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: 5 }}>
              <Row>
                <Tabs
                  defaultActiveKey="sort=-sold"
                  items={items}
                  onChange={(value) => {
                    setSortQuery(value);
                  }}
                  style={{ overflowX: 'auto' }}
                />
              </Row>
              <Row className="customize-row">
                {listBook?.map((item, index) => {
                  return (
                    <div className="column" key={`book-${index}`}>
                      <div className="wrapper">
                        <div className="thumbnail">
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                              item.thumbnail
                            }`}
                            alt="thumbnail book"
                          />
                        </div>
                        <div className="text" title={item.mainText}>
                          {item.mainText}
                        </div>
                        <div className="price">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(item.price)}
                        </div>
                        <div className="rating">
                          <Rate
                            value={5}
                            disabled
                            style={{ color: '#ffce3d', fontSize: 10 }}
                          />
                          <span>Đã bán {item.sold}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Row>
              <Divider />

              {/* DefaultCurrent mặc định đang ở trang thứ 6 trên 50 trang */}
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  current={current}
                  total={total}
                  pageSize={pageSize}
                  responsive
                  // p: page, s: pageSize, 2 biến này thư viện cho sẵn, nó sẽ theo thứ tự p: page, s: pageSize
                  // biến current sẽ nhận giá trị của `p` và biến pageSize sẽ nhận giá trị của `s`
                  onChange={(p, s) => handleOnChangePage({ current: p, pageSize: s })}
                />
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
