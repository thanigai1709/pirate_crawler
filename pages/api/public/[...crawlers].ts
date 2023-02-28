import { NextApiRequest, NextApiResponse } from "next";
import User from "@/model/User.model";
import Crawler from "@/model/Crawler.model";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "GET") {
			res.status(405).send({ message: "Only GET requests allowed" });
			return;
		}
		//@ts-ignore
		const params = req.query.crawlers;
		const { apiKey } = req.query;
		if (params.length < 1) return res.status(400).send({ message: "Invalid request format" });
		//@ts-ignore
		const user = await User.findOne({ apiKey: apiKey });
		if (!user) return res.status(401).send({ message: "Invalid API key" });
		//@ts-ignore
		const crawler = await Crawler.findOne({ _id: params[0] });
		if (!crawler) return res.status(404).send({ message: "API resource not found" });
		let crawlerData = await axios.post(`${process.env.SCRAPPER_URL}/crawl-targets`, {
			crawler: {
				targetUrl: crawler.targetUrl,
				crawlTargets: crawler.crawlTargets,
			},
		});
		res.status(crawlerData.status).send(crawlerData.data);
	} catch (error: any) {
		if (error.response) {
			res.status(error.response.status).send(error.response.data);
		} else {
			res.status(500).send({ status: false, err: error.message });
		}
	}
};
