import Head from "next/head";
import { Card, Typography } from "antd";
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
const { Title } = Typography;

export default function Admin() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<DashboardLayout>
				<div className="container">
					<Title level={2}>Dashboard</Title>
					<Card style={{ width: 700 }}>
						<p>
							Pirate Crawler is the ultimate tool for web scraping and data extraction. Our platform allows you to
							easily create dynamic API endpoints to scrape data from any webpage, simply by providing the URL. With
							Pirate Crawler, you can extract data from any website, regardless of its structure or complexity. Our
							advanced algorithms can handle even the most challenging scraping tasks, such as navigating through AJAX
							and JavaScript-based websites.
						</p>
					</Card>
				</div>
			</DashboardLayout>
		</>
	);
}
