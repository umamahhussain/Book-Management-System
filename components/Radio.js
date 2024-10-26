export default function Radio(props){
    return (
			<div class="form-check" style={{ alignContent: "end" }}>
				<input
					class="form-check-input"
					type="radio"
					name="flexRadioDefault"
					id="flexRadioDefault1"
                    value={props.id}
                    onChange={props.onChange}
                    
				/>
				<label class="form-check-label" for="flexRadioDefault1" style={{color:'whitesmoke'}}>
					{props.title}
				</label>
			</div>
		);
}