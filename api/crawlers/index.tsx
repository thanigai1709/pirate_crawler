// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from "@/database/connection";
import type { NextApiRequest, NextApiResponse } from "next";
import Crawler from "@/model/Crawler.model";

export const config = {
	api: {
		externalResolver: true,
		bodyParser: {
			sizeLimit: "20mb", // Set desired value here
		},
	},
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	connectMongo().catch((err) => {
		return res.status(500).send({ status: false, message: "DB connectivity error" });
	});
	if (req.method !== "GET") {
		return res.status(405).send({ status: false, message: "Ivalid HTTP method only GET allowed" });
	}

	const { id } = req.query;

	if (id && id != undefined) {
		//@ts-ignore
		const crawler = await Crawler.findById(id).select("-HTMLDOM").populate("user");
		if (!crawler) return res.status(404).send({ status: false, message: "Crawler not found" });
		res.status(200).send({ status: true, crawler });
	} else {
		//@ts-ignore
		const crawler = await Crawler.find().populate("user");
		res.status(200).send({ status: true, crawler });
	}
}
