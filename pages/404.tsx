import { NextPage } from "next";
import { loginValidate } from "@/utils";
import { useRouter } from "next/router";
import Lottie from "react-lottie-player";
import notFound from "@/public/static/404.json";
import { Button } from "antd";
import Link from "next/link";

const NotFound: NextPage = () => {
	return (
		<section className="notFound-page__wrapper">
			<div className="notFound-page__container">
				<Lottie animationData={notFound} loop={true} play />
				<Link href={"/"}>
					<Button type="primary">Take me Home</Button>
				</Link>
			</div>
		</section>
	);
};

export default NotFound;
