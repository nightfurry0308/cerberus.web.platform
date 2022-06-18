import './index.css';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { api } from '../../common/Utility';
import { Link, useNavigate } from "react-router-dom";

export default () => {
  let navigate = useNavigate()

  const onFinish = (params: any) => {
    params = {
      ...params,
      type: 'register'
    }
    
    api(params).then(res => {
      if (!res) {
        notification.error({
          message: 'ERROR',
          description: 'Sign up has error.'
        })
      } else {
        notification.success({
          message: 'SUCCESS',
          description: 'Sign up is successful.'
        })

        setTimeout(() => {
          navigate("/home", {replace: true})                  
        }, 1000);

        localStorage.setItem('user', res)

      }
    })
  };

  return (
    <div className='m-auto w-80'>
      <h2 className='text-lg'>Sign up</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',              
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="password_confirm"
          rules={[
            {
              required: true,
              message: 'Please input your Password again!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password confirm"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign Up
          </Button>
          Or <Link to="/login">Sign in now!</Link>
        </Form.Item>
      </Form>

    </div>
  );
};

