import { GlobalOutlined } from "@ant-design/icons";
import { Input, Button, message, notification } from "antd";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import herocatAnimation from "../../public/static/cat-hero.json";
import { useFormik } from "formik";
import { registerValidate } from "@/utils";
import { SignupForm } from "@/types";
import { useRouter } from "next/router";

const SignUpPage: NextPage = () => {
	const router = useRouter();
	const [messageApi, contextHolder] = message.useMessage();
	const [formError, setFormError] = useState<String>("");
	const onSubmit = async (values: SignupForm) => {
		if (signupForm.isValid) {
			setFormError("");
			signupForm.setSubmitting(true);
			let resp: any = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});
			resp = await resp.json();
			if (resp.status) {
				notification.open({
					type: "success",
					message: "Aloha!",
					description: "Thanks for signing up. Your account has been created.",
					duration: 1,
				});
				signupForm.resetForm();
				signupForm.setSubmitting(false);
				setTimeout(() => {
					router.push("/auth/login");
				}, 1000);
			} else {
				setFormError(resp.message);
				signupForm.setSubmitting(false);
			}
		}
	};

	useEffect(() => {}, []);

	const signupForm = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
			cpassword: "",
		},
		onSubmit,
		validate: registerValidate,
	});

	return (
		<>
			<Head>
				<title>Pirate Crawler | Signup</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section className="signupPage__Wrapper">
				<div className="signupForm__Wrapper">
					<div className="signupForm__banner">
						<Lottie animationData={herocatAnimation} loop={true} play />
					</div>
					<div className="signupForm__content">
						<Link className="site-logo" href={"/"}>
							<GlobalOutlined />
							<span className="site-logo__text">PIRATE CRAWLER</span>
						</Link>
						<form onSubmit={signupForm.handleSubmit}>
							<Input
								size="large"
								type="text"
								name="username"
								className={`${signupForm.errors.username && signupForm.touched.username ? "error" : ""}`}
								placeholder="Username ex: Jhon Doe"
								value={signupForm.values.username}
								onChange={signupForm.handleChange}
							/>
							{signupForm.errors.username && signupForm.touched.username && (
								<span className="error msg">{signupForm.errors.username.toString()}</span>
							)}
							<Input
								size="large"
								type="email"
								name="email"
								className={`${signupForm.errors.email && signupForm.touched.email ? "error" : ""}`}
								placeholder="jhon@example.com"
								value={signupForm.values.email}
								onChange={signupForm.handleChange}
							/>
							{signupForm.errors.email && signupForm.touched.email && (
								<span className="error msg">{signupForm.errors.email.toString()}</span>
							)}
							<Input.Password
								size="large"
								placeholder="Enter password"
								className={`${signupForm.errors.password && signupForm.touched.password ? "error" : ""}`}
								name="password"
								value={signupForm.values.password}
								onChange={signupForm.handleChange}
							/>
							{signupForm.errors.password && signupForm.touched.password && (
								<span className="error msg">{signupForm.errors.password.toString()}</span>
							)}
							<Input.Password
								size="large"
								name="cpassword"
								className={`${signupForm.errors.cpassword && signupForm.touched.cpassword ? "error" : ""}`}
								placeholder="Confirm password"
								value={signupForm.values.cpassword}
								onChange={signupForm.handleChange}
							/>
							{signupForm.errors.cpassword && signupForm.touched.cpassword && (
								<span className="error msg">{signupForm.errors.cpassword.toString()}</span>
							)}
							<Button type="primary" block htmlType="submit" size="large" loading={signupForm.isSubmitting}>
								Signup
							</Button>
							{formError && <span className="error msg">{formError}</span>}
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default SignUpPage;
