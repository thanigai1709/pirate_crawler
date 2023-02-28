import Head from "next/head";
import React from "react";
import PageLayout from "@/components/PageLayout";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Lottie from "react-lottie-player";
import catHero from "@/public/static/cat-hero.json";

export default function Home() {
	return (
		<>
			<Head>
				<title>CopyKat, the best web scraping API.</title>
				<meta
					name="description"
					content="CopyKat is a Web Scraping API that handles proxies and Headless browser for you, so you can focus on extracting the data you want, and nothing else."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<PageLayout>
				<section className={styles.Hero_section}>
					<div className={styles.Hero_Container}>
						<div className={styles.Hero_Text}>
							<h1>Tired of getting blocked while scraping the web?</h1>
							<p>The CopyKat web scraping API handles headless browsers and rotates proxies for you.</p>
							<div>
								<Link href="/dashboard">Try CopyKat for Free</Link>
							</div>
						</div>
						<div className={styles.Hero_CopyKatBanner}>
							<Lottie animationData={catHero} loop={true} play />
						</div>
					</div>
				</section>
			</PageLayout>
		</>
	);
}
