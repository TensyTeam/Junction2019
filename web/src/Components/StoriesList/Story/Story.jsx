import React from 'react';
import { Link } from 'react-router-dom';

import './Story.css';


const Story = (props) => {
	const {
		story, onLike,
	} = props;
	return (
		<div className="story" key={story.id}>
			<div className="story_wrapper">
				<video src={story.video} autoPlay controls />
			</div>
			<div className="story_reactions">
				<span onClick={() => { onLike(story.id, 0); }}><img src="/img/reactions/1.png" alt="" /></span>
				<span onClick={() => { onLike(story.id, 1); }}><img src="/img/reactions/2.png" alt="" /></span>
				<span onClick={() => { onLike(story.id, 2); }}><img src="/img/reactions/3.png" alt="" /></span>
				<span onClick={() => { onLike(story.id, 3); }}><img src="/img/reactions/4.png" alt="" /></span>
				<span onClick={() => { onLike(story.id, 4); }}><img src="/img/reactions/5.png" alt="" /></span>
			</div>
		</div>
	);
};

export default Story;
