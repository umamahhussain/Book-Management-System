import Image from "next/image";
import { useRouter } from "next/router";

export function Card(props) {

	const path= useRouter().asPath
	console.log("Path Name is ",path)

	return (
		<div className="card22">
			<Image
				className="card22-img"
				src={props.image}
				width={200}
				height={300}
				alt="Picture of the book"
			/>
			<div className="card22-body">
				<h5 className="card22-title">{props.title}</h5>
				<p className="card22-text">{props.description}</p>
				<a href={props.path+props.id} className="btn btn-dark">
					View Details
				</a>
			</div>
		</div>
	);
}



export function DetailedCard(props) {
	return (
		<div className="d_card" style={{justifyContent:'center'}}>
			<Image
				className="card-img"
				src={props.image}
				width={250}
				height={400}
				alt="Picture of the book"
			/>
		</div>
	);
}

