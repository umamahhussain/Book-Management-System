import { getGenres } from "@/helper"
import { Player } from "@lottiefiles/react-lottie-player";
import { Card } from "@/components/Card";


export default function Genres({BookGenre}){
	return (
		<div className="moving-gradient">
			<div className="heading-container">
				<h1 className="heading">Genres</h1>
				<Player
					autoplay
					loop
					src="/animations/author.json"
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
				{BookGenre.map((obj) => {
					return (
						<Card
							key={obj.id}
							title={obj.name}
							image={obj.image}
							id={obj.id}
							path="/genres/"
						/>
					);
				})}
			</div>
		</div>
	);
}





export async function getServerSideProps(context) {
		
	const BookGenre = await getGenres()

	return {
		props: {
			BookGenre
		},
	};
}
