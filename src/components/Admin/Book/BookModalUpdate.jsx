import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
  message,
  notification,
} from 'antd';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  callFetchCategory,
  callUpdateBook,
  callUploadBookImg,
} from './../../../services/api';

const BookModalUpdate = (props) => {
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;

  const [isSubmit, setIsSubmit] = useState(false);
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

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const dataCategory = res.data.map((item) => {
          return { label: item, value: item };
        });
        setListCategory(dataCategory);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    // Nên check trước nếu có dữ liệu thì hã nên thực hiện tiếp
    if (dataUpdate?._id) {
      // Nếu có _id thì lấy ra arrThumbnail và arrSlider
      const arrThumbnail = [
        {
          uid: uuidv4(),
          name: dataUpdate.thumbnail,
          status: 'done',
          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`,
        },
      ];

      const arrSlider = dataUpdate?.slider?.map((item) => {
        return {
          uid: uuidv4(),
          name: item,
          status: 'done',
          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        };
      });

      // Tạo giá trị khởi tạo để hiển thị lên Form
      const init = {
        _id: dataUpdate._id,
        mainText: dataUpdate.mainText,
        author: dataUpdate.author,
        price: dataUpdate.price,
        category: dataUpdate.category,
        quantity: dataUpdate.quantity,
        sold: dataUpdate.sold,
        thumbnail: { fileList: arrThumbnail }, // Chúng ta cần mòi lại data cho nó
        slider: { fileList: arrSlider },
      };
      // Mục đích đưa thông tin vào state React để mỗi lần thông tin quyển sách hoặc tấm ảnh thay đổi thì cái Form sẽ render lại
      setInitForm(init);
      setDataThumbnail(arrThumbnail);
      setDataSlider(arrSlider);
      //  Lấy dataUpdate truyền vào các trường trong form
      form.setFieldsValue(init); // Về phần Form chỉ cần set data như này là nó sẽ ăn
    }

    // clean up
    // Nên thêm cleanup để mỗi lần đóng Form thì dữ liệu trên Modal đó sẽ bị xóa
    return () => {
      form.resetFields();
    };
  }, [dataUpdate]);

  const handleFinish = async (values) => {
    if (dataThumbnail.length === 0) {
      notification.error({
        message: 'Lỗi validate',
        description: 'Vui lòng upload ảnh thumbnail',
      });
      return;
    }

    if (dataSlider.length === 0) {
      notification.error({
        message: 'Lỗi validate',
        description: 'Vui lòng upload ảnh slider',
      });
      return;
    }

    const { _id, mainText, author, price, sold, quantity, category } = values;
    const thumbnail = dataThumbnail[0].name;
    const slider = dataSlider.map((item) => item.name);

    setIsSubmit(true);
    const res = await callUpdateBook(_id, {
      thumbnail,
      slider,
      mainText,
      author,
      price,
      sold,
      quantity,
      category,
    });

    if (res && res.data) {
      message.success('Cập nhật sách thành công!');
      form.resetFields();
      setDataThumbnail([]);
      setDataSlider([]);
      setOpenModalUpdate(false);
      props.fetchBook();
    } else {
      notification.error({
        message: 'Đã có lỗi xảy ra',
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleBeforeUpload = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/webp' ||
      file.type === 'image/gif';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  // info lấy ra thông của file upload
  const handleChange = (info, type) => {
    if (info.file.status === 'uploading') {
      type ? setLoadingSlider(true) : setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        type ? setLoadingSlider(false) : setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const handleUploadFileThumbnail = async ({ file, onSuccess, onError }) => {
    const res = await callUploadBookImg(file);
    if (res && res.data) {
      setDataThumbnail([
        {
          name: res.data.fileUploaded,
          uid: file.uid,
        },
      ]);
      onSuccess('ok');
    } else {
      onError('Đã có lỗi khi upload file');
    }
  };

  const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
    const res = await callUploadBookImg(file);
    if (res && res.data) {
      //copy previous state => upload multiple images
      setDataSlider((dataSlider) => [
        ...dataSlider,
        {
          name: res.data.fileUploaded,
          uid: file.uid,
        },
      ]);
      onSuccess('ok');
    } else {
      onError('Đã có lỗi khi upload file');
    }
  };

  const handleRemoveFile = (file, type) => {
    if (type === 'thumbnail') {
      setDataThumbnail([]);
    }
    if (type === 'slider') {
      const newSlider = dataSlider.filter((itemFile) => itemFile.uid !== file.uid);
      setDataSlider(newSlider);
    }
  };

  const handlePreview = async (file) => {
    // Nếu đã convert qua base64 rồi thì biến file sẽ không có thuộc tính `originFileObj`
    if (file.url && !file.originFileObj) {
      setPreviewImage(file.url);
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
      return;
    }

    // Còn nếu ảnh chưa upload thì nó sẽ có thuộc tính `originFileObj`
    getBase64(file.originFileObj, (url) => {
      // Khi get base64 thì nõ sẽ trả về cái `url` sau đó chúng ta mới có thể preview được ảnh
      setPreviewImage(url);
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    });
  };

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
        okText={'Cập nhật'}
        cancelText={'Hủy'}
        confirmLoading={isSubmit}
        width={'50vw'}
        maskClosable={false}
      >
        <Divider />

        <Form form={form} name="basic" onFinish={handleFinish} autoComplete="off">
          <Row gutter={15}>
            <Col hidden>
              <Form.Item hidden labelCol={{ span: 24 }} label="Tên sách" name="_id">
                <Input />
              </Form.Item>
            </Col>

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
                  // Phải ghi đè ở đây thì nó mới hiển thị hình ảnh ra cho chúng ta được
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
