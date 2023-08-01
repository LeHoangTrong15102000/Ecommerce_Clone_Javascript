import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Popconfirm, notification, message, Button } from 'antd';
// import InputSearch from './InputSearch';
import InputSearch from '../../InputSearch/InputSearch';
import { callDeleteUser, callFetchListUser } from '../../../services/api';
import {
  CloudUploadOutlined,
  DeleteTwoTone,
  EditTwoTone,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import UserModalCreate from './UserModalCreate';
import UserViewDetail from './UserViewDetail';
import moment from 'moment';
import UserImport from './data/UserImport';
import * as XLSX from 'xlsx';
import UserModalUpdate from './UserModalUpdate';

// https://stackblitz.com/run?file=demo.tsx
const UserTable = () => {
  // Các biến hứng data hiển thị ra ngoài giao diện
  const [listUser, setListUser] = useState([]); // là danh sách chúng ta sẽ hiển thị ra bên ngoài giao diện
  const [current, setCurrent] = useState(1); // lưu lại trạng thái table để biết chúng ta đang ở trang bao nhiêu
  const [pageSize, setPageSize] = useState(5); // pageSize mặc định cho nó là 2 nếu có lẻ 1 bản ghi thì sẽ thay thế pageSize === pagination.pageSize
  const [total, setTotal] = useState(0); // tham số này để biết được chúng ta cần có bao nhiêu trang

  const [isLoading, setIsLoading] = useState(false);

  // Thằng này nên quản lí bằng state của react là hợp lí
  const [filter, setFilter] = useState(''); // khi mà thay đổi cũng chạy lại cái fetchUser -> tạo riêng để quản lý filterSearch
  const [sortQuery, setSortQuery] = useState(''); // Để quản lí sortQuery

  const [dataViewDetail, setDataViewDetail] = useState(null);
  const [openViewDetail, setOpenViewDetail] = useState(false);

  const [openModalCreate, setOpenModalCreate] = useState(false);

  const [openModalImport, setOpenModalImport] = useState(false);

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const userObject = {
    field_1: 'fullName',
    field_2: 'email',
    field_3: 'phone',
  };

  const userLabel = {
    field_1: 'Name',
    field_2: 'Email',
    field_3: 'Số điện thoại',
  };

  // Khi mà current và pageSize thay đổi thì useEffect() sẽ chạy lại
  useEffect(() => {
    fetchUser();
  }, [current, pageSize, filter, sortQuery]);

  // Không cần dùng searchFitler nữa
  const fetchUser = async () => {
    setIsLoading(true);

    let query = `current=${current}&pageSize=${pageSize}`; // mặc đinh

    if (filter) {
      query += `&${filter}`;
    }

    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await callFetchListUser(query); // dưới BE xử lý hết các query này cho chúng ta rồi

    if (res && res.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }

    setIsLoading(false);
  };

  // Thực hiện gọi Api phân trang

  const columns = [
    {
      title: 'Id',
      dataIndex: '_id', // dataIndex này nó sẽ mapping tới thông tin user bên dưới database
      // phải thêm render vào để có thể thao tác được tới id của user
      render: (text, record, index) => {
        // recored dùng để lấy giá trị của user trên một row
        return (
          <a
            href="#"
            onClick={() => {
              setDataViewDetail(record);
              setOpenViewDetail(true);
            }}
          >
            {record._id}
          </a>
        );
      },
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
      title: 'Ngày cập nhật',
      dataIndex: 'createdAt',
      sorter: true,
      render: (text, record, index) => {
        return (
          <>
            <span>{moment(record.createdAt).format('DD/MM/YYYY HH:mm:ss')}</span>
          </>
        );
      },
    },
    {
      title: 'Action',
      width: 150,
      render: (text, record, index) => {
        // để biết text record index là gì thì clg là chúng ta se biết được
        return (
          <>
            <Popconfirm
              placement="leftTop"
              title={'Xác nhận xóa user'}
              description={'Bạn có chắc muốn xóa user này'}
              onConfirm={() => handleDeleteUser(record._id)}
              okText={'Xác nhận'}
              cancelText="Hủy"
            >
              <span style={{ cursor: 'pointer', margin: '0 20px' }}>
                <DeleteTwoTone twoToneColor="#ff4d4f" />
              </span>
            </Popconfirm>

            {/* Hiển thị Update user */}
            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setOpenModalUpdate(true);
                // Nó sẽ lấy thông tin của người dùng đó gán vào dataUpdate
                setDataUpdate(record);
              }}
            />
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
      setCurrent(1);
    }

    if (sorter && sorter.field) {
      const q =
        sorter.order === 'ascend' ? `sort=${sorter.filed}` : `sort=-${sorter.field}`;
      setSortQuery(q); //  set lại giá trị cho sortQuery
    }
    // console.log('params', pagination, filters, sorter, extra);
  };

  const handleDeleteUser = async (userId) => {
    const res = await callDeleteUser(userId);
    if (res && res.data) {
      message.success('Xóa user thành công');
      fetchUser(); // sau khi xóa thành công thì fetch lại danh sách User
    } else {
      notification.error({
        message: 'Có lỗi xảy ra',
        description: res.message,
      });
    }
  };

  // Viết component hiển thị header cho phần table
  const renderHeader = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span className="">Table List Users</span>
        <span style={{ display: 'flex', gap: 15 }}>
          <Button
            style={{ backgroundColor: '#1677ff' }}
            icon={<ExportOutlined />}
            type="primary"
            onClick={() => handleExportUser()}
          >
            Export
          </Button>

          <Button
            style={{ backgroundColor: '#1677ff' }}
            icon={<CloudUploadOutlined />}
            type="primary"
            onClick={() => setOpenModalImport(true)}
          >
            Import
          </Button>

          <Button
            style={{ backgroundColor: '#1677ff' }}
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setOpenModalCreate(true)}
          >
            Thêm mới
          </Button>
          <Button
            type="ghost"
            onClick={() => {
              setFilter('');
              setSortQuery('');
            }}
          >
            <ReloadOutlined />
          </Button>
        </span>
      </div>
    );
  };

  // Hàm handle Search
  const handleSearch = (query) => {
    setFilter(query);
  };

  // Func Export User
  const handleExportUser = () => {
    if (listUser.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listUser); // chuyển từ json sang sheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); // đặt tên sheet và thêm sheet đó vào book_append_sheet
      XLSX.writeFile(workbook, 'ExportUser.csv'); // Sau đó viết ra file sheet
    }
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch
            handleSearch={handleSearch}
            setFilter={setFilter}
            nameObject={userObject}
            labelObject={userLabel}
          />
        </Col>

        <Col span={24}>
          <Table
            className="def"
            title={renderHeader}
            loading={isLoading}
            columns={columns}
            dataSource={listUser}
            onChange={onChange}
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

      <UserModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchUser={fetchUser}
      />

      <UserViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />

      <UserImport
        openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
        fetchUser={fetchUser}
      />

      <UserModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetchUser={fetchUser}
      />
    </>
  );
};

export default UserTable;
