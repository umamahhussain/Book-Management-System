import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import { Player } from "@lottiefiles/react-lottie-player";



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
