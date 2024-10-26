import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");

	

	return (
		<div className="merriweather">
			<nav
				className="navbar navbar-expand-lg bg-body-tertiary merriweather-regular"
				data-bs-theme="dark"
			>
				<div className="container-fluid">
					<Link className="navbar-brand" style={{fontSize:'23px'}} href="http://localhost:3000">
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
							<li className="nav-item">
								<Link className="nav-link" href="/home">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/genres">
									Genres
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/authors">
									Authors
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/books">
									Books
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href="/info">
									About
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}
