import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../model/User.model";
import { hash } from "bcryptjs";
import connectMongo from "@/database/connection";

export const config = {
	api: {
		externalResolver: true,
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
	const { username, email, password } = req.body;
	//@ts-ignore
	const checkExist = await User.findOne({ email });
	if (checkExist) return res.status(409).send({ status: false, message: "User already exist" });
	try {
		//@ts-ignore
		User.create(
			{
				username,
				email,
				password: await hash(password, 12),
				auth_provider: "credentials",
				apiKey: await hash("34feb914c099df25794bf9", 12),
			},
			function (err, data) {
				if (err) return res.status(502).send({ status: false, message: "error while creating the user", stack: err });
				res.status(200).send({ status: true, user: data });
			}
		);
	} catch (error) {
		return res.status(502).send({ status: false, message: "error while updating the crawler", stack: error });
	}
}
