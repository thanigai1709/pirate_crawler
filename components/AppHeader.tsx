import { GlobalOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Menu, Button } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import AppLogo from "./AppLogo";
import LoggedInUserHeader from "./LoggedInUserHeader";

export default function AppHeader() {
	return (
		<header className="site-header">
			<div>
				<AppLogo route={"/dashboard"} />
			</div>
			<LoggedInUserHeader />
		</header>
	);
}
