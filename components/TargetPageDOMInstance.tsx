import { ScrapperContext } from "@/context/ScrapperContext";
import { buildSelector, getElementData } from "@/utils";
import { useEffect, useState, useRef, useId, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Spin } from "antd";

export default function TargetPageDOMInstance() {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const { isLoading, html } = useContext(ScrapperContext);

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
			console.log(iframeRef, "iframe reff");
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
			target.setAttribute("data-scrape", "selected");
			target.setAttribute("data-target-id", elId);
			const selector = buildSelector(target);
			const previewData = getElementData(target);
			console.log(selector, previewData, "payload");
		}
	};

	if (isLoading) {
		return (
			<Spin tip="Loading" size="large">
				<div className="content" />
			</Spin>
		);
	}

	if (html != null) {
		return (
			<>
				<iframe srcDoc={html} sandbox="allow-scripts allow-same-origin" ref={iframeRef} onLoad={handleDOMONLoad} />
			</>
		);
	} else {
		return null;
	}
}
