// import InputSearch from './../../components/Admin/UserTable/InputSearch';

import { Card, Col, Row, Statistic } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import CountUp from 'react-countup';
import { callFetchDashBoard } from '../../services/api';

const AdminPage = () => {
  // Viết phần admin dashboard ở đây

  const [dataDashboard, setDataDashboard] = useState({
    countOrder: 0,
    countUser: 0,
  });

  useEffect(() => {
    const initDashboard = async () => {
      const res = await callFetchDashBoard();
      if (res && res.data) setDataDashboard(res.data);
    };
    initDashboard();
  }, []);

  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <Row gutter={[40, 40]}>
      <Col span={10}>
        <Card title="" bordered={false}>
          <Statistic
            title="Tổng Users"
            value={dataDashboard.countUser}
            formatter={formatter}
          />
        </Card>
      </Col>
      <Col span={10}>
        <Card title="" bordered={false}>
          <Statistic
            title="Tổng đơn hàng"
            value={dataDashboard.countOrder}
            formatter={formatter}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default AdminPage;
