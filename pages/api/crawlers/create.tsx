// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from "@/database/connection";
import type { NextApiRequest, NextApiResponse } from "next";
import Crawler from "@/model/Crawler.model";
import User from "@/model/User.model";

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
	if (req.method !== "POST") {
		return res.status(405).send({ status: false, message: "Ivalid HTTP method only POST allowed" });
	}

	if (!req.body || JSON.stringify(req.body) === "{}") {
		return res.status(400).send({ status: false, message: "Payload missing" });
	}
	const { apiName, targetUrl, crawlTargets, crawlType, HTMLDOM, userEmail } = req.body;
	try {
		//@ts-ignore
		let user = await User.findOne({ email: userEmail });
		if (!user) {
			return res.status(404).send({ status: false, message: "User not found" });
		}
		//@ts-ignore
		Crawler.create({ apiName, targetUrl, crawlTargets, crawlType, HTMLDOM, user: user._id }, function (err, data) {
			if (err) return res.status(502).send({ status: false, message: "error while creating the user", stack: err });
			res.status(200).send({ status: true, data });
		});
	} catch (error) {
		return res.status(502).send({ status: false, message: "error while updating the crawler", stack: error });
	}
}
