// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from "@/database/connection";
import type { NextApiRequest, NextApiResponse } from "next";
import Crawler from "../../../model/Crawler.model";

export const config = {
	api: {
		externalResolver: true,
	},
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	connectMongo().catch((err) => {
		return res.status(500).send({ status: false, message: "DB connectivity error" });
	});
	if (req.method !== "POST") {
		return res.status(405).send({ status: false, message: "Ivalid HTTP method only POST allowed" });
	}

	if (!req.body || JSON.stringify(req.body) === "{}") {
		return res.status(400).send({ status: false, message: "Payload missing" });
	}
	const { apiName, targetUrl, crawlTargets, crawlType, HTMLDOM, userId } = req.body;
	//@ts-ignore
	Crawler.create({ apiName, targetUrl, crawlTargets, crawlType, HTMLDOM, user: userId }, function (err, data) {
		if (err) return res.status(502).send({ status: false, message: "error while creating the user", stack: err });
		res.status(200).send({ status: true, data });
	});
}
