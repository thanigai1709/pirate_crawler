import { ScrapperContext } from "@/context/ScrapperContext";
import { buildSelector, getElementData } from "@/utils";
import { useRef, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Spin, Typography } from "antd";
import { ScrapeTarget } from "@/types";
import { ScrapperUpdateContext } from "@/context/ScrapperContextUpdate";

export default function TargetPageDOMInstance() {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const { isLoading, html, scrapeTargets, setScrapeTargets, setApiName, crawlerData } =
		useContext(ScrapperUpdateContext);
	const styles = `
    .highlight {
		-webkit-box-shadow: inset 0px 0px 0px 2px rgba(240,88,88,1);
		-moz-box-shadow: inset 0px 0px 0px 2px rgba(240,88,88,1);
		box-shadow: inset 0px 0px 0px 2px rgba(240,88,88,1);
        background-color:rgba(240,88,88,0.2);
    }
    [data-scrape="selected"] {
		-webkit-box-shadow: inset 0px 0px 0px 2px rgba(100,92,187,1);
		-moz-box-shadow: inset 0px 0px 0px 2px rgba(100,92,187,1);
		box-shadow: inset 0px 0px 0px 2px rgba(100,92,187,1);
        background-color:rgba(100,92,187,0.2);
    }
  `;

	const handleDOMONLoad = () => {
		if (iframeRef.current) {
			const iframeDoc = iframeRef.current.contentDocument;
			setApiName(iframeDoc.title);
			if (iframeDoc) {
				const head = iframeDoc.head;
				const style = iframeDoc.createElement("style");
				style.innerHTML = styles;
				head.appendChild(style);
				console.info("attaching the event listeners to DOM");
				iframeDoc.addEventListener("mouseover", handleMouseOver, true);
				iframeDoc.addEventListener("mouseout", handleMouseOut, true);
				iframeDoc.addEventListener("click", handleClick, true);
				setScrapeTargets(crawlerData.crawlTargets);
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
		if (!target.hasAttribute("data-scrape")) {
			const elId = String(uuidv4());
			const small_id = elId.slice(0, 6);
			let selector = buildSelector(target);
			//@ts-ignore
			setScrapeTargets((currentState) => [
				...currentState,
				{ pcDOMid: elId, DOMPath: selector, keyName: `untitled_${small_id}` },
			]);
		}
	};

	useEffect(() => {
		if (iframeRef.current) {
			const iframeDoc = iframeRef.current.contentDocument;
			let refreshTargets = iframeDoc.querySelectorAll("[data-target-id]");
			refreshTargets.forEach((e) => {
				e.removeAttribute("data-target-id");
				e.removeAttribute("data-scrape");
			});
			if (iframeDoc) {
				scrapeTargets.forEach((t) => {
					let tElement = iframeDoc.querySelector(t.DOMPath);
					tElement.setAttribute("data-scrape", "selected");
					tElement.setAttribute("data-target-id", t.pcDOMid);
				});
			}
		}
	}, [scrapeTargets]);

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
				<iframe srcDoc={html} sandbox="allow-scripts allow-same-origin" ref={iframeRef} onLoad={handleDOMONLoad} />
			</>
		);
	} else {
		return null;
	}
}
