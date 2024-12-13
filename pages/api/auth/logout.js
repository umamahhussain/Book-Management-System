export default function handler(req, res) {
	if (req.method === "POST") {
		// Clear session/token logic if needed
		res.status(200).json({ message: "Logout successful" });
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
