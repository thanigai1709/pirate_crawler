import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const LoggedInUserHeader = () => {
	const { data, status } = useSession();

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<Link href={"/dashboard/profile"}>
					<UserOutlined /> Profile
				</Link>
			),
		},
		{
			key: "2",
			label: (
				<span onClick={() => signOut()}>
					<LogoutOutlined />
					&nbsp; Logout
				</span>
			),
		},
	];
	if (status === "authenticated")
		return (
			<div>
				<Dropdown menu={{ items }}>
					<a onClick={(e) => e.preventDefault()}>
						{data.user.image ? (
							<Avatar size={40} src={<img src={data.user.image} alt="avatar" referrerPolicy="no-referrer" />} />
						) : (
							<Avatar size={40} style={{ backgroundColor: "#645cbb" }}>
								{data.user.name.charAt(0).toLocaleUpperCase()}
							</Avatar>
						)}
					</a>
				</Dropdown>
			</div>
		);
	return null;
};

export default LoggedInUserHeader;
