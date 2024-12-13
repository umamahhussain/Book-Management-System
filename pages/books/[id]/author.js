import { useRouter } from "next/router";
import { getAuthorDetailsById, getBookDetailsById } from "@/helper"; // Ensure both functions are available
import { DetailedCard } from "@/components/Card";
import { Player } from "@lottiefiles/react-lottie-player";
import withAuth from "@/lib/authRouting";

const DetailedAuthorPage = ({ author }) => {
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
};

// Wrap the component with withAuth
export default withAuth(DetailedAuthorPage);

// Fetch author details based on the book ID
export async function getServerSideProps(context) {
	const { id } = context.params; // This is the book ID
	const bookDetails = await getBookDetailsById(id); // Fetch the book details first
	const authorId = bookDetails.authorId; // Assuming bookDetails has an authorId field
	const author = await getAuthorDetailsById(authorId); // Now fetch the author based on the author ID

	return {
		props: {
			author,
		},
	};
}
