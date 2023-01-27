import { GlobalOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function AppHeader() {
	return (
		<header className="site-header">
			<div>
				<Link className="site-logo" href={"/"}>
					<GlobalOutlined />
					<span className="site-logo__text">PIRATE CRAWLER</span>
				</Link>
			</div>
		</header>
	);
}
