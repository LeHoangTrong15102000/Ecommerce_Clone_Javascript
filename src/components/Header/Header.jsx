import React, { useState } from 'react';
import { FaReact } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { VscSearchFuzzy } from 'react-icons/vsc';
import { Divider, Badge, Drawer, message, Dropdown, Space, Avatar, Popover } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router';
import { callLogout } from '../../services/api';
import './header.scss';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { Link } from 'react-router-dom';

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  // console.log('Check user >>>>', user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { carts } = useSelector((state) => state.order);

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(doLogoutAction());
      message.success('Đăng xuất thành công');
      navigate('/');
    }
  };

  const hanndleLoginAction = async () => {};

  let items = [
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

  if (user && user?.role === 'ADMIN') {
    items.unshift({
      label: <Link to="/admin">Trang quản trị</Link>,
      key: 'admin',
    });
  }

  const contentPopover = () => {
    return (
      <div className="pop-cart-body">
        <div className="pop-cart-content">
          {carts?.map((item, index) => {
            return (
              <div className="book" key={`book-${index}`}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                    item.detail.thumbnail
                  }`}
                />
                <div className="main-text">{item?.detail?.mainText}</div>
                <div className="price">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(item.detail.price ?? 0)}
                </div>
              </div>
            );
          })}
          <div className="book">
            <img src="https://picsum.photos/id/1015/250/150/" />
            <div>Đại việt Sử ký Toàn Thư Trọn bộ</div>
            <div>1555.555 đ</div>
          </div>
          <div className="book">
            <img src="https://picsum.photos/id/1015/250/150/" />
            <div>Đại việt Sử ký Toàn Thư Trọn bộ</div>
            <div>1555.555 đ</div>
          </div>
        </div>
        <div className="pop-cart-footer">
          <button>Xem giỏ hàng</button>
        </div>
      </div>
    );
  };

  // lấy ra cái avatar cho người dùng
  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;

  return (
    <>
      <div className="header-container">
        <header className="page-header">
          <div className="page-header__top">
            <div
              className="page-header__toggle"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              ☰
            </div>
            <div className="page-header__logo">
              <span className="logo">
                <Link to="/" style={{ display: 'flex', justifyContent: 'center' }}>
                  {' '}
                  <FaReact className="rotate icon-react" />
                  <span>Hỏi Dân IT</span>
                </Link>

                <VscSearchFuzzy
                  className="icon-search"
                  style={{ left: 30, top: 20, marginLeft: 10 }}
                />
              </span>
              <input
                className="input-search"
                type={'text'}
                placeholder="Bạn tìm gì hôm nay"
              />
            </div>
          </div>
          <nav className="page-header__bottom">
            <ul id="navigation" className="navigation">
              <li className="navigation__item">
                <Popover
                  className="popover-carts"
                  placement="topRight"
                  rootClassName="popover-carts"
                  title={'Sản phẩm mới thêm'}
                  content={contentPopover}
                  arrow={true}
                >
                  <Badge count={carts?.length ?? 0} size={'small'} showZero>
                    <FiShoppingCart className="icon-cart" />
                  </Badge>
                </Popover>
              </li>
              <li className="navigation__item mobile">
                <Divider type="vertical" />
              </li>
              <li className="navigation__item mobile">
                {!isAuthenticated ? (
                  <span onClick={() => navigate('/login')}> Tài Khoản</span>
                ) : (
                  <Dropdown menu={{ items }} trigger={['click']}>
                    <Space>
                      <Avatar src={urlAvatar} />
                      {user?.fullName}
                      {/* <DownOutlined /> */}
                    </Space>
                  </Dropdown>
                )}
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <Drawer
        title="Menu chức năng"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <p>Quản lý tài khoản</p>
        <Divider />

        <p>Đăng xuất</p>
        <Divider />
      </Drawer>
    </>
  );
};

export default Header;
