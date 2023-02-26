import { ScrapperContext } from "@/context/ScrapperContext";
import { GlobalOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useContext, useEffect, useState } from "react";

export default function CrawlerControls({ mode }) {
	const [url, setUrl] = useState("");
	const [error, setError] = useState<string>("");
	const { setTargetUrl, targetUrl } = useContext(ScrapperContext);
	const urlRegex = /^(https?|ftp|ftps):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?\/?$/;

	useEffect(() => {
		if (mode === "UPDATE") {
			setUrl(targetUrl);
		}
	}, []);

	function handleTargetURL(e: React.ChangeEvent<HTMLInputElement>) {
		setUrl(e.target.value);
		if (!e.target.value.match(urlRegex)) {
			setError("Invalid URL");
		} else {
			setError("");
			setTargetUrl(e.target.value);
		}
	}

	return (
		<>
			<div className="url-form-control">
				<Input
					placeholder="Target URL"
					onChange={handleTargetURL}
					value={url}
					size={"large"}
					status={error ? "error" : ""}
					prefix={<GlobalOutlined style={{ fontSize: "20px", color: "rgb(var(--black-clr-700), 0.08" }} />}
				/>
			</div>
		</>
	);
}
