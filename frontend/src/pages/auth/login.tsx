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
      type: 'login'
    }
    
    api(params).then(res => {
      if (!res) {
        notification.error({
          message: 'ERROR',
          description: 'The auth information is incorrect.'
        })
      } else {
        notification.success({
          message: 'SUCCESS',
          description: ''
        })        

        localStorage.setItem('user', res)

        navigate("/home", {replace: true})        
      }
    })
  };

  return (
    <div className='m-auto w-80'>
      <h2 className='text-lg'>Sign in</h2>
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
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign in
          </Button>
          Or <Link to="/register">Sign up now!</Link>
        </Form.Item>
      </Form>

    </div>
  );
};

