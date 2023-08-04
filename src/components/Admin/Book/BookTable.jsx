import { Button, Col, Form, Popconfirm, Row, Table, message, notification } from 'antd';
// import InputSearch from '../../InputSearch/InputSearch';
import { useEffect, useState } from 'react';
import BookModalCreate from './BookModalCreate';
import BookModalUpdate from './BookModalUpdate';
import BookViewDetail from './BookViewDetail';
import {
  CloudUploadOutlined,
  DeleteTwoTone,
  EditTwoTone,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { callDeleteBook, callFetchListBook } from '../../../services/api';
import moment from 'moment';
import InputSearch from './InputSearch';
import * as XLSX from 'xlsx';
import omit from 'lodash/omit';

const BookTable = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [listBook, setListBook] = useState(null);

  const [current, setCurrent] = useState(1); // lưu lại trạng thái table để biết chúng ta đang ở trang bao nhiêu
  const [pageSize, setPageSize] = useState(5); // pageSize mặc định cho nó là 2 nếu có lẻ 1 bản ghi thì sẽ thay thế pageSize === pagination.pageSize
  const [total, setTotal] = useState(0); // tham số này để biết được chúng ta cần có bao nhiêu trang
  const [filter, setFilter] = useState('');

  const [sortQuery, setSortQuery] = useState('sort=-updatedAt'); // Nếu mà '' thì nó sẽ lấy theo thứ tự tăng dần (từ A - Z)

  const [dataViewDetail, setDataViewDetail] = useState(null);
  const [openViewDetail, setOpenViewDetail] = useState(false);

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const [dataUpdate, setDataUpdate] = useState(null);

  // const bookObject = {
  //   field_1: 'mainText',
  //   field_2: 'author',
  //   field_3: 'category',
  // };

  // const bookLabel = {
  //   field_1: 'Tên sách',
  //   field_2: 'Tác giả',
  //   field_3: 'Thể loại',
  // };

  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      render: (text, record, index) => {
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
      title: 'Tên sách',
      dataIndex: 'mainText',
      sorter: true,
    },
    {
      title: 'Thể loại',
      dataIndex: 'category',
      sorter: true,
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      sorter: true,
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      sorter: true,
      render: (text, record, index) => {
        return (
          <>
            <span>
              {' '}
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(record?.price ?? 0)}{' '}
            </span>
          </>
        );
      },
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'createdAt ',
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
        return (
          <>
            <Popconfirm
              placement="leftTop"
              title={'Xác nhận xóa user'}
              description={'Bạn có chắc muốn xóa user này'}
              onConfirm={() => handleDeleteBook(record._id)}
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

    setIsLoading(false);
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

  const renderHeader = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Table List Books</span>
        <span style={{ display: 'flex', gap: 15 }}>
          <Button
            style={{ backgroundColor: '#1677ff' }}
            icon={<ExportOutlined />}
            type="primary"
            onClick={() => handleExportBook()}
          >
            Export
          </Button>

          {/* <Button
            style={{ backgroundColor: '#1677ff' }}
            icon={<CloudUploadOutlined />}
            type="primary"
            onClick={() => setOpenModalImport(true)}
          >
            Import
          </Button> */}

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

  const handleDeleteBook = async (bookId) => {
    const res = await callDeleteBook(bookId);
    if (res && res.data) {
      message.success('Xóa book thành công!');
      fetchBook();
    } else {
      notification.error({
        message: 'Có lỗi xảy ra',
        description: res.message,
      });
    }
  };

  const handleSearch = (query) => {
    setFilter(query);
  };

  // Fix bỏ 2 trường thumbnail và slider ra khỏi
  const handleExportBook = () => {
    if (listBook.length > 0) {
      // Dùng lodash bỏ ra 2 trường
      const newListBook = listBook.map((item) => omit(item, ['thumbnail', 'slider']));
      const worksheet = XLSX.utils.json_to_sheet(newListBook); // chuyển từ json sang sheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); // đặt tên sheet và thêm sheet đó vào book_append_sheet
      XLSX.writeFile(workbook, 'ExportBook.csv'); // Sau đó viết ra file sheet
    }
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
            dataSource={listBook}
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

      <BookViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />

      <BookModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchBook={fetchBook}
      />

      <BookModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetchBook={fetchBook}
      />
    </>
  );
};

export default BookTable;
