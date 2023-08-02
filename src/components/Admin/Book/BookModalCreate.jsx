import { Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import Loading from './../../Loading/index';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const BookModalCreate = (props) => {
  const { openModalCreate, setOpenModalCreate } = props;

  const [isSubmit, setIsSubmit] = useState(false);

  const [listCategory, setListCategory] = useState([]);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [loadingSlider, setLoadingSlider] = useState(false);

  const [imageUrl, setImgageUrl] = useState('');

  useEffect(() => {}, []);

  const handleFinish = async (values) => {};

  const getBase64 = (img, callback) => {};

  const handleBeforeUpload = () => {};

  const handleChange = () => {};

  const handleUploadFile = () => {};

  return (
    <>
      <Modal
        title="Thêm mới book"
        open={openModalCreate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setOpenModalCreate(false)}
        okText={'Tạo mới'}
        cancelText={'Hủy'}
        confirmLoading={isSubmit}
        width={'50vw'}
        maskClosable={false}
      >
        <Divider />

        <Form form={form} name="basic" onFinish={handleFinish} autoComplete="off">
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên sách"
                name="mainText"
                rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị!' }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tác giả"
                name="author"
                rules={[{ required: true, message: 'Vùi lòng nhập tác giả!' }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Giá tiền"
                name="price"
                rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  addonAfter="VNĐ"
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                labelCol={{ span: 6 }}
                label="Thể loại"
                name="category"
                rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]}
              >
                <Select
                  defaultValue={null}
                  showSearch
                  allowClear
                  // onChange={handleChange}
                  options={listCategory}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Đã bán"
                name="sold"
                rules={[{ required: true, message: 'Vui lòng nhập số lượng đã bán!' }]}
                initialValue={0}
              >
                <InputNumber min={0} defaultValue={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item labelCol={{ span: 24 }} label="Ảnh Thumbnail" name="thumbnail">
                <Upload>
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item labelCol={{ span: 24 }} label="Ảnh Slider" name="slider">
                <Upload
                  multiple
                  name="slider"
                  listType="picture-card"
                  className="avatar-uploader"
                  customRequest={handleUploadFile}
                  beforeUpload={handleBeforeUpload}
                  onChange={(info) => handleChange(info, 'slider')}
                >
                  <div>
                    {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default BookModalCreate;
