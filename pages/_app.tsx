import "@/styles/globals.css";
import "antd-css-utilities/utility.min.css";
import type { AppProps } from "next/app";
import { ConfigProvider, Button } from "antd";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#645CBB",
					fontFamily: "Lato, sans-serif",
				},
			}}
		>
			<Component {...pageProps} />
		</ConfigProvider>
	);
}
