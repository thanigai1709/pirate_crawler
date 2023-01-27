import React, { useState, createContext, useEffect } from "react";

interface ScrapeTarget {
	tempId: string;
	selector: string;
}

interface ScrapperContextProps {
	targetUrl: string;
	setTargetUrl: (targetUrl: string) => void;
	scrapeTargets: ScrapeTarget[] | [];
	setScrapeTargets: (scrapeTargets: ScrapeTarget[]) => void;
	isLoading: Boolean;
	html: string | null;
}

export const ScrapperContext = createContext<ScrapperContextProps>({
	targetUrl: "",
	setTargetUrl: () => {},
	scrapeTargets: [],
	setScrapeTargets: () => {},
	isLoading: false,
	html: null,
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

	return (
		<ScrapperContext.Provider value={{ targetUrl, setTargetUrl, scrapeTargets, setScrapeTargets, isLoading, html }}>
			{children}
		</ScrapperContext.Provider>
	);
};

export default ScrapperProvider;
