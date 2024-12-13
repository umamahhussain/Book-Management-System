import { useRef } from "react";

export default function SignUp() {
	const emailRef = useRef();
	const nameRef = useRef();
	const passRef = useRef();

	const handleSignUp = async () => {
		const email = emailRef.current.value;
		const name = nameRef.current.value;
		const password = passRef.current.value;

		try {
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, name, password }),
			});

			const data = await response.json();
			if (response.ok) {
				alert("Sign Up successful! You can now log in.");
				window.location.href = "/login";
			} else {
				alert(`Error: ${data.message}`);
			}
		} catch (error) {
			console.error("Error during signup:", error);
			alert("An unexpected error occurred. Please try again.");
		}
	};

	return (
		<div
			className="signup mb-5 mt-5 merriweather"
			style={{ justifyItems: "center" }}
		>
			<div className="card" style={{ width: "50rem", alignContent: "center" }}>
				<h2 className="card-header" style={{ textAlign: "center" }}>
					Book Store
				</h2>
				<div className="card-body">
					<h4 className="card-title">Sign Up</h4>

					<div className="mb-3">
						<label htmlFor="name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control"
							id="name"
							ref={nameRef}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Email address
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							ref={emailRef}
							aria-describedby="emailHelp"
						/>
						<div id="emailHelp" className="form-text">
							We'll never share your email with anyone else.
						</div>
					</div>

					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							ref={passRef}
						/>
					</div>

					<button className="btn btn-primary" onClick={handleSignUp}>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}
