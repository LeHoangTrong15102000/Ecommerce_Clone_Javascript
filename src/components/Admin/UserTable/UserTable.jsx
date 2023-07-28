import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'antd';
import InputSearch from './InputSearch';
import { callFetchListUser } from '../../../services/api';

// https://stackblitz.com/run?file=demo.tsx
const UserTable = () => {
  // Các biến hứng data hiển thị ra ngoài giao diện
  const [listUser, setListUser] = useState([]); // là danh sách chúng ta sẽ hiển thị ra bên ngoài giao diện
  const [current, setCurrent] = useState(1); // lưu lại trạng thái table để biết chúng ta đang ở trang bao nhiêu
  const [pageSize, setPageSize] = useState(5); // pageSize mặc định cho nó là 2 nếu có lẻ 1 bản ghi thì sẽ thay thế pageSize === pagination.pageSize
  const [total, setTotal] = useState(0); // tham số này để biết được chúng ta cần có bao nhiêu trang

  // Khi mà current và pageSize thay đổi thì useEffect() sẽ chạy lại
  useEffect(() => {
    fetchUser();
  }, [current, pageSize]);

  const fetchUser = async () => {
    const query = `current=${current}&pageSize=${pageSize}`;
    const res = await callFetchListUser(query);

    if (res && res.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  // Thực hiện gọi Api phân trang

  const columns = [
    {
      title: 'Id',
      dataIndex: '_id', // dataIndex này nó sẽ mapping tới thông tin user bên dưới database
    },
    {
      title: 'Tên hiển thị',
      dataIndex: 'fullName',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      sorter: true,
    },
    {
      title: 'Action',
      render: (text, record, index) => {
        // để biết text record index là gì thì clg là chúng ta se biết được
        return (
          <>
            {/* ReactNode nôm na là những div html */}
            <button>Delete</button>
          </>
        );
      },
    },
  ];

  let data = [
    {
      key: '1',
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: '2',
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: '3',
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: '4',
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];

  // Dùng hàm concat() để merge Array
  // data = data.concat(data).concat(data).concat(data).concat(data);
  // data = data.concat(data);

  // Xử lý handleChange để mỗi lần pagination thì nó sẽ chuyển page
  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      // setCurrent(1);
    }
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch />
        </Col>
        <Col span={24}>
          <Table
            className="def"
            columns={columns}
            dataSource={listUser}
            onChange={onChange}
            rowKey="_id"
            pagination={{
              current: current,
              pageSize: pageSize,
              showSizeChanger: true,
              total: total, // tổng số bản ghi,truyền vào để thz antd nó tính toán số trang dựa vào `pageSize và total`
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default UserTable;
