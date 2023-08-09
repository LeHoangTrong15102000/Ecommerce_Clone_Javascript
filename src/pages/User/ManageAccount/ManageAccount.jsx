import { Modal, Tabs } from 'antd';
import { useState } from 'react';
import ChangePassword from './../ChangePassword/ChangePassword';
import UserInfo from '../UserInfo';

const ManageAccount = (props) => {
  const { isOpenModal, setIsOpenModal } = props;
  const items = [
    {
      key: 'info',
      label: 'Cập nhật thông tin',
      children: <UserInfo />,
    },
    {
      key: 'change-password',
      label: 'Đổi mật khẩu',
      children: <ChangePassword />,
    },
  ];

  return (
    <Modal
      title="Quản lý tài khoản"
      open={isOpenModal}
      footer={null}
      onCancel={() => setIsOpenModal(false)}
      maskClosable={false}
      width={'45vw'}
    >
      <Tabs defaultActiveKey="info" items={items} />
    </Modal>
  );
};

export default ManageAccount;
