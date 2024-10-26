import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

export default function NotFound() {
	return (
		<>
			<div className="full-page moving-gradient">
				<div className="content-wrapper">
					<h1 className="heading">404 - Uh-oh! You seem lost...</h1>
					<p className="tagline">
						It looks like you have taken a wrong turn, but do not worry, we will get
						you back on track!
					</p>
					
					<Link
						href="http://localhost:3000/"
						className="btn btn-dark merriweather"
						style={{ marginTop: "20px", fontSize: "18px" }}
					>
						Back to Home 🕊️
					</Link>
				</div>
				<Player
					autoplay
					loop
					src="/animations/notfound.json"
					style={{ height: "300px", width: "300px" }}
					className="lottie"
				/>
			</div>
		</>
	);
}
