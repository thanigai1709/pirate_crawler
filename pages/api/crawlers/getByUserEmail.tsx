// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from "@/database/connection";
import type { NextApiRequest, NextApiResponse } from "next";
import Crawler from "../../../model/Crawler.model";
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
	if (req.method !== "GET") {
		return res.status(405).send({ status: false, message: "Ivalid HTTP method only GET allowed" });
	}

	const { email } = req.query;
	if (!email) return res.status(400).send({ status: false, message: "Email param missing" });
	try {
		if (email && email != undefined) {
			//@ts-ignore
			const user = await User.findOne({ email }).select("_id");
			if (!user) return res.status(404).send({ status: false, message: "User not found" });
			//@ts-ignore
			const crawler = await Crawler.find({ user: user._id }).select("-HTMLDOM");
			if (!crawler) return res.status(404).send({ status: false, message: "Crawlers not found" });
			res.status(200).send({ status: true, crawler });
		}
	} catch (error) {
		return res.status(502).send({ status: false, message: "error while updating the crawler", stack: error });
	}
}
