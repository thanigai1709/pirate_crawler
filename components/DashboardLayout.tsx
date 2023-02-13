import { ReactNode } from "react";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import { Breadcrumb, Layout, Menu, theme, Card } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
const { Content, Sider } = Layout;

interface props {
	children?: ReactNode;
}

export default function DashboardLayout({ children }: props) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const router = useRouter();
	console.log(router.pathname, "router path");
	return (
		<>
			<AppHeader />
			<Layout>
				<Content className="">
					<Layout>
						<Sider
							style={{
								background: colorBgContainer,
							}}
							width={200}
						>
							<Menu
								style={{
									height: "100%",
								}}
								defaultSelectedKeys={[router.pathname]}
							>
								<Menu.Item key={"admin/crawlers"}>
									<Link href={"/admin/crawlers"}>Crawler API's</Link>
								</Menu.Item>
								<Menu.Item key={"admin/settings"}>
									<Link href={"/admin/settings"}>Settings</Link>
								</Menu.Item>
							</Menu>
						</Sider>
						<Content className="pa-4 h-100vh">{children}</Content>
					</Layout>
				</Content>
			</Layout>
		</>
	);
}
