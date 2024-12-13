import { notFound } from "next/navigation";
import { DetailedCard } from "@/components/Card";
import { Player } from "@lottiefiles/react-lottie-player";
import path from "path";
import fs from "fs/promises";
import withAuth from "@/lib/authRouting"; // Import your withAuth HOC

// Detailed Author Page Component
function DetailedAuthorPage({ author }) {
	return (
		<div
			className="rows full-page"
			style={{
				display: "flex",
				justifyContent: "space-evenly",
				backgroundColor: "gray",
			}}
		>
			{/* Author Image */}
			<div className="container col-sm-5">
				<DetailedCard
					key={author.id}
					title={author.name}
					image={author.image}
				/>
			</div>

			{/* Author Details */}
			<div className="container col-sm-7">
				<div className="heading-container" style={{ position: "relative" }}>
					<h1 className="heading">{author.name}</h1>
					{/* Animation */}
					<div style={{ textAlign: "right", marginTop: "-20px" }}>
						<Player
							autoplay
							loop
							src="/animations/twinkle.json"
							style={{
								height: "150px",
								width: "150px",
								marginRight: "10px",
							}}
						/>
					</div>
				</div>

				<h4 className="merriweather">{author.biography}</h4>
			</div>
		</div>
	);
}

// Wrap the component with withAuth
export default withAuth(DetailedAuthorPage);

// Fetch author details based on the author ID
export async function getServerSideProps(context) {
	const { params } = context;
	const filePath = path.join(process.cwd(), "Data.json");
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	// Find the author based on the ID from params
	const author = data.authors.find((obj) => obj.id === params.id);

	// If author is not found, return 404
	if (!author) {
		return { notFound: true };
	}

	return {
		props: {
			author,
		},
	};
}
