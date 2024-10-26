// pages/books/[id]/author.js
import { useRouter } from "next/router";
import { getAuthorDetailsById } from "@/helper"; // Assuming you have this function in helper to fetch author details
import { DetailedCard } from "@/components/Card";
import { Player } from "@lottiefiles/react-lottie-player";



export default function DetailedAuthorPage({ author }) {
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

// Fetch author details based on the book ID
export async function getServerSideProps(context) {
	const { id } = context.params; // This is the book ID
	const author = await getAuthorDetailsById(id); // Fetch the author based on book ID

	return {
		props: {
			author,
		},
	};
}
