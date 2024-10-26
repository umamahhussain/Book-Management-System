import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import { Player } from "@lottiefiles/react-lottie-player";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function MainPage() {
  return (
		<>
			<div className="full-page moving-gradient">
				<div className="content-wrapper">
					<h1 className="heading">Book Store</h1>
					<p className="tagline">
						Discover your next favorite book — the perfect escape is just a page
						away!
					</p>
				</div>
				<Player
					autoplay
					loop
					src="/animations/books.json"
					style={{ height: "300px", width: "300px" }}
					className="lottie"
				/>
			</div>
		</>
	);
}
