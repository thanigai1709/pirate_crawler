import { ScrapperUpdateContext } from "@/context/ScrapperContextUpdate";
import { ScrapeTarget } from "@/types";
import { CopyOutlined } from "@ant-design/icons";
import { Alert, Button, Input, Skeleton, Tooltip, Typography } from "antd";
import { useContext, useEffect, useRef } from "react";
import NodeItem from "./NodeItem";

export interface Props {
	targetData: ScrapeTarget[];
}

const NodeGroup = () => {
	const { scrapeTargets, targetUrl, apiName, setApiName, crawlerData, isLoading } = useContext(ScrapperUpdateContext);
	const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}api/public/${crawlerData._id}?apiKey=${crawlerData.user?.apiKey}`;
	useEffect(() => {}, [crawlerData]);
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setApiName(e.target.value);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(apiUrl);
	};

	return (
		<>
			<Typography.Text>API Endpoint</Typography.Text>
			<Input.Group className="api-link__group">
				<Input value={apiUrl} />
				<Tooltip title="Copy API Url">
					<Button icon={<CopyOutlined />} onClick={() => handleCopy()} />
				</Tooltip>
			</Input.Group>
			<div className="target-api-name mb-5">
				<Typography.Text>API Name</Typography.Text>
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
					{isLoading === true ? (
						<Skeleton active />
					) : (
						scrapeTargets.map((n, i) => <NodeItem key={`node_item_${i}`} nodeData={n} />)
					)}
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
