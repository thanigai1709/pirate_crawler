import { ScrapperContext } from "@/context/ScrapperContext";
import { Input } from "antd";
import React, { useContext, useState } from "react";

export default function CrawlerControls() {
	const [url, setUrl] = useState("");
	const [error, setError] = useState<string>("");
	const { setTargetUrl } = useContext(ScrapperContext);

	function handleTargetURL(e: React.ChangeEvent<HTMLInputElement>) {
		setUrl(e.target.value);
		const urlRegex = /^(https?|ftp|ftps):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?\/?$/;
		if (!e.target.value.match(urlRegex)) {
			setError("Invalid URL");
		} else {
			setError("");
			setTargetUrl(e.target.value);
		}

		if (url === "") {
			setTargetUrl("");
		}
	}

	return (
		<div className="url-form-control">
			<Input placeholder="Target URL" onChange={handleTargetURL} value={url} />
			{error != "" && <span>{error}</span>}
		</div>
	);
}
