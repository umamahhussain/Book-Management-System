import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

export default function InfoPage() {
	return (
		<>
			<div className="full-page moving-gradient">
				<div className="content-wrapper">
					<h1 className="heading">Welcome to the Book Store!</h1>
					<p
						className="tagline"
						style={{ fontSize: "20px", color: "#fff", marginTop: "10px" }}
					>
						Your ultimate destination for the best books across every genre.
					</p>
				</div>

				<div
					className="info-content"
					style={{
						maxWidth: "800px",
						margin: "0 auto",
						color: "#f0f0f0",
						textAlign: "center",
					}}
				>
					<h3
						style={{ fontFamily: "Lobster, sans-serif", marginBottom: "20px" }}
					>
						Why You Will Love Our Book Store
					</h3>
					<p className="merriweather" style={{ marginBottom: "20px" }}>
						Whether you are a seasoned bookworm or a casual reader, we have
						tailored our selection to satisfy all tastes. Explore our wide range
						of books in Fiction, Adventure, Fantasy, Classics, and more!
					</p>
					<h4
						style={{
							fontFamily: "Lobster, sans-serif",
							marginBottom: "10px",
							marginTop: "100px",
						}}
					>
						What We Offer:
					</h4>

					<Link
						href="/books"
						className="btn btn-dark"
						style={{
							fontSize: "20px",
							padding: "10px 20px",
							textDecoration: "none",
						}}
					>
						Discover Our Collection 🕊️
					</Link>
				</div>
				<Player
					autoplay
					loop
					src="/animations/bookStack.json"
					style={{ height: "300px", width: "300px" }}
					className="lottie"
				/>
			</div>
		</>
	);
}
