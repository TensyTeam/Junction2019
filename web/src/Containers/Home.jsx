import React from 'react';
// import { Link } from 'react-router-dom';

import Loader from '../Components/UI/Loader/Loader.jsx';
import StoriesList from '../Components/StoriesList/StoriesList.jsx';

import { getStories } from '../Functions/methods';
import { socketIo } from '../Functions/api';


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stories: [],
			responce: false,
		};
	}

	componentWillMount() {
		// get stories
		getStories(this).then((res) => {
			console.log(res);
			if (res.error === 0) {
				this.setState({ responce: true });
				this.setState({ stories: res.result.stories });
			}
        });

		// wait reaction
		const { token } = this.props;
		socketIo.on('reaction_now', (mes) => {
			if (mes.token === token) {
				console.log('like_now', mes);
				alert('like')
			}
		});
	}

	render() {
		const { stories, responce } = this.state;
		return (
			<div className="content">
				<div className="title">Stories</div>
				{stories.length !== 0 ? (
					<StoriesList
						stories={stories}
					/>
				) : (
					<>
						{responce ? (
							<div style={{ textAlign: 'center' }}>Not found</div>
						) : (
							<Loader />
						)}
					</>
				)}
			</div>
		);
	}
}

export default Home;
