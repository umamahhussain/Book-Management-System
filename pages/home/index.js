import useSWR from "swr";
import { Player } from "@lottiefiles/react-lottie-player";
import { Card } from "@/components/Card"; 

// Fetcher function to use with SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
	// Fetch featured books using SWR
	const { data, error } = useSWR("/api/featuredBooks", fetcher);

	if (error) return <div>Failed to load featured books</div>;
	if (!data) return <div>Loading...</div>;

	return (
		<div className="moving-gradient">
			<div className="heading-container">
				<h1 className="heading">Featured Books</h1>
				<Player
					autoplay
					loop
					src="/animations/bookStack.json"
					style={{
						height: "100px",
						width: "100px",
						marginLeft: "10px",
						marginBottom: "10px",
					}}
					className="lottie"
				/>
			</div>

			<div className="cards-container">
				{data.map((obj) => {
					return (
						<Card
							key={obj.id}
							title={obj.title} 
							image={obj.image}
							id={obj.id}
							path="/books/"
						/>
					);
				})}
			</div>
		</div>
	);
}
