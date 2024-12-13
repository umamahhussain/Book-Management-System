import dbConnect from "@/lib/dbHelper";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = "ly"; // Replace with a secure secret in environment variables

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	await dbConnect();

	const { email, password } = req.body;

	// Check if the user exists
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

	// Compare the hashed password
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).json({ message: "Invalid email or password" });
	}

	// Generate a token
	const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
		expiresIn: "1h",
	});

	res.status(200).json({ token, user: { email: user.email, name: user.name } });
}
