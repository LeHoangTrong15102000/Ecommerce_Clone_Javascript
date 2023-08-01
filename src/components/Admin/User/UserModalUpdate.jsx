import { Divider, Form, Input, Modal, message, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { callUpdateUser } from '../../../services/api';

const UserModalUpdate = (props) => {
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;

  const [isSubmit, setIsSubmit] = useState(false);
  // const [dataUpdate, setDataUpdate] = useState(null);

  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    const { _id, fullName, phone } = values;
    setIsSubmit(true);

    const res = await callUpdateUser(_id, fullName, phone);
    if (res && res.data) {
      message.success('Cập nhật user thành công!');
      setOpenModalUpdate(false);
      await props.fetchUser();
    } else {
      notification.error({
        message: 'Đã có lỗi xảy ra',
        description: res.message,
      });
    }

    setIsSubmit(false);
  };

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  return (
    <>
      <Modal
        title="Cập nhật thông tin người dùng"
        open={openModalUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setOpenModalUpdate(false);
          setDataUpdate(null);
        }}
        okText={'Cập nhật'}
        cancelText={'Hủy'}
        confirmLoading={isSubmit}
        maskClosable={false}
      >
        <Divider />

        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={handleFinish}
          // autoComplete là nó tự động validate
          autoComplete="off"
          // Khi  mà dùng thuộc tính này khi mà mở người dùng mới thì data sẽ không được câp nhật
          // initialValues={dataUpdate}
        >
          <Form.Item
            hidden
            labelCol={{ span: 24 }}
            label="_id"
            name="_id"
            rules={[{ required: true, message: 'Vui lòng nhập Id!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Tên hiển thị"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserModalUpdate;
