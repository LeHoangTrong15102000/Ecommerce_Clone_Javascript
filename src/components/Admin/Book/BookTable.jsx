import { Col, Form, Row } from 'antd';
import InputSearch from '../../InputSearch/InputSearch';
import { useState } from 'react';

const BookTable = (props) => {
  const [filter, setFilter] = useState('');
  const bookObject = {};

  const bookLabel = {};

  const handleSearch = () => {};
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch
            handleSearch={handleSearch}
            setFilter={setFilter}
            nameObject={bookObject}
            labelObject={bookLabel}
          />
        </Col>

        <Col span={24}>
          <Form>
            <Form.Item></Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default BookTable;
