import Image from "next/image";
import { useRouter } from "next/router";

export function Card(props) {

	const path= useRouter().asPath

	return (
		<div className="card">
			<Image
				className="card-img"
				src={props.image}
				width={200}
				height={300}
				alt="Picture of the book"
			/>
			<div className="card-body">
				<h5 className="card-title">{props.title}</h5>
				<p className="card-text">{props.description}</p>
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

