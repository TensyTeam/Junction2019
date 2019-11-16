import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

import Button from '../Components/UI/Button/Button.jsx';
import Input from '../Components/UI/Input/Input.jsx';
// import { addStory } from '../Functions/methods';

class CreateStory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newStory: {
				video: '',
				imageURL: '',
			},
			responce: false,
		};
		this.onCreate = this.onCreate.bind(this);
    	this.handleUploadImage = this.handleUploadImage.bind(this);
	}

	onCreate() {
		// method addStory
	}

	handleUploadImage(ev) {
	    ev.preventDefault();

	    const data = new FormData();
	    data.append('file', this.uploadInput.files[0]);
	    data.append('filename', this.fileName.value);

	    axios.post('http://localhost:5000/upload', data).then((response) => {
			console.log(response.data.name);
	        // response.json().then((body) => {
	        //     this.setState({
	        //         imageURL: `http://localhost:5000/upload/${body.file}`
	        //     });
	        // });
	    });
	}

	render() {
		const { responce } = this.state;
		return (
			<div className="content">
				<div className="title">Create story</div>
				{ /* <form className="form">
					<img id="video_cover_img" className="video_img" src="https://tensyteam.ru/static/ladders/0.png" alt="" />
					<label className="btn btn-file" id="cover_btn" htmlFor="cover">
						<Input
							id="cover"
							name="image"
							type="file"
							className="input-file"
							placeholder="For video"
						/>
						<i className="fas fa-file-upload" />
						<span>Upload video</span>
					</label>
					<Button onClick={responce ? {} : this.onCreate}>
						Create
					</Button>
				</form> */}
				<form onSubmit={this.handleUploadImage}>
			        <div>
			          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
			        </div>
			        <div>
			          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
			        </div>
			        <br />
			        <div>
			          <button>Upload</button>
			        </div>
			        <img src={this.state.imageURL} alt="img" />
			      </form>
			</div>
		);
	}
}

export default CreateStory;
