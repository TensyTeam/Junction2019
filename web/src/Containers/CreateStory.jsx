import React from 'react';
import axios from 'axios';

import Button from '../Components/UI/Button/Button.jsx';
import Input from '../Components/UI/Input/Input.jsx';
import { addStory } from '../Functions/methods';

class CreateStory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			videoName: '',
			responce: false,
		};
    	this.handleUploadVideo = this.handleUploadVideo.bind(this);
	}

	handleUploadVideo(ev) {
	    ev.preventDefault();

		// processing video
	    const data = new FormData();
	    data.append('file', this.uploadInput.files[0]);

		// send data
	    axios.post('https://tensyteam.ru/api/upload', data).then((response) => {
			addStory(this, { video: response.data.name }).then((res) => {
				this.setState({ videoName: response.data.name });
	        });
	    });
	}

	render() {
		const { videoName } = this.state;
		return (
			<div className="content">
				<div className="title title_group">
					<span>Create story</span>
					<Button
						typeBtn="link"
						linkTo="/"
						style={{ padding: '0px 15px', marginRight: '0' }}
					>
						<i className="fas fa-times" />
					</Button>
				</div>
				<div className="subtitle">Share your emotions</div>
				<form onSubmit={this.handleUploadVideo}>
					{videoName.length === 0 ? (
						<label className="btn btn-file" id="video_btn" htmlFor="video_cover" style={{ background: 'transparent' }}>
							<Input
								id="video_cover"
								name="video"
								type="file"
								className="input-file"
								placeholder="For video"
								refprop={(ref) => { this.uploadInput = ref; }}
							/>
							<i className="fas fa-file-upload" />
							<span>Attach</span>
						</label>
					) : (
						<video id="video_img" src={`https://tensyteam.ru/api/static/stories/${videoName}`} />
					)}
					<Button
						style={{
							position: 'absolute',
						    bottom: 0,
						    zIndex: 10,
						    right: 0,
						    left: 0,
						    width: '80%',
						    margin: '20px auto',
						    height: '70px',
						}}
					>
						Publish
					</Button>
			      </form>
			</div>
		);
	}
}

export default CreateStory;
