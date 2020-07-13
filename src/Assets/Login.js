import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import './Login.css';

function Login() {
	const [loggedIn, setLoggedIn] = useState(false);
	const dispatch = useDispatch()
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 10 },
	};
	const tailLayout = {
		wrapperCol: { offset: 8, span: 10 },
	};
	const onFinish = (values) => {
		console.log('Success:', values);
		dispatch({type: 'loggedIn'})
		setLoggedIn(true);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	useEffect(() => {});

	if (loggedIn) {
		return (
			<>
				<Redirect to="home"></Redirect>
			</>
		);
	}

	return (
		<>
			<div className="loginScreen">
				<div className="loginBox">
					<h1>Login</h1>
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
