import { Html, Head, Main, NextScript } from "next/document";
import { useTheme } from "@/context/ThemeContext";

export default function Document() {
	return (
		<Html>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
