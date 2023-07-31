import { Badge, Descriptions, Drawer } from 'antd';
import moment from 'moment';

const UserViewDetail = (props) => {
  const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;
  const handleClose = () => {
    setDataViewDetail(null);
    setOpenViewDetail(false);
  };
  return (
    <>
      <Drawer
        title="Chức năng xem chi tiết"
        width={'50vw'}
        onClose={handleClose}
        open={openViewDetail}
      >
        <Descriptions title="Thông tin user" bordered column={2}>
          <Descriptions.Item label="Id">{dataViewDetail?._id}</Descriptions.Item>
          <Descriptions.Item label="Tên hiển thị">
            {dataViewDetail?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{dataViewDetail?.email}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {dataViewDetail?.phone}
          </Descriptions.Item>

          {/* Mình khứa này chiếm 2 cột */}
          <Descriptions.Item label="Role" span={2}>
            <Badge status="processing" text={dataViewDetail?.role} />
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {moment(dataViewDetail?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {moment(dataViewDetail?.updated).format('DD/MM/YYYY HH:mm:ss')}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default UserViewDetail;
