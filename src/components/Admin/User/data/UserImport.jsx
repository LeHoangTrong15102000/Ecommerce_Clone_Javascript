import { InboxOutlined } from '@ant-design/icons';
import { Upload, Table, message, Modal, Descriptions, notification } from 'antd';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { callCreateMultipleUser } from '../../../../services/api';
import templateFile from './data.xlsx?url';

const { Dragger } = Upload;
const UserImport = (props) => {
  const { openModalImport, setOpenModalImport } = props;

  // Biến dataExcel dùng thằng React để quản lí nó, để mình nạp data đầu vào cho Table
  const [dataExcel, setDataExcel] = useState([]);

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok'); // hàm onSuccess cho người dùng biết upload thành công
    }, 1000);
  };

  const propsUpload = {
    name: 'file', // là tên cái file chúng ta upload
    multiple: false,
    maxCount: 1,
    accept:
      '.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    customRequest: dummyRequest,
    showUploadList: dataExcel.length > 0 ? true : false, // khi mà có dữ liệu thì mới cho hiển thị thanh progress bar
    // showUploadList: {{ showRemoveIcon: false }},
    onChange(info) {
      // console.log('Check info >>>>', info);
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      // để cho nó chạy thành công chính là việc chúng ta gọi hàm onSuccess
      if (status === 'done') {
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj; // originFileObj kiểu dữ liệu nó là kiểu `File` thì chúng ta mới lấy được `file` user gửi vào
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = function (event) {
            const data = new Uint8Array(reader.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]]; // lấy ra sheet đầu tiên trong file excel
            // const json = XLSX.utils.sheet_to_json(sheet)
            const json = XLSX.utils.sheet_to_json(sheet, {
              header: ['fullName', 'email', 'phone'], // việc quy định phần header là việc mình quy định các giá trị trong file excel nó cần ứng với thuộc tính nào
              range: 1, //skip header row, bỏ đi cái row header
            });
            // console.log('Check json >>>>', json);
            if (json && json.length > 0) setDataExcel(json);
          };
        }
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    // Xử lý quá trình kéo thả và đọc dữ liệu ở hàm onDrop()
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },

    onRemove(info) {},
  };

  const handleSubmit = async () => {
    const data = dataExcel.map((item) => {
      item.password = '123456'; // Tham số này sau này phụ thuộc vào yêu cầu được đặt ra có thể đưa tham số này vào filel `Env` hoặc là chúng ta gọi Api để lấy
      return item;
    });

    const res = await callCreateMultipleUser(data);
    if (res.data) {
      notification.success({
        description: `Success ${res.data.countSuccess}, Error: ${res.data.countError}`,
        message: 'Upload thành công',
      });
      setDataExcel([]);
      setOpenModalImport(false);
      props.fetchUser();
    } else {
      notification.error({
        description: res.message,
        message: 'Đã có lỗi xảy ra',
      });
    }
  };

  return (
    <>
      <Modal
        title="Import data user"
        width={'50vw'}
        open={openModalImport}
        onOk={() => handleSubmit()}
        onCancel={() => {
          setOpenModalImport(false);
          setDataExcel([]);
        }}
        okText="Import data"
        // okButtonProps là nút cho phép chúng ta import data vào table, có dữ liệu mới cho hiện nút này
        okButtonProps={{ disabled: dataExcel.length < 1 }}
        // do not close when click outside
        maskClosable={false}
      >
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single upload. Only accept .csv .xls .xlsx . or{' '}
            {/*  cái đường Link này không phải là cái đường link đâu mà là chúng ta lưu sẵn file excel trong source code */}
            <a onClick={(e) => e.stopPropagation()} download href={templateFile}>
              Download Sample File
            </a>
          </p>
        </Dragger>

        <div style={{ paddingTop: 20 }}>
          <Table
            dataSource={dataExcel}
            title={() => <span>Dữ liệu upload:</span>}
            columns={[
              { dataIndex: 'fullName', title: 'Tên hiển thị' },
              { dataIndex: 'email', title: 'Email' },
              { dataIndex: 'phone', title: 'Phone' },
            ]}
          />
        </div>
      </Modal>
    </>
  );
};

export default UserImport;
