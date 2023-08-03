import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Divider, Form, Input, Modal, Row, Upload } from 'antd';
import { useEffect, useState } from 'react';

const BookModalUpdate = (props) => {
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;

  const [isSubmit, setSubmit] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [loadingSlider, setLoadingSlider] = useState(false);

  const [imageUrl, setImageUrl] = useState('');

  const [dataThumbnail, setDataThumbnail] = useState([]);
  const [dataSlider, setDataSlider] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const [initForm, setInitForm] = useState(null);

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  const handleFinish = async (values) => {};

  const getBase64 = () => {};

  const handleBeforeUpload = (file) => {};

  const handleChange = (file, type) => {};

  const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {};

  const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {};

  const handleRemoveFile = (file, type) => {};

  const handlePreview = async (file) => {};

  return (
    <>
      <Modal
        title="Cập nhật mới book"
        open={openModalUpdate}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
          setInitForm(null);
          setDataUpdate(null);
          setOpenModalUpdate(false);
        }}
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
                rules={[{ required: true, message: 'Vui lòng nhập tên tác giả!' }]}
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
                  addonAfter="VND"
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Thể loại"
                name="category"
                rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]}
              >
                <Select
                  defaultValue={null}
                  showSearch
                  allowClear
                  //  onChange={handleChange}
                  options={listCategory}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
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
              >
                <InputNumber min={0} defaultValue={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item labelCol={{ span: 24 }} label="Ảnh Thumbnail" name="thumbnail">
                <Upload
                  name="thumbnail"
                  listType="picture-card"
                  className="avatar-uploader"
                  maxCount={1}
                  multiple={false}
                  customRequest={handleUploadFileThumbnail}
                  beforeUpload={handleBeforeUpload}
                  onChange={handleChange}
                  onRemove={(file) => handleRemoveFile(file, 'thumbnail')}
                  onPreview={handlePreview}
                  defaultFileList={initForm?.thumbnail?.fileList ?? []}
                >
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
                  customRequest={handleUploadFileSlider}
                  beforeUpload={handleBeforeUpload}
                  // Biến info để lấy ra thông tin của file ảnh upload
                  onChange={(info) => handleChange(info, 'slider')}
                  onRemove={(file) => handleRemoveFile(file, 'slider')}
                  onPreview={handlePreview}
                  defaultFileList={initForm?.slider?.fileList ?? []}
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

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default BookModalUpdate;
