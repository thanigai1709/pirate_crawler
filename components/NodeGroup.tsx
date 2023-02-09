import { ScrapperContext } from "@/context/ScrapperContext";
import { ScrapeTarget } from "@/types";
import { useContext, useEffect } from "react";
import NodeItem from "./NodeItem";

export interface Props {
	targetData: ScrapeTarget[];
}

const NodeGroup = () => {
	const { scrapeTargets } = useContext(ScrapperContext);

	return (
		<div className="target-node__group">
			{scrapeTargets.map((n, i) => (
				<NodeItem key={`node_item_${i}`} nodeData={n} />
			))}
		</div>
	);
};

export default NodeGroup;
