import { ScrapperUpdateContext } from "@/context/ScrapperContextUpdate";
import { GlobalOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useContext } from "react";

export default function CrawlerControls() {
	const { targetUrl } = useContext(ScrapperUpdateContext);

	return (
		<>
			<div className="url-form-control">
				<Input
					placeholder="Target URL"
					value={targetUrl}
					size={"large"}
					disabled
					prefix={<GlobalOutlined style={{ fontSize: "20px", color: "rgb(var(--black-clr-700), 0.08" }} />}
				/>
			</div>
		</>
	);
}
