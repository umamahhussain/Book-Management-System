import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbHelper";
import User from "@/models/user";

const SECRET_KEY = "ly"; // Same key used during token generation

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		return res.status(401).json({ message: "No token provided" });
	}

	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		await dbConnect();
		const user = await User.findById(decoded.id).select("-password"); // Exclude sensitive fields
		if (!user) {
			return res.status(401).json({ message: "Invalid token" });
		}
		res.status(200).json({ user });
	} catch (error) {
		console.error("Token verification error:", error);
		res.status(401).json({ message: "Invalid token" });
	}
}
