import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
		const browser = await puppeteer.launch(
			process.env.NODE_ENV === "production"
				? {
						args: chrome.args,
						executablePath: await chrome.executablePath,
						headless: chrome.headless,
				  }
				: {
						executablePath: "/usr/bin/google-chrome-stable",
						headless: true,
				  }
		);
		const page = await browser.newPage();
		await page.goto(String(url));
		await page.evaluate(() => {
			let links = document.querySelectorAll("a");
			links.forEach((element) => {
				element.setAttribute("href", "javascript:void(0)");
			});
		});
		const html: string = await page.content();
		await browser.close();
		res.status(200).send({ status: true, page: html });
	} catch (error: any) {
		res.status(500).send({ status: false, err: error.message });
	}
};
