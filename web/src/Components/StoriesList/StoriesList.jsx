import React from 'react';

import Story from './Story/Story.jsx';
import './StoriesList.css';


const StoriesList = (props) => {
	const {
		stories, onCallStory,
	} = props;
	return (
		<div className="stories_list">
			{stories.map((story) => (
				<Story
					key={story.id}
					story={story}
					onCallStory={onCallStory}
				/>
			))}
		</div>
	);
};

export default StoriesList;
