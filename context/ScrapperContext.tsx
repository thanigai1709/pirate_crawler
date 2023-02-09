import React, { useState, createContext, useEffect } from "react";
import { ScrapeTarget } from "../types/index";

interface ScrapperContextProps {
	targetUrl: string;
	setTargetUrl: (targetUrl: string) => void;
	scrapeTargets: ScrapeTarget[] | [];
	setScrapeTargets: (scrapeTargets: ScrapeTarget[]) => void;
	isLoading: Boolean;
	html: string | null;
	updateTargets: (target: ScrapeTarget) => void;
}

export const ScrapperContext = createContext<ScrapperContextProps>({
	targetUrl: "",
	setTargetUrl: () => {},
	scrapeTargets: [],
	setScrapeTargets: () => {},
	isLoading: false,
	html: null,
	updateTargets: () => {},
});

const ScrapperProvider = ({ children }: any) => {
	const [targetUrl, setTargetUrl] = useState<string>("");
	const [scrapeTargets, setScrapeTargets] = useState<ScrapeTarget[] | []>([]);
	const [isLoading, setLoading] = useState<Boolean>(false);
	const [html, setHtml] = useState<string | null>(null);

	useEffect(() => {
		if (targetUrl != "") {
			setLoading(true);
			fetch(`/api/fetch-webpage?url=${encodeURIComponent(targetUrl)}`)
				.then((response) => response.json())
				.then((res: any) => {
					setHtml(res.page);
					setLoading(false);
				})
				.catch((e) => {
					console.error(e);
					setLoading(false);
				});
		}
	}, [targetUrl]);

	const updateTargets = (target: ScrapeTarget) => {
		let targetData: ScrapeTarget[] = scrapeTargets;
		targetData.push(target);
		setScrapeTargets(targetData);
	};

	return (
		<ScrapperContext.Provider
			value={{ targetUrl, setTargetUrl, scrapeTargets, setScrapeTargets, isLoading, html, updateTargets }}
		>
			{children}
		</ScrapperContext.Provider>
	);
};

export default ScrapperProvider;
