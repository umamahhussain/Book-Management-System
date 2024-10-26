import { getFeaturedBooks } from "@/helper";

export default async function handler(req, res) {
	try {
		const featuredBooks = await getFeaturedBooks();
		res.status(200).json(featuredBooks);
	} catch (error) {
		console.error("Error fetching featured books:", error);
		res.status(500).json({ error: "Failed to fetch featured books" });
	}
}
