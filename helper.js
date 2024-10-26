import path from "path";
import fs from "fs/promises";

export async function getAllAuthors() {
	const filePath = path.join(process.cwd(), "Data.json");
	const jsonData = await fs.readFile(filePath, "utf8");
	const data = JSON.parse(jsonData);

	return data.authors; // Return the authors array from the JSON
}

export async function getAllBooks() {
	const filePath = path.join(process.cwd(), "Data.json");
	const jsonData = await fs.readFile(filePath, "utf8");
	const data = JSON.parse(jsonData);
	
	return data.books; // Return the authors array from the JSON
}

export async function getFeaturedBooks() {
	const filePath = path.join(process.cwd(), "Data.json");
	const jsonData = await fs.readFile(filePath, "utf8");
	const data = JSON.parse(jsonData);

	const featured = data.books.filter((book) => book.featured === true);

	return featured; 
}


export async function getGenres() {
	const filePath = path.join(process.cwd(), "Data.json");
	const jsonData = await fs.readFile(filePath, "utf8");
	const data = JSON.parse(jsonData);

	const genre = data.genres

	return genre;
}



export async function getAuthorDetailsById(bookId) {

	const filePath = path.join(process.cwd(), "Data.json");
	const jsonData = await fs.readFile(filePath, "utf8");
	const data = JSON.parse(jsonData);

	// Find the book by its ID
	const book = data.books.find((obj) => obj.id === bookId);
	const author = data.authors.find((obj) => obj.id === book.authorId);

	return author;
}
