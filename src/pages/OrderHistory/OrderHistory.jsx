import { Col, Layout, Row, Spin, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { callOrderHistory } from '../../services/api';
import moment from 'moment';
import ReactJson from 'react-json-view';

const OrderHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataOrderHistory, setDataOrderHistory] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetchOrderHistory();
    }, 300);
  }, []);

  const fetchOrderHistory = async () => {
    setIsLoading(true);
    const res = await callOrderHistory();
    if (res && res.data) {
      setTimeout(() => {
        setDataOrderHistory(res.data); // Trả về mảng các đơn hàng đã mua
      }, 500);
    }

    setIsLoading(false);
  };

  const columns = [
    {
      title: 'STT',
      width: 200,
      // phải thêm render vào để có thể thao tác được tới id của user
      render: (text, record, index) => {
        // recored dùng để lấy giá trị của user trên một row
        return (
          <>
            <span>{index + 1}</span>
          </>
        );
      },
    },
    {
      title: 'Thời gian',
      width: 300,
      dataIndex: 'createdAt',
      render: (text, record, index) => {
        return (
          <>
            <span>{moment(record.createdAt).format('DD-MM-YYYY HH:mm:ss')}</span>
          </>
        );
      },
    },
    {
      title: 'Tổng số tiền',
      width: 400,
      dataIndex: 'totalPrice',
      render: (text, record, index) => {
        return (
          <>
            <span>
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(record?.totalPrice ?? 0)}
            </span>
          </>
        );
      },
    },
    {
      title: 'Trạng thái',
      width: 200,
      render: (text, record, index) => {
        return (
          <>
            <Tag color="green">Thành công</Tag>
          </>
        );
      },
    },
    {
      title: 'Chi tiết',
      width: 700,
      render: (_, record) => {
        return (
          <>
            <ReactJson
              src={record}
              theme="dark"
              name="Chi tiết đơn mua"
              enableClipboard={false}
              displayDataTypes={false}
              displayObjectSize={false}
              collapsed={true}
            />
          </>
        );
      },
    },
  ];

  return (
    <Spin spinning={isLoading} tip="Loading...">
      <Row
        gutter={[20, 20]}
        style={{
          width: '80%',
          margin: '0 auto',
          boxShadow: '0px 8px 10px 0px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Col span={24} style={{ padding: 0 }}>
          <Table
            className="def"
            title={() => {
              return (
                <>
                  <span>Lịch sử đặt hàng: </span>
                </>
              );
            }}
            loading={isLoading}
            columns={columns}
            dataSource={dataOrderHistory}
            rowKey="_id"
            pagination={false}
          />
        </Col>
      </Row>
    </Spin>
  );
};

export default OrderHistory;
