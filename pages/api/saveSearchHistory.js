import dbConnect from "@/lib/dbHelper";
import User from "@/models/user";

export default async function handler(req, res) {
	console.log("Received body:", req.body);

	if (req.method === "POST") {
		const { query, url, userId } = req.body;

		if (!userId) {
			return res
				.status(401)
				.json({ success: false, message: "User not authenticated" });
		}

		try {
			const updatedUser = await User.findByIdAndUpdate(
				userId,
				{ $push: { searchHistory: { query, url } } },
				{ new: true }
			);
			if (!updatedUser) {
				return res
					.status(404)
					.json({ success: false, message: "User not found" });
			}
			res.status(200).json({ success: true, data: updatedUser });
		} catch (error) {
			res.status(500).json({ success: false, error: error.message });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
