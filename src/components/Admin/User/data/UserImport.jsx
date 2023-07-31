import { InboxOutlined } from '@ant-design/icons';
import { Upload, Table, message, Modal, Descriptions } from 'antd';
import { useState } from 'react';
import * as XLSX from 'xlsx';

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
            console.log('Check json >>>>', json);
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
  };
  return (
    <>
      <Modal
        title="Import data user"
        width={'50vw'}
        open={openModalImport}
        onOk={() => setOpenModalImport(false)}
        onCancel={() => setOpenModalImport(false)}
        okText="Import data"
        okButtonProps={{ disabled: true }}
        // do not close when click outside
        maskClosable={false}
      >
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single upload. Only accept .csv .xls .xlsx
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
