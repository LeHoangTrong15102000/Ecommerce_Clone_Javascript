import { UploadOutlined, AntDesignOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Upload,
  message,
  notification,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callUpdateAvatar, callUpdateUserInfo } from '../../../services/api';
import {
  doUpdateUserInfoAction,
  doUploadAvatarAction,
} from '../../../redux/account/accountSlice';

const UserInfo = () => {
  const { user, tempAvatar } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const [userAvatar, setUserAvatar] = useState(user?.avatar ?? '');
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue('_id', user.id);
    form.setFieldValue('fullName', user.fullName);
    form.setFieldValue('email', user.email);
    form.setFieldValue('phone', user.phone);
  }, []);

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    tempAvatar || user?.avatar
  }`;

  const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
    const res = await callUpdateAvatar(file);
    console.log('>>>> Check res upload avatar', res);
    if (res && res.data) {
      const newAvatar = res.data.fileUploaded; // server trả về tên file
      dispatch(doUploadAvatarAction({ avatar: newAvatar }));
      setUserAvatar(newAvatar);
      onSuccess('ok');
    } else {
      onError('Đã có lỗi khi upload file!');
    }
  };

  const propsUpload = {
    maxCount: 1,
    multiple: false,
    showUploadList: false,
    customRequest: handleUploadAvatar,
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success('Upload file thành công');
      } else if (info.file.status === 'error') {
        message.error('Upload file thất bại');
      }
    },
  };

  const handleFinish = async (values) => {
    console.log('>>>> Check values form', values);
    const { fullName, phone, _id } = values;
    setIsSubmit(true);
    const res = await callUpdateUserInfo(_id, phone, fullName, userAvatar);

    if (res && res.data) {
      // update redux
      dispatch(doUpdateUserInfoAction({ avatar: userAvatar, phone, fullName }));
      message.success('Cập nhật thông tin thành công!');

      // force renew token
      localStorage.removeItem('access_token'); // server sẽ tạo lại access_token mới cho chúng ta
    } else {
      notification.error({
        message: 'Đã có lỗi xảy ra',
        description: res.message,
      });
    }

    setIsSubmit(false);
  };

  return (
    <div style={{ minHeight: 400 }}>
      <Row>
        {/* Avatar */}
        <Col
          sm={24}
          md={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Row gutter={[20, 20]}>
            <Col
              span={24}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Avatar
                size={{ xs: 40, sm: 64, md: 80, lg: 128, xl: 160, xxl: 180 }}
                icon={<AntDesignOutlined />}
                src={urlAvatar}
                shape="circle"
              />
            </Col>
            <Col
              span={24}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Upload {...propsUpload}>
                <Button icon={<UploadOutlined />}>Upload Avatar</Button>
              </Upload>
            </Col>
          </Row>
        </Col>

        {/* Form */}
        <Col sm={24} md={12}>
          <Form name="basic" onFinish={handleFinish} form={form} autoComplete="off">
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
              label="Email"
              name="email"
              // rules={[{ required: true, message: 'Email không dược để trống' }]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              label="Tên hiển thị"
              name="fullName"
              rules={[{ required: true, message: 'Tên người dùng không được để trống!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: 'Số điện thoại không được để trống' }]}
            >
              <Input />
            </Form.Item>

            <Button
              loading={isSubmit}
              onClick={() => {
                form.submit();
              }}
            >
              Cập nhật
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UserInfo;
