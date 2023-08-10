import { Button, Col, Form, Input, Row, message, notification } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callUpdatePassword } from '../../../services/api';

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const handleFinish = async (values) => {
    const { email, oldpass, newpass } = values;
    setIsSubmit(true);

    const res = await callUpdatePassword(email, oldpass, newpass);
    if (res && res.data) {
      message.success('Cập nhật mật khẩu thành công');
      form.setFieldValue('oldpass', '');
      form.setFieldValue('newpass', '');
    } else {
      notification.error({
        message: 'Đã có lỗi xảy ra',
        description: res.message,
      });
    }

    setIsSubmit(false);
  };

  return (
    <Row>
      <Col
        sm={24}
        md={12}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Form
              name="basic"
              onFinish={handleFinish}
              form={form}
              autoComplete="off"
              initialValues={{
                email: user?.email,
              }}
            >
              <Form.Item
                labelCol={{ span: 24 }}
                label="Email"
                name="email"
                // rules={[{ required: true, message: 'Email không được để trống!' }]}
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="Mật khẩu hiện tại"
                name="oldpass"
                rules={[
                  { required: true, message: 'Mật khẩu hiện tại không được để trống' },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="Mật khẩu mới"
                name="newpass"
                rules={[{ required: true, message: 'Mật khẩu mới không được để trống' }]}
              >
                <Input.Password />
              </Form.Item>

              <Button
                htmlType="submit"
                type="primary"
                loading={isSubmit}
                onClick={() => {
                  form.submit();
                }}
                style={{ backgroundColor: '#1677ff' }}
              >
                Xác nhận
              </Button>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ChangePassword;
