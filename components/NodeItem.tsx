import { ScrapperContext } from "@/context/ScrapperContext";
import { ScrapeTarget } from "@/types";
import { FileTextOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useContext, useEffect, useState } from "react";

export interface Props {
	nodeData: ScrapeTarget;
}

const NodeItem = ({ nodeData }: Props) => {
	const [keyName, setKeyName] = useState<string>(nodeData.keyName);
	const { setScrapeTargets, scrapeTargets } = useContext(ScrapperContext);
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

	useEffect(() => {}, [keyName]);

	return <Input value={keyName} onChange={handleChange} prefix={<FileTextOutlined />} />;
};

export default NodeItem;
