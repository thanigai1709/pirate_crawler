import puppeteer from "puppeteer";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/model/User.model";
import Crawler from "@/model/Crawler.model";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "GET") {
			res.status(405).send({ message: "Only GET requests allowed" });
			return;
		}
		//@ts-ignore
		const params = req.query.crawlers;
		if (params.length < 1) return res.status(400).send({ message: "Invalid request format" });
		//@ts-ignore
		const user = await User.findOne({ apiKey: params[0] });
		if (!user) return res.status(401).send({ message: "Invalid API key" });
		//@ts-ignore
		const crawler = await Crawler.findOne({ _id: params[1] });
		if (!crawler) return res.status(404).send({ message: "API resource not found" });
		const browser = await puppeteer.launch({
			headless: true,
		});
		const page = await browser.newPage();
		const selectors: any[] = crawler.crawlTargets;
		await page.goto(String(crawler.targetUrl));
		const data = await Promise.all(
			selectors.map(async (selector) => {
				let innerData = await page.$eval(selector.DOMPath, (el) => {
					return getElementData(el);
					function getElementData(el: HTMLElement): any {
						let data: any = {};
						data["tagName"] = el.tagName;
						data["classList"] = el.classList.toString();
						if (el.children.length === 0 && el.innerText != "") {
							data.innerText = el.innerText;
						}
						if (el.tagName === "IMG") {
							data["src"] = el.getAttribute("src");
						}
						if (el.tagName === "VIDEO") {
							data["src"] = el.getAttribute("src");
						}
						if (el.tagName === "IFRAME") {
							data["src"] = el.getAttribute("src");
						}
						if (el.tagName === "SVG") {
							data["svg"] = el.innerHTML;
						}

						if (el.tagName === "A") {
							data["href"] = el.getAttribute("href");
						}

						if (el.childNodes.length > 0) {
							data["childNodesRAW"] = el.innerHTML;
							data["childNodes"] = [];
							for (let i = 0; i < el.childNodes.length; i++) {
								if (el.childNodes[i].nodeType === 1) {
									data["childNodes"].push(getElementData(el.childNodes[i] as HTMLElement));
								}
							}
						}

						return data;
					}
				});
				return { [selector.keyName]: innerData };
			})
		);
		await browser.close();
		res.status(200).send({ status: true, data });
	} catch (error: any) {
		res.status(500).send({ status: false, err: error.message });
	}
};
