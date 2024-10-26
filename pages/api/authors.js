import { getAllAuthors } from "@/helper";

export default async function handler( req, res ) {
    try {
        const authors = await getAllAuthors()
        return res.status(200).json(authors)
    } catch (error) {
        console.error("Error fetching events", error);
		res.status(500).json({ error: "Internal Server Error" });
    }
    
}