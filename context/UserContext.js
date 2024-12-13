import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Login function
	const login = async (email, password) => {
		const response = await fetch("/api/auth/signin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		if (response.ok) {
			const data = await response.json();
			setUser(data.user);
			console.log("User after login:", data.user); // Debugging: Ensure user is set
			localStorage.setItem("token", data.token); // Store token
			return data;
		} else {
			throw new Error("Login failed");
		}
	};


	// Logout function
	const logout = async () => {
		try {
			await fetch("/api/auth/logout", { method: "POST" });
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			setUser(null);
			localStorage.removeItem("token"); // Remove token from localStorage
		}
	};

	// Verify session on app load
	useEffect(() => {
		const verifySession = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				setLoading(false);
				return;
			}

			try {
				const response = await fetch("/api/auth/session", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.ok) {
					const data = await response.json();
					console.log("Session user:", data.user); // Debugging
					setUser(data.user);
				} else {
					localStorage.removeItem("token");
				}
			} catch (error) {
				console.error("Session verification error:", error);
			} finally {
				setLoading(false);
			}
		};

		verifySession();
	}, []);


	return (
		<UserContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	return useContext(UserContext);
}
