import React from 'react';

import Story from './Story/Story.jsx';
import './StoriesList.css';


const StoriesList = (props) => {
	const {
		stories, onLike,
	} = props;
	return (
		<div className="stories_list">
			{stories.map((story) => (
				<Story
					key={story.id}
					story={story}
					onLike={onLike}
				/>
			))}
		</div>
	);
};

export default StoriesList;
