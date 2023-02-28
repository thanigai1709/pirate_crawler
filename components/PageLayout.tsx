import { NextPage } from "next/types";
import { ReactNode } from "react";
import PageFooter from "./PageFooter";
import PageHeader from "./PageHeader";

interface props {
	children: ReactNode;
}

const PageLayout = ({ children }: props) => {
	return (
		<>
			<PageHeader /> <main>{children}</main>
		</>
	);
};

export default PageLayout;
