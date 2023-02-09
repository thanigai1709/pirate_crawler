import { ScrapeTarget } from "@/types";
import { FileTextOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useState } from "react";

export interface Props {
	nodeData: ScrapeTarget;
}

const NodeItem = ({ nodeData }: Props) => {
	const [keyName, setKeyName] = useState<string>(nodeData.keyName);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyName(e.target.value);
	};

	return (
		<div>
			<Input value={keyName} onChange={handleChange} />
			<FileTextOutlined />
		</div>
	);
};

export default NodeItem;
