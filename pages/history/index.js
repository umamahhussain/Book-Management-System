import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext"; // Import your user context

export default function SearchHistoryPage() {
	const { user } = useUser(); // Get the user from context
	const [history, setHistory] = useState([]);

	useEffect(() => {
		const fetchHistory = async () => {
			if (!user || !user._id) {
				console.error("User not authenticated or user ID is missing.");
				return; // Exit if user is not authenticated
			}

			const response = await fetch("/api/getSearchHistory", {
				method: "POST", // Use POST if you're sending data
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ userId: user._id }), // Send user ID in the request body
			});

			if (response.ok) {
				const data = await response.json();
				setHistory(data.history);
			} else {
				console.error("Failed to fetch search history");
			}
		};

		fetchHistory();
	}, [user]); // Depend on user state

	return (
		<div className="container">
			<h1>Your Search History</h1>
			<ul>
				{history.map((item, index) => (
					<li key={index}>
						<a href={item.url} target="_blank" rel="noopener noreferrer">
							{item.query}
						</a>
						<span> - {new Date(item.timestamp).toLocaleString()}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
