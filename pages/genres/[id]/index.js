import path from "path";
import fs from "fs/promises";
import { Card } from "@/components/Card";
import { useRouter } from "next/router";

export default function GenreBooksPage({ books, genre }) {
	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<div className="moving-gradient">
			<div className="heading-container">
				<h1 className="heading">{genre.name}</h1>
			</div>

			<div className="cards-container">
				{books.map((book) => (
					<Card
						key={book.id}
						title={book.title}
						image={book.image}
						id={book.id}
                        path="/books/"
					/>
				))}
			</div>
		</div>
	);
}

export async function getStaticProps({ params }) {
	const filePath = path.join(process.cwd(), "Data.json");
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	// Find all books in the genre
	const books = data.books.filter((book) => book.genreId === params.id);

	// Get the genre details
	const genre = data.genres.find((g) => g.id === params.id);

	// If no books or genre is found, return a 404 page
	if (!books.length || !genre) {
		return { notFound: true };
	}

	return {
		props: {
			books,
			genre,
		},
	};
}

export async function getStaticPaths() {
	const filePath = path.join(process.cwd(), "Data.json");
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	// Create paths for each genre
	const paths = data.genres.map((genre) => ({
		params: { id: genre.id },
	}));

	return {
		paths,
		fallback: false,
	};
}
