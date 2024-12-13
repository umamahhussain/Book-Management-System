import dbConnect from "@/lib/dbHelper";
import User from "@/models/user";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { userId } = req.body;

		if (!userId) {
			return res
				.status(401)
				.json({ success: false, message: "User not authenticated" });
		}

		try {
			await dbConnect();
			const user = await User.findById(userId);

			if (!user) {
				return res
					.status(404)
					.json({ success: false, message: "User not found" });
			}

			res.status(200).json({ success: true, history: user.searchHistory });
		} catch (error) {
			res.status(500).json({ success: false, error: error.message });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
