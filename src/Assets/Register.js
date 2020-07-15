import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios'
import 'antd/dist/antd.css';
import './Login.css';

function Login() {
	const [registerForm, setRegisterForm] = useState(false);
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 10 },
	};
	const tailLayout = {
		wrapperCol: { offset: 8, span: 10 },
	};
	const onFinish = (values) => {
        // console.log(values.Email)
        // console.log(values.Password)
        Axios({
            url: 'http://localhost:3001/user/register',
            method: 'POST',
            data: {
                Email: values.Email,
                Password: values.Password
            }
        })
        .then(result => {
            toast.success('Register Success', {
                position: 'bottom-left',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true
            });
                setRegisterForm(true);
        })
        .catch(err => {
            toast.error('Register Failed!!', {
                position: 'bottom-left',
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true
            });
        })


		
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	useEffect(() => {});

	if (registerForm === true) {
		return (
			<>
				<Redirect to="login"></Redirect>
			</>
		);
	}

	return (
		<>
			<div className="loginScreen">
				<div className="loginBox">
					<h1>Register</h1>
					<Form
						{...layout}
						name="basic"
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Form.Item
							label="Email"
                            name="Email"
                            type="email"
							rules={[{ required: true, message: 'Please input your Email!' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="Password"
							rules={[{ required: true, message: 'Please input your password!' }]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item {...tailLayout}>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
}

export default Login;
