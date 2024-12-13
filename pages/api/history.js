import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../lib/mongodb"; // Ensure you have your MongoDB connection logic here
import User from "../../../models/User";

export default async function handler(req, res) {
	await connectDb(); // Ensure the database connection is established

	const { userId } = req.query; // Extract userId from the query parameters

	if (req.method === "GET") {
		try {
			// Retrieve the user's search history from MongoDB
			const user = await User.findById(userId).select("searchHistory"); // Select only searchHistory field
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			return res.status(200).json(user.searchHistory);
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Error retrieving search history" });
		}
	}

	if (req.method === "POST") {
		const { query } = req.body;

		// Basic validation
		if (!query || !userId) {
			return res.status(400).json({ message: "Query and userId are required" });
		}

		try {
			// Find the user and update their search history
			const user = await User.findById(userId);
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			// Add the new query to the user's search history
			user.searchHistory.push({ query });
			await user.save(); // Save the updated user document

			return res
				.status(201)
				.json({ message: "Query added", searchHistory: user.searchHistory });
		} catch (error) {
			return res
				.status(500)
				.json({ message: "Error adding query to search history" });
		}
	}

	// Method Not Allowed
	return res.status(405).json({ message: "Method not allowed" });
}
