import React from 'react';
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
			},
			responce: false,
		};
		this.onCreate = this.onCreate.bind(this);
	}

	onCreate() {
		// method addStory
	}

	render() {
		const { responce } = this.state;
		return (
			<div className="content">
				<div className="title">Create story</div>
				<form className="form">
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
				</form>
			</div>
		);
	}
}

export default CreateStory;
