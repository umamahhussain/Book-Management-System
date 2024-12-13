import { useRef } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";

export default function Login() {
	const emailRef = useRef();
	const passRef = useRef();
	const router = useRouter()
	const { login } = useUser();

	
const handleClick = async () => {
	const email = emailRef.current.value;
	const password = passRef.current.value;
	try {
		await login(email, password);
		alert("Login successful!");
		router.push("/home"); // Use Next.js router for navigation
	} catch (error) {
		console.error(error);
		alert("Login failed!");
	}
};




	return (
		<div
			className="login mb-5 mt-5 merriweather"
			style={{ justifyItems: "center" }}
		>
			<div className="card" style={{ width: "50rem", alignContent: "center" }}>
				<h2 className="card-header" style={{ textAlign: "center" }}>
					Book Store
				</h2>
				<div className="card-body">
					<h4 className="card-title">Sign In</h4>

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

					<button className="btn btn-primary" onClick={handleClick}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
