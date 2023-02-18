import { ArrowLeftOutlined, GlobalOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import CrawlerControls from "./CrawlerControls";

interface HeaderProps {
	type: "create" | "update";
}

const APICustomizerHeader = ({ type = "create" }: HeaderProps) => {
	return (
		<header className="target-page__header">
			<Link href={"./"}>
				<Button size={"large"}>
					<ArrowLeftOutlined />
				</Button>
			</Link>
			<CrawlerControls />
			<Button type={"primary"} size={"large"}>
				{type}
			</Button>
		</header>
	);
};

export default APICustomizerHeader;
