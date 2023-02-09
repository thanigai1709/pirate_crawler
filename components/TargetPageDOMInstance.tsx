import { ScrapperContext } from "@/context/ScrapperContext";
import { buildSelector, getElementData } from "@/utils";
import { useRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Spin, Typography } from "antd";
import { ScrapeTarget } from "@/types";

export default function TargetPageDOMInstance() {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const { isLoading, html, targetUrl, scrapeTargets, updateTargets, setScrapeTargets } = useContext(ScrapperContext);

	const styles = `
    .highlight {
		-webkit-box-shadow: inset 0px 0px 0px 2px rgba(240,88,88,1);
		-moz-box-shadow: inset 0px 0px 0px 2px rgba(240,88,88,1);
		box-shadow: inset 0px 0px 0px 2px rgba(240,88,88,1);
    }
    [data-scrape="selected"] {
		-webkit-box-shadow: inset 0px 0px 0px 2px rgba(75,156,211,1);
		-moz-box-shadow: inset 0px 0px 0px 2px rgba(75,156,211,1);
		box-shadow: inset 0px 0px 0px 2px rgba(75,156,211,1);
    }
  `;

	const handleDOMONLoad = () => {
		if (iframeRef.current) {
			const iframeDoc = iframeRef.current.contentDocument;
			if (iframeDoc) {
				const head = iframeDoc.head;
				const style = iframeDoc.createElement("style");
				style.innerHTML = styles;
				head.appendChild(style);
				console.info("attaching the event listeners to DOM");
				iframeDoc.addEventListener("mouseover", handleMouseOver, true);
				iframeDoc.addEventListener("mouseout", handleMouseOut, true);
				iframeDoc.addEventListener("click", handleClick, true);
			}
		}
	};

	const handleMouseOver = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		target.classList.add("highlight");
	};

	const handleMouseOut = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		target.classList.remove("highlight");
	};

	const handleClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		target.classList.remove("highlight");
		if (target.hasAttribute("data-scrape")) {
			target.removeAttribute("data-scrape");
			target.removeAttribute("data-target-id");
		} else {
			const elId = String(uuidv4());
			const small_id = elId.slice(0, 4);
			target.setAttribute("data-scrape", "selected");
			target.setAttribute("data-target-id", elId);
			const selector = buildSelector(target);
			const previewData = getElementData(target);
			let prevState: ScrapeTarget[] = scrapeTargets;
			prevState.push({ pcDOMid: elId, DOMPath: selector, keyName: `untitled_${small_id}` });
			console.log(prevState);
			setScrapeTargets([...prevState]);
		}
	};

	if (isLoading) {
		return (
			<Spin tip="Loading" size="large" className="ma-10">
				<div className="content" />
			</Spin>
		);
	}

	if (html != null) {
		return (
			<>
				{JSON.stringify(scrapeTargets)}
				<iframe srcDoc={html} sandbox="allow-scripts allow-same-origin" ref={iframeRef} onLoad={handleDOMONLoad} />
			</>
		);
	} else {
		return (
			<>
				<Typography.Title level={3}>Please enter a target URL</Typography.Title>
			</>
		);
	}
}
