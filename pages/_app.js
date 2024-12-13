import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme, ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/context/UserContext";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
	return (
		<UserProvider>
			<ThemeProvider>
				<ThemeWrapper>
					<Navbar />
					<Component {...pageProps} />
				</ThemeWrapper>
			</ThemeProvider>
		</UserProvider>
	);
}

function ThemeWrapper({ children }) {
	const { theme } = useTheme();

	useEffect(() => {
		document.body.className = theme;
	}, [theme]);

	return <>{children}</>;
}
