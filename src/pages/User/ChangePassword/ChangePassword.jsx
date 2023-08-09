import { Form } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const handleFinish = async (values) => {
    const { email, oldpass, newpass } = values;
    setIsSubmit(true);
  };

  return <div></div>;
};

export default ChangePassword;
