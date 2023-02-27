// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectMongo from "@/database/connection";
import type { NextApiRequest, NextApiResponse } from "next";
import Crawler from "@/model/Crawler.model";

export const config = {
	api: {
		externalResolver: true,
	},
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	connectMongo().catch((err) => {
		return res.status(500).send({ status: false, message: "DB connectivity error" });
	});
	if (req.method !== "DELETE") {
		return res.status(405).send({ status: false, message: "Ivalid HTTP method only DELETE allowed" });
	}

	const { id } = req.query;

	if (!id || id == undefined) {
		return res.status(400).send({ status: false, message: "id param missing" });
	}

	try {
		let deletedRecord = await Crawler.findByIdAndDelete(id);
		if (!deletedRecord) return res.status(404).send({ status: false, message: "Record not found" });
		res.status(200).send({ status: true, deletedRecord });
	} catch (error) {
		return res.status(502).send({ status: false, message: "error while deleting the crawler", stack: error });
	}
}
