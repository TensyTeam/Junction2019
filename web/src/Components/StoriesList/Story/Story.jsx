import React from 'react';
import { Link } from 'react-router-dom';

import './Story.css';


const Story = (props) => {
	const {
		story, onCallStory,
	} = props;
	return (
		<div className="story" key={story.id} onClick={() => { onCallStory(story.id); }}>
			{story.text}
		</div>
	);
};

export default Story;
