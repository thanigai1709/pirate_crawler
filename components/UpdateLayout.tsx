import { ScrapperUpdateContext } from "@/context/ScrapperContextUpdate";
import { Layout } from "antd";
import { useContext, useEffect } from "react";
import APICustomizerHeader from "./update/APICustomizerHeader";
import NodeGroup from "./update/NodeGroup";
import TargetPageDOMInstance from "./update/TargetPageDOMInstance";
const { Content, Sider } = Layout;
const UpdateLayout = ({ pageData }) => {
	const { setApiName, setTargetUrl, setCrawlerData } = useContext(ScrapperUpdateContext);
	// console.log(pageData, "page data");
	useEffect(() => {
		setCrawlerData(pageData);
		setApiName(pageData.apiName);
		setTargetUrl(pageData.targetUrl);
	}, []);
	return (
		<Layout>
			<APICustomizerHeader />
			<Content>
				<Layout>
					<Sider width={300} className="setting-controls">
						<NodeGroup />
					</Sider>
					<Content className="pa-4 target-page__preview">
						<TargetPageDOMInstance />
					</Content>
				</Layout>
			</Content>
		</Layout>
	);
};

export default UpdateLayout;
