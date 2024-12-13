import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
	return (props) => {
		const { user, loading } = useUser();
		const router = useRouter();

		useEffect(() => {
			if (!loading && !user) {
				router.push("/login");
			}
		}, [user, loading, router]);

		if (loading) {
			return <div>Loading...</div>; // Prevent redirect during session verification
		}

		if (!user) {
			return null; // Optionally, return a placeholder
		}

		return <WrappedComponent {...props} />;
	};
};

export default withAuth;
