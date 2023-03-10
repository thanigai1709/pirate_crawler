import { ScrapperContext } from "@/context/ScrapperContext";
import { ArrowLeftOutlined, GlobalOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import CrawlerControls from "./CrawlerControls";

interface HeaderProps {
	type: "Create" | "Update";
}

const APICustomizerHeader = ({ type = "Create" }: HeaderProps) => {
	const [isLoading, setLoading] = useState(false);
	const router = useRouter();
	const { apiName, targetUrl, scrapeTargets, html } = useContext(ScrapperContext);
	const { data } = useSession();
	async function createCrawler() {
		setLoading(true);
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		let payloadData = JSON.stringify({
			apiName,
			targetUrl,
			crawlTargets: scrapeTargets,
			HTMLDOM: html,
			userEmail: data.user.email,
		});
		let resp: any = await fetch("/api/crawlers/create", {
			method: "POST",
			headers: headers,
			body: payloadData,
		});
		resp = await resp.json();
		if (resp.status) {
			setLoading(false);
			return router.replace(`/dashboard/crawlers/${resp.data._id}`);
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
			<CrawlerControls mode={type} />
			<Button
				type={"primary"}
				size={"large"}
				onClick={createCrawler}
				loading={isLoading}
				disabled={scrapeTargets.length > 0 ? false : true}
			>
				{type}
			</Button>
		</header>
	);
};

export default APICustomizerHeader;
