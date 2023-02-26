// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from "@/database/connection";
import type { NextApiRequest, NextApiResponse } from "next";
import Crawler from "../../../model/Crawler.model";

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
	if (req.method !== "PUT") {
		return res.status(405).send({ status: false, message: "Ivalid HTTP method only PUT allowed" });
	}

	if (!req.body || JSON.stringify(req.body) === "{}" || !req.body.crawlID) {
		return res.status(400).send({ status: false, message: "Payload missing" });
	}
	const { apiName, crawlTargets, crawlType, crawlID } = req.body;
	try {
		//@ts-ignore
		let updatedData = await Crawler.findOneAndUpdate(
			{ _id: crawlID },
			{ apiName, crawlTargets, crawlType },
			{ new: true }
		);
		if (!updatedData) return res.status(404).send({ status: false, message: "Record not found" });
		res.status(200).send({ status: true, updatedData });
	} catch (error) {
		return res.status(502).send({ status: false, message: "error while updating the crawler", stack: error });
	}
}
