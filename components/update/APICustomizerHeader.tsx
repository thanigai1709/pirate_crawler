import { ScrapperContext } from "@/context/ScrapperContext";
import { ScrapperUpdateContext } from "@/context/ScrapperContextUpdate";
import { ArrowLeftOutlined, GlobalOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import CrawlerControls from "./CrawlerControls";

const APICustomizerHeader = () => {
	const [isLoading, setLoading] = useState(false);
	const { scrapeTargets, html, apiName, crawlerData } = useContext(ScrapperUpdateContext);

	async function updateCrawler() {
		setLoading(true);
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		let payloadData = JSON.stringify({
			apiName,
			crawlTargets: scrapeTargets,
			crawlType: "DYNAMIC",
			crawlID: crawlerData?._id,
		});
		let resp: any = await fetch("/api/crawlers/update", {
			method: "PUT",
			headers: headers,
			body: payloadData,
		});
		resp = await resp.json();
		if (resp.status) {
			setLoading(false);
			notification.open({
				type: "success",
				message: "Your changes have been saved",
				duration: 2,
			});
		} else {
			notification.open({
				type: "error",
				message: "Something went wrong!",
				description: resp.message,
				duration: 2,
			});
		}
		setLoading(false);
	}

	return (
		<header className="target-page__header">
			<Link href={"./"}>
				<Button size={"large"}>
					<ArrowLeftOutlined />
				</Button>
			</Link>
			<CrawlerControls />
			<Button
				type={"primary"}
				size={"large"}
				onClick={updateCrawler}
				loading={isLoading}
				disabled={scrapeTargets.length === 0 ? true : false}
			>
				Update
			</Button>
		</header>
	);
};

export default APICustomizerHeader;
