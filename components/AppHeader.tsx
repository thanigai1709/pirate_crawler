import { GlobalOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Menu, Button } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import LoggedInUserHeader from "./LoggedInUserHeader";

export default function AppHeader() {
	return (
		<header className="site-header">
			<div>
				<Link className="site-logo" href={"/"}>
					<GlobalOutlined />
					<span className="site-logo__text">PIRATE CRAWLER</span>
				</Link>
			</div>
			<LoggedInUserHeader />
		</header>
	);
}
