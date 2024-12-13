import dbConnect from "@/lib/dbHelper";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { useRouter } from "next/router";

export default async function signup(req, res) {


	if (req.method === "POST") {
		try {
			await dbConnect();

			const { email, name, password } = req.body;

			// Validate input
			if (!email || !name || !password) {
				return res.status(400).json({ message: "All fields are required." });
			}

			// Check if user already exists
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(400).json({ message: "Email already in use." });
			}

			// Hash the password
			const hashedPassword = await bcrypt.hash(password, 10);

			// Create the user
			const newUser = new User({
				email,
				name,
				password: hashedPassword,
			});
			await newUser.save();

			return res.status(201).json({ message: "User created successfully!" });
            

		} catch (error) {
			console.error("Error during signup:", error);
			return res.status(500).json({ message: "Internal Server Error" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
