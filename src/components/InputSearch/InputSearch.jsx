import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, theme } from 'antd';

const InputSearch = (props) => {
  const { handleSearch, setFilter, nameObject, labelObject } = props;
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const formStyle = {
    maxWidth: 'none',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  //  Xử lý searchFilter

  const handleFinish = (values) => {
    let query = '';

    if (values.fullName) {
      query += `fullName=/${values.fullName}/i`;
    }

    if (values.email) {
      query += `email=/${values.email}/i`;
    }

    if (values.phone) {
      query += `phone=/${values.phone}/i`;
    }

    if (query) {
      console.log('Check query >>>>>', query);
      handleSearch(query);
    }
    console.log('Received values of form: ', values);
  };

  return (
    <Form form={form} name="advanced_search" style={formStyle} onFinish={handleFinish}>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }}
            name={nameObject.field_1}
            label={labelObject.field_1}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }}
            name={nameObject.field_2}
            label={labelObject.field_2}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }}
            name={nameObject.field_3}
            label={labelObject.field_3}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#1677ff' }}>
            Search
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
              setFilter(''); //
            }}
          >
            Clear
          </Button>
          {/* <a
                        style={{ fontSize: 12 }}
                        onClick={() => {
                            setExpand(!expand);
                        }}
                    >
                        {expand ? <UpOutlined /> : <DownOutlined />} Collapse
                    </a> */}
        </Col>
      </Row>
    </Form>
  );
};

// https://stackblitz.com/run?file=demo.tsx
// https://ant.design/components/form
// const InputSearch = (props) => {
//   return (
//     <div>
//       <AdvancedSearchForm />
//     </div>
//   );
// };

export default InputSearch;
