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
}

export const ScrapperContext = createContext<ScrapperContextProps>({
	targetUrl: "",
	setTargetUrl: () => {},
	scrapeTargets: [],
	setScrapeTargets: () => {},
	isLoading: false,
});

const ScrapperProvider = ({ children }: any) => {
	const [targetUrl, setTargetUrl] = useState<string>("");
	const [scrapeTargets, setScrapeTargets] = useState<ScrapeTarget[] | []>([]);
	const [isLoading, setLoading] = useState<Boolean>(false);

	useEffect(() => {}, [targetUrl]);

	return (
		<ScrapperContext.Provider value={{ targetUrl, setTargetUrl, scrapeTargets, setScrapeTargets, isLoading }}>
			{children}
		</ScrapperContext.Provider>
	);
};

export default ScrapperProvider;
