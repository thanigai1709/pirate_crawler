import { ScrapperContext } from "@/context/ScrapperContext";
import { ScrapperUpdateContext } from "@/context/ScrapperContextUpdate";
import { ScrapeTarget } from "@/types";
import { DeleteOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";

export interface Props {
	nodeData: ScrapeTarget;
}

const NodeItem = ({ nodeData }: Props) => {
	const [keyName, setKeyName] = useState<string>(nodeData.keyName);
	const { setScrapeTargets, scrapeTargets } = useContext(ScrapperUpdateContext);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newKeyName = e.target.value;
		setKeyName(newKeyName);
		let newState: ScrapeTarget[] = scrapeTargets.map((t) => {
			if (t.pcDOMid === nodeData.pcDOMid) {
				return { ...t, keyName: newKeyName };
			} else {
				return t;
			}
		});
		setScrapeTargets(newState);
	};

	const handleDelete = () => {
		setScrapeTargets(scrapeTargets.filter((t) => t.pcDOMid !== nodeData.pcDOMid));
	};

	return (
		<div className="target-node__item">
			<Input value={keyName} onChange={handleChange} prefix={<FileTextOutlined />} />
			<Button shape="circle" icon={<DeleteOutlined />} size={"small"} danger onClick={handleDelete} />
		</div>
	);
};

export default NodeItem;
