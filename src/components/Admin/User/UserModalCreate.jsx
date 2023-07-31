import { Divider, Form, Input, Modal, message, notification } from 'antd';
import { callCreateAUser } from '../../../services/api';
import { useState } from 'react';

const UserModalCreate = (props) => {
  const { openModalCreate, setOpenModalCreate, fetchUser } = props;
  const [isSubmit, setIsSubmit] = useState(false);

  // Cái này là destrutering từ một cái array(của hook useForm) ra
  const [form] = Form.useForm(); // dùng cái hook của Form để giúp chúng ta có thể thao tác với Form trong Modal

  const handleFinish = async (values) => {
    const { fullName, password, email, phone } = values;
    setIsSubmit(true);

    const res = await callCreateAUser(fullName, password, email, phone);
    if (res && res.data) {
      message.success('Tạo mới user thành công');
      form.resetFields();
      setOpenModalCreate(false);
      await props.fetchUser();
    } else {
      notification.error({
        message: 'Đã có lỗi xảy ra',
        description: res.message,
      });
    }

    setIsSubmit(false);
  };

  return (
    <>
      <Modal
        title="Thêm mới người dùng"
        open={openModalCreate}
        onOk={() => {
          // Dùng form.submit() bên trong thằng Modal để có thể submit được cái form của chúng ta
          form.submit();
        }}
        onCancel={() => setOpenModalCreate(false)}
        okText={'Tạo mới'}
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
          autoComplete="off"
        >
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
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email không được để trống!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Số diện thoại"
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

export default UserModalCreate;
