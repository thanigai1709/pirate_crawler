import { NextPage } from "next";
import Head from "next/head";
import { Button, Input, Form } from "antd";
import Lottie from "react-lottie-player";
import meowAnimation from "../../public/static/meow.json";
import { GlobalOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useState } from "react";

interface LoginFormData {
	email: string;
	password: string;
}

const LoginPage: NextPage = () => {
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<>
			<Head>
				<title>Pirate Crawler | Login</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section className="loginPage__Wrapper">
				<div className="loginForm__Wrapper">
					<div className="loginForm__banner">
						<Lottie animationData={meowAnimation} loop={true} play />
					</div>
					<div className="loginForm__content">
						<Link className="site-logo" href={"/"}>
							<GlobalOutlined />
							<span className="site-logo__text">PIRATE CRAWLER</span>
						</Link>
						<form onSubmit={handleSubmit}>
							<Input
								type="email"
								size="large"
								placeholder="jhon@example.com"
								value={formData.email}
								onChange={(e) =>
									setFormData({
										...formData,
										email: e.target.value,
									})
								}
								required
							/>
							<Input.Password
								size="large"
								placeholder="Enter password"
								value={formData.password}
								required
								onChange={(e) =>
									setFormData({
										...formData,
										password: e.target.value,
									})
								}
								visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
							/>
							<Button type="primary" block htmlType="submit" size="large">
								Login
							</Button>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default LoginPage;
