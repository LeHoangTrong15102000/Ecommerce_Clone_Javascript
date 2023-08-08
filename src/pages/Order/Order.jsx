import { useState } from 'react';
import ViewOrder from './ViewOrder/ViewOrder';
import { Button, Result, Steps } from 'antd';
import Payment from './Payment/Payment';
import { SmileOutlined } from '@ant-design/icons';
import './order.scss';
import { Link } from 'react-router-dom';

const OrderPage = (props) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div style={{ background: '#efefef', padding: '20px 0' }}>
      <div className="order-container" style={{ maxWidth: 1800, margin: '0 auto' }}>
        <div className="order-steps">
          <div className="step-item">
            <Steps
              size="small"
              current={currentStep}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              status={'finish'}
              items={[
                {
                  title: 'Đơn hàng',
                },
                {
                  title: 'Đặt hàng',
                },
                {
                  title: 'Thanh toán',
                },
              ]}
            />
          </div>
          {currentStep === 0 && <ViewOrder setCurrentStep={setCurrentStep} />}

          {currentStep === 1 && <Payment setCurrentStep={setCurrentStep} />}

          {currentStep === 2 && (
            <Result
              icon={<SmileOutlined />}
              title="Đơn hàng đã được đặt thành công"
              extra={
                <Link to="/">
                  <Button type="primary" style={{ backgroundColor: '#1677ff' }}>
                    Trang chủ
                  </Button>
                </Link>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
