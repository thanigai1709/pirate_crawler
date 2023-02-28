// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "GET") {
			res.status(405).send({ message: "Only GET requests allowed" });
			return;
		}
		if (!req.query.url) {
			res.status(400).send({ message: "Invalid request format" });
			return;
		}
		const { url } = req.query;

		let webpage = await axios.get(`${process.env.SCRAPPER_URL}/fetch-page/?url=${url}`);
		res.status(webpage.status).send(webpage.data);
	} catch (error: any) {
		if (error.response) {
			res.status(error.response.status).send(error.response.data);
		} else {
			res.status(500).send({ status: false, err: error.message });
		}
	}
}
