import React from 'react';


class Videochat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			path: {
				room: Number(document.location.pathname.split('/')[2]),
				type: document.location.search.split('=')[1],
			},
		};
	}

	componentWillMount() {
		// start videochat
	}

	render() {
		return (
			<div id="videochat">
				<div id="videos">
					<video id="local" autoPlay controls />
					<video id="remote" autoPlay controls />
				</div>
			</div>
		);
	}
}

export default Videochat;
