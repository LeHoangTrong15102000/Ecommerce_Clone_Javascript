import React, { useState, useEffect } from 'react';
import {
  AppstoreOutlined,
  ExceptionOutlined,
  HeartTwoTone,
  TeamOutlined,
  UserOutlined,
  DollarCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, message, Avatar, theme } from 'antd';
import { Outlet, useNavigate, Link } from 'react-router-dom';

import './layout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { callLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';
import ManageAccount from '../../pages/User/ManageAccount/ManageAccount';

const { Content, Footer, Sider } = Layout;

const items = [
  {
    label: <Link to="/admin">Dashboard</Link>,
    key: 'dashboard',
    icon: <AppstoreOutlined />,
  },
  {
    label: (
      <Link to="/admin/user">
        <span>Manage Users</span>
      </Link>
    ),
    key: 'user',
    icon: <UserOutlined />,
    children: [
      {
        label: <Link to="/admin/user">CRUD</Link>,
        key: 'crud',
        icon: <TeamOutlined />,
      },
      { label: 'Files1', key: 'files', icon: <TeamOutlined /> },
    ],
  },
  {
    label: <Link to="/admin/book">Manage Books</Link>,
    key: 'book',
    icon: <ExceptionOutlined />,
  },
  {
    label: <Link to="/admin/order">Manage Orders</Link>,
    key: 'order',
    icon: <DollarCircleOutlined />,
  },
];

const LayoutAdmin = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const { user } = useSelector((state) => state.account);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res?.data) {
      dispatch(doLogoutAction());
      message.success('Đăng xuất thành công');
      navigate('/');
    }
  };

  useEffect(() => {
    items
      .map((item, index) => {
        return item.key;
      })
      .forEach((value) => {
        if (window.location.pathname.includes(`/${value}`)) {
          setActiveMenu(value);
        }
      });
  }, []);

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;

  // sử dụng createAsyncThunk để logout
  // const handleLogout = () => {
  //   dispatch(handleLogoutAction());
  //   message.success('Đăng xuất thành công');
  //   navigate('/');
  // };

  const itemsDropdown = [
    {
      label: (
        <label style={{ cursor: 'pointer' }}>
          <button onClick={() => setIsOpenModal(true)}>Quản lý tài khoản</button>
        </label>
      ),
      key: 'account',
    },
    {
      label: <Link to="/">Trang chủ</Link>,
      key: 'home',
    },
    {
      label: (
        <label style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: 'logout',
    },
  ];
  return (
    <>
      <Layout style={{ minHeight: '100vh' }} className="layout-admin">
        {/* Sider quản lí thông tin của ecommerce */}
        <Sider
          theme="dark"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div style={{ heigth: 32, margin: 16, textAlign: 'center', color: '#fff' }}>
            Admin
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={['/']}
            selectedKeys={[activeMenu]}
            mode="inline"
            items={items}
            onClick={(event) => setActiveMenu(event.key)}
          />
        </Sider>
        {/* Layout nội dung chính */}
        <Layout>
          <div className="admin-header">
            <span>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
            </span>
            <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
              <a onClick={(event) => event.preventDefault()}>
                <Space>
                  <Avatar src={urlAvatar} />
                  Welcome {user?.fullName}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <Content style={{ margin: '20px' }}>
            <Outlet />
          </Content>
          <Footer style={{ padding: 0 }}>
            React Test Fresher &copy; Hỏi Dân IT - Made with <HeartTwoTone />
          </Footer>
        </Layout>
      </Layout>

      <ManageAccount isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </>
  );
};

export default LayoutAdmin;
