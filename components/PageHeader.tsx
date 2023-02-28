import { NextPage } from "next/types";
import Image from "next/image";
import AppLogo from "./AppLogo";
import Link from "next/link";

const PageHeader: NextPage = () => {
	return (
		<header className="page-header">
			<div className="page-header__nav">
				<div className="page-header__logo">
					<AppLogo route={"/"} />
				</div>
				<nav className="page-header__links">
					<Link href={"/auth/login"}>Login</Link>
					<Link className="btn" href={"/auth/signup"}>
						Sign Up
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default PageHeader;
