import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // For CSS
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // For JavaScript


export default function App({ Component, pageProps }) {
	return (
		<>
			<Navbar></Navbar>
			<Component {...pageProps} />
		</>
	);
}
