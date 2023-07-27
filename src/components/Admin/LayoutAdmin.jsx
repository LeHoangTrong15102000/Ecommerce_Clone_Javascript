import React, { useState } from 'react';
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
import { Layout, Menu, Dropdown, Space, message } from 'antd';
import { Outlet, useNavigate, Link } from 'react-router-dom';

import './layout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { callLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/account/accountSlice';

const { Content, Footer, Sider } = Layout;

const items = [
  {
    label: <Link to="/admin">Dashboard</Link>,
    key: 'dashboard',
    icon: <AppstoreOutlined />,
  },
  {
    label: <span>Manage Users</span>,
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
    lalel: <Link to="/admin/order">Manage Orders</Link>,
    key: 'order',
    icon: <DollarCircleOutlined />,
  },
];

const LayoutAdmin = () => {
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

  // sử dụng createAsyncThunk để logout
  // const handleLogout = () => {
  //   dispatch(handleLogoutAction());
  //   message.success('Đăng xuất thành công');
  //   navigate('/');
  // };

  const itemsDropdown = [
    {
      label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
      key: 'account',
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
    <Layout style={{ minHeight: '100vh' }} className="layout-admin">
      {/* Sider quản lí thông tin của ecommerce */}
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div style={{ heigth: 32, margin: 16, textAlign: 'center' }}>Admin</div>
        <Menu
          defaultSelectedKeys={[activeMenu]}
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
  );
};

export default LayoutAdmin;
