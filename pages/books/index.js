import path from "path";
import fs from "fs/promises";
import {Card} from "@/components/Card";
import { Player } from "@lottiefiles/react-lottie-player";
import Radio from "@/components/Radio";
import { useState, useEffect } from "react";

export default function Books({ booksData, genreData }) {
	const [selectedGenre, setSelectedGenre] = useState(0); // Default to 0 for no filter
	const [filteredBooks, setFilteredBooks] = useState(null);

	const handleGenre = (params) => {
		console.log(params);
		setSelectedGenre(params); // Update selected genre
	};

	useEffect(() => {
		const newArr = booksData.filter((obj) => obj.genreId === selectedGenre);
		console.log(newArr);
		setFilteredBooks(newArr); // Update filteredBooks state with the filtered array
	}, [selectedGenre, booksData]);

	return (
		<div className="moving-gradient">
			<div className="heading-container">
				<h1 className="heading">Books</h1>
				<Player
					autoplay
					loop
					src="/animations/bookStack.json"
					style={{
						height: "150px",
						width: "150px",
						marginLeft: "10px",
					}}
					className="lottie"
				/>
			</div>

			<div className="radio-container">
				{genreData.map((obj) => {
					return (
						<Radio
							key={obj.id}
							title={obj.name}
							onChange={() => handleGenre(obj.id)} // Pass the selected genre ID to the handler
						/>
					);
				})}
				<Radio
					key="99"
					title="None"
					onChange={() => handleGenre("")} // Pass the selected genre ID to the handler
				/>
			</div>

			<div className="cards-container">
				{(filteredBooks && filteredBooks.length > 0
					? filteredBooks
					: booksData
				).map((obj) => {
					return (
						<Card
							key={obj.id}
							title={obj.title}
							author={obj.author}
							image={obj.image}
							id={obj.id}
							path="/books/"
						/>
					);
				})}
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const filePath = path.join(process.cwd(), "Data.json");
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	  if (!data) {
			return {
				notFound: true, // This will return a 404 page
			};
		}

	return {
		props: {
			booksData: data.books,
			genreData: data.genres,
		},
		revalidate:1000
	};
}
