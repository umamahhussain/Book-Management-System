import useSWR from "swr";
import { Card } from "@/components/Card";
import { Player } from "@lottiefiles/react-lottie-player";

// SWR fetcher function to get data from the API
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Authors() {
	// Use SWR to fetch data from the `/api/authors` endpoint
	const { data, error } = useSWR("/api/authors", fetcher);

	if (error) return <div>Failed to load authors</div>;
	if (!data) return (
		<div  className="flex col-sm-12 justify-center">
			<h5>Loading</h5>
		</div>
	);

	// If data is available, render the author cards
	return (
		<div className="moving-gradient">
			<div className="heading-container">
				<h1 className="heading">Authors</h1>
				<Player
                    autoplay
                    loop
                    src="/animations/author.json"
                    style={{
                        height: "100px",
                        width: "100px",
                        marginLeft: "10px",
						marginBottom:'10px'
                    }}
                    className="lottie"
                />
			</div>

			<div className="cards-container">
				{data.map((obj) => {
					return (
						<Card key={obj.id} title={obj.name} image={obj.image} id={obj.id} path="/authors/" />
					);
				})}
			</div>
		</div>
	);
}
