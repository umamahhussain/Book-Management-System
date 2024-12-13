import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import data from "../../bookstore/Data.json"; // Adjust the path to your JSON file

export default function Navbar() {
	const { user, logout } = useUser();
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredResults, setFilteredResults] = useState([]);
	const router = useRouter();

	// Function to filter results based on search query
	const handleSearch = (e) => {
		const query = e.target.value;
		setSearchQuery(query);

		if (query) {
			const regex = new RegExp(query, "i"); // Case-insensitive search
			const bookResults = data.books
				.filter((book) => regex.test(book.title))
				.map((book) => ({ ...book, type: "book" })); // Add type to book results
			const authorResults = data.authors
				.filter((author) => regex.test(author.name))
				.map((author) => ({ ...author, type: "author" })); // Add type to author results
			setFilteredResults([...bookResults, ...authorResults]); // Combine results
		} else {
			setFilteredResults([]); // Clear results if input is empty
		}
	};

	const handleSelect = async (id, type, name) => {
		console.log(name)
		if (!user) {
			console.error("User is not logged in.");
			router.push("/login"); // Redirect to login if user is not logged in
			return;
		}

		const url = type === "book" ? `/books/${id}` : `/authors/${id}`;
		console.log("Sending search history:", {
			query: name,
			url,
			userId: user._id,
		});

		try {
			const response = await fetch("/api/saveSearchHistory", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					query: name,
					url,
					userId: user._id,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error("Failed to save search history:", errorData);
			} else {
				console.log("Search history saved!");
			}

			// Navigate to the selected page
			router.push(url);
		} catch (error) {
			console.error("Error saving search history:", error);
		}

		setSearchQuery("");
		setFilteredResults([]);
	};

	return (
		<div className="merriweather">
			<nav
				className="navbar navbar-expand-lg bg-body-tertiary merriweather-regular"
				data-bs-theme="light"
			>
				<div className="container-fluid">
					<Link className="navbar-brand" style={{ fontSize: "23px" }} href="/">
						Book Store
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarTogglerDemo02"
						aria-controls="navbarTogglerDemo02"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li>
								<Link className="nav-link" href="/home">
									Home
								</Link>
							</li>
							<li>
								<Link className="nav-link" href="/genres">
									Genres
								</Link>
							</li>
							<li>
								<Link className="nav-link" href="/books">
									Books
								</Link>
							</li>
							<li>
								<Link className="nav-link" href="/authors">
									Authors
								</Link>
							</li>
							<li>
								<Link className="nav-link" href="/info">
									About
								</Link>
							</li>
							<li>
								<Link className="nav-link" href="/signup">
									Register
								</Link>
							</li>
							<li>
								<Link className="nav-link" href="/history">
									History
								</Link>
							</li>
						</ul>
						<div className="position-relative">
							<input
								type="text"
								className="form-control me-2"
								placeholder="Search..."
								value={searchQuery}
								onChange={handleSearch}
								aria-label="Search"
							/>
							{filteredResults.length > 0 && (
								<ul
									className="dropdown-menu show"
									style={{ position: "absolute", zIndex: 1000 }}
								>
									{filteredResults.map((item) => (
										<li key={item.id}>
											<a
												className="dropdown-item"
												href="#"
												onClick={(e) => {
													e.preventDefault(); // Prevent default behavior
													handleSelect(
														item.id,
														item.type,
														item.title || item.name
													);
												}}
											>
												{item.title || item.name}{" "}
												{/* Display book title or author name */}
											</a>
										</li>
									))}
								</ul>
							)}
						</div>
						{user ? (
							<div className="d-flex align-items-center ms-3">
								<span className="me-2" style={{ color: "black" }}>
									Welcome, {user.name}
								</span>
								<button className="btn btn-danger" onClick={logout}>
									Logout
								</button>
							</div>
						) : (
							<Link href="/login" className="btn btn-primary ms-3">
								Log In
							</Link>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
}
