import { Col, Row, Table } from 'antd';
import { useState, useEffect } from 'react';
import InputSearch from './InputSearch';
import OrderViewDetail from './OrderViewDetail';
import { callFetchListOrder } from '../../../services/api';
import moment from 'moment';

const OrderTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [listOrder, setListOrder] = useState(null);

  const [current, setCurrent] = useState(1); // lưu lại trạng thái table để biết chúng ta đang ở trang bao nhiêu
  const [pageSize, setPageSize] = useState(5); // pageSize mặc định cho nó là 2 nếu có lẻ 1 bản ghi thì sẽ thay thế pageSize === pagination.pageSize
  const [total, setTotal] = useState(0); // tham số này để biết được chúng ta cần có bao nhiêu trang
  const [sortQuery, setSortQuery] = useState('sort=-updatedAt'); // Nếu mà '' thì nó sẽ lấy theo thứ tự tăng dần (từ A - Z)

  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [dataViewDetail, setDataViewDetail] = useState(null);

  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      render: (_, record) => {
        // recored dùng để lấy giá trị của user trên một row
        return (
          <a
            href="#"
            onClick={() => {
              setDataViewDetail(record); //  gán data cho dataViewDetail
              setOpenViewDetail(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      sorter: (a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      },
      render: (_, record) => {
        return (
          <>
            <span>
              {' '}
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(record?.totalPrice ?? 0)}{' '}
            </span>
          </>
        );
      },
    },

    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: true,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      sorter: true,
    },

    {
      title: 'Ngày cập nhật',
      dataIndex: 'createdAt ',
      sorter: true,
      render: (_, record) => {
        return (
          <>
            <span>{moment(record.createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    fetchOrder();
  }, [current, pageSize, filter, sortQuery]);

  const fetchOrder = async () => {
    setIsLoading(true);

    let query = `current=${current}&pageSize=${pageSize}`;

    if (filter) {
      query += `&${filter}`;
    }

    if (sortQuery) {
      query += `&${sortQuery}`;
    }

    const res = await callFetchListOrder(query);
    if (res && res.data) {
      setListOrder(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const renderHeader = () => {
    return (
      <>
        <span>Table List Order </span>
      </>
    );
  };

  const handleChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }

    if (sorter && sorter.field) {
      const q =
        sorter.order === 'ascend' ? `sort=${sorter.filed}` : `sort=-${sorter.field}`;
      setSortQuery(q); //  set lại giá trị cho sortQuery
    }
    // console.log('params', pagination, filters, sorter, extra);
  };

  const handleSearch = (query) => {
    setFilter(query);
  };
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch handleSearch={handleSearch} setFilter={setFilter} />
        </Col>

        <Col span={24}>
          <Table
            className="def"
            title={renderHeader}
            loading={isLoading}
            columns={columns}
            // Giá trị trong dataSource sẽ mapping với columns để hiển thị ra
            dataSource={listOrder}
            // Trong hàm onChange của Table có props Pagination, sorter, filter, extra
            onChange={handleChange}
            rowKey="_id"
            pagination={{
              current: current,
              pageSize: pageSize,
              showSizeChanger: true,
              total: total, // tổng số bản ghi,truyền vào để thz antd nó tính toán số trang dựa vào `pageSize và total`
              showTotal: (total, range) => {
                return (
                  <div>
                    {range[0]}-{range[1]} trên {total} rows
                  </div>
                );
              },
            }}
          />
        </Col>
      </Row>

      <OrderViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
    </>
  );
};

export default OrderTable;
