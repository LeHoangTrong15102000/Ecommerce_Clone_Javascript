import { Badge, Descriptions, Divider, Drawer, Modal, Upload } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FORMAT_DATE_DISPLAY } from '../../../utils/constant';
import { v4 as uuidv4 } from 'uuid';

const BookViewDetail = (props) => {
  const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

  const handleClose = () => {
    setOpenViewDetail(false);
    setDataViewDetail(null); // close thì dataViewDetail là null, để mỗi lần mở lên useEffect sẽ chạy lại
  };

  // Dùng base64 để hiển thị hình ảnh lên Modal
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (dataViewDetail) {
      let imgThumbnail = {},
        imgSlider = [];

      if (dataViewDetail.thumbnail) {
        imgThumbnail = {
          uid: uuidv4(),
          name: dataViewDetail.thumbnail,
          status: 'done',
          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
            dataViewDetail.thumbnail
          }`,
        };
      }
      if (dataViewDetail.slider && dataViewDetail.slider.length > 0) {
        dataViewDetail.slider.map((item) => {
          imgSlider.push({
            uid: uuidv4(),
            name: item, // item trong slider chính là tên bước ảnh
            status: 'done',
            url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
          });
        });
      }

      // merge imgThumbnail và imgSlider vào một Arr
      setFileList([imgThumbnail, ...imgSlider]); // cuối cùng đẩy imgThumbnail vào để quản lí ảnh trong một array
    }

    // Phải cho dependencies vào để img Array nó thay đổi
  }, [dataViewDetail]);

  const handleCancel = () => setPreviewOpen(false);

  // Đối với hàm handlePreview thư viện nó đã nhả sẵn `file` cho chúng ta rồi
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1)); // lấy ra vị trí cuối cùng của dấu / + 1
  };

  // Truyền vào cái objectFileList
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <>
      <Drawer
        title="Chức năng xem chi tiết"
        width={'50vw'}
        onClose={handleClose}
        open={openViewDetail}
        maskClosable={false}
      >
        <Descriptions title="Thông tin Book" bordered column={2}>
          <Descriptions.Item label="Id">{dataViewDetail?._id}</Descriptions.Item>
          <Descriptions.Item label="Tên sách">
            {dataViewDetail?.mainText}
          </Descriptions.Item>
          <Descriptions.Item label="Tác giả">{dataViewDetail?.author}</Descriptions.Item>
          <Descriptions.Item label="Giá tiền">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(dataViewDetail?.price ?? 0)}
          </Descriptions.Item>

          <Descriptions.Item label="Thể loại" span={2}>
            <Badge status="processing" text={dataViewDetail?.category} />
          </Descriptions.Item>

          <Descriptions.Item label="Created At">
            {moment(dataViewDetail?.createdAt).format(FORMAT_DATE_DISPLAY)}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {moment(dataViewDetail?.updatedAt).format(FORMAT_DATE_DISPLAY)}
          </Descriptions.Item>

          <Descriptions.Item label="Số lượng">
            {dataViewDetail?.quantity}
          </Descriptions.Item>

          <Descriptions.Item label="Đã bán">{dataViewDetail?.sold}</Descriptions.Item>
        </Descriptions>

        <Divider orientation="left"> Ảnh Books </Divider>

        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          // Xóa icon remove của component Upload
          showUploadList={{ showRemoveIcon: false }}
        ></Upload>
        <Modal
          title={previewTitle}
          open={previewOpen}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Drawer>
    </>
  );
};

export default BookViewDetail;
