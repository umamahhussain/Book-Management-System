import path from "path";
import fs from "fs/promises";
import { notFound } from "next/navigation";
import { DetailedCard } from "@/components/Card";
import { Player } from "@lottiefiles/react-lottie-player";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import withAuth from "@/lib/authRouting"; // Import your withAuth HOC

// Detailed Book Page Component
function DetailedBookPage({ book, author, BookReviews, BookGenre, Usernames }) {
	const router = useRouter(); // Initialize the useRouter hook

	const handleAuthorClick = () => {
		router.push(`/authors/${author.id}`); // Navigate to the author page
	};

	const handleFeatureClick = () => {
		router.push(`/home`); // Navigate to the featured page
	};

	return (
		<div
			className="rows full-page mb-2 mt-2"
			style={{
				display: "flex",
				justifyContent: "space-evenly",
				backgroundColor: "gray",
			}}
		>
			{/* Book Cover */}
			<div className="container col-sm-5">
				<DetailedCard
					key={book.id}
					title={book.title}
					author={book.authorId}
					image={book.image}
					id={book.id}
				/>
			</div>

			{/* Book Details */}
			<div className="container col-sm-7">
				<div className="heading-container" style={{ position: "relative" }}>
					<h1 className="heading">{book.title}</h1>
					{/* Animation and Featured Label */}
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
						{book.featured && (
							<h5
								className="h4Heading"
								style={{ marginRight: "10px", cursor: "pointer" }}
								onClick={handleFeatureClick}
							>
								featured
							</h5>
						)}
					</div>
				</div>

				<h4 className="merriweather">{book.description}</h4>

				<div className="BookDetailHeading">
					<h4 className="h4Heading">Price:</h4>
					<h4 className="merriweather">{book.price}</h4>
				</div>
				<div className="BookDetailHeading">
					<h4 className="h4Heading">Rating:</h4>
					<h4 className="merriweather">{book.rating}</h4>
				</div>
				<div className="BookDetailHeading">
					<h4 className="h4Heading">Author:</h4>
					<h4
						className="merriweather"
						onClick={handleAuthorClick}
						style={{ cursor: "pointer" }}
					>
						{author.name}
					</h4>
				</div>
				<div className="BookDetailHeading">
					<h4 className="h4Heading">Genre:</h4>
					<h4 className="merriweather">{BookGenre.name}</h4>
				</div>
				<div className="BookDetailHeading">
					<h4 className="h4Heading">Reviews:</h4>
				</div>
				<div className="container col-sm-10">
					<ul className="review-list">
						{Usernames.map((obj) => {
							const review = BookReviews.find(
								(review) => obj.id === review.userId
							);
							return (
								<li key={obj.id} className="review-item">
									<h5 className="username-heading">{obj.username} : </h5>
									<p className="review-text">
										{review ? review.comment : "No review available"}
									</p>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}

// Wrap the component with withAuth
export default withAuth(DetailedBookPage);

// Fetch data for static generation
export async function getStaticProps({ params }) {
	const filePath = path.join(process.cwd(), "Data.json");
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	const book = data.books.find((obj) => obj.id === params.id);
	const author = data.authors.find((obj) => obj.id === book.authorId);
	const BookGenre = data.genres.find((obj) => obj.id === book.genreId);

	const BookReviews = data.reviews.filter((obj) => obj.bookId === book.id);

	const Usernames = BookReviews.map((review) => {
		return data.users.find((user) => user.id === review.userId);
	});

	if (!book) {
		return { notFound: true };
	}

	return {
		props: {
			book,
			author,
			BookReviews,
			BookGenre,
			Usernames,
		},
	};
}

// Define static paths for pre-rendering
export async function getStaticPaths() {
	const filePath = path.join(process.cwd(), "Data.json");
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	const paths = data.books.map((obj) => ({
		params: {
			id: obj.id,
		},
	}));

	return {
		paths,
		fallback: true,
	};
}
