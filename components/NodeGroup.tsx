import { ScrapperContext } from "@/context/ScrapperContext";
import { ScrapeTarget } from "@/types";
import { Alert, Typography } from "antd";
import { useContext, useEffect } from "react";
import NodeItem from "./NodeItem";

export interface Props {
	targetData: ScrapeTarget[];
}

const NodeGroup = () => {
	const { scrapeTargets, targetUrl } = useContext(ScrapperContext);

	if (targetUrl.length === 0) {
		return <Alert showIcon message="Please enter a target URL in the search to get started" type="info" />;
	}

	if (scrapeTargets.length === 0) {
		return <Alert showIcon message="Click on the DOM elements to add payloads" type="info" />;
	}

	return (
		<div className="target-node__group">
			<div className="target-node__group-title">Payloads</div>
			<div className="target-node__group-container">
				{scrapeTargets.map((n, i) => (
					<NodeItem key={`node_item_${i}`} nodeData={n} />
				))}
			</div>
		</div>
	);
};

export default NodeGroup;
