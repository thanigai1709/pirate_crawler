import { ScrapperContext } from "@/context/ScrapperContext";
import { ScrapeTarget } from "@/types";
import { Alert, Input, Typography } from "antd";
import { useContext, useEffect } from "react";
import NodeItem from "./NodeItem";

export interface Props {
	targetData: ScrapeTarget[];
}

const NodeGroup = () => {
	const { scrapeTargets, targetUrl, apiName, setApiName } = useContext(ScrapperContext);

	if (targetUrl.length === 0) {
		return <Alert showIcon message="Please enter a target URL in the search to get started" type="info" />;
	}

	if (scrapeTargets.length === 0) {
		return <Alert showIcon message="Click on the DOM elements to add payloads" type="info" />;
	}

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setApiName(e.target.value);
	};

	return (
		<>
			<div className="target-api-name mb-5">
				<Input
					type="text"
					value={apiName}
					onChange={handleOnChange}
					placeholder="API name"
					defaultValue={"Untiled API"}
				/>
			</div>

			<div className="target-node__group mb-5">
				<div className="target-node__group-title">Payloads</div>
				<div className="target-node__group-container">
					{scrapeTargets.map((n, i) => (
						<NodeItem key={`node_item_${i}`} nodeData={n} />
					))}
				</div>
			</div>
			{scrapeTargets.length > 0 && (
				<Alert
					showIcon
					message="This feature is still under development so it maynot work as expected in some webpages"
					type="warning"
				/>
			)}
		</>
	);
};

export default NodeGroup;
