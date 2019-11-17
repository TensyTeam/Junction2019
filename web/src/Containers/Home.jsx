import React from 'react';

import Button from '../Components/UI/Button/Button.jsx';
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
			smile: false,
		};
		this.onLike = this.onLike.bind(this);
	}

	componentWillMount() {
		// get stories
		getStories(this).then((res) => {
			if (res.error === 0) {
				this.setState({ responce: true });
				this.setState({ stories: res.result.stories });
			}
        });

		// wait reaction
		const { token } = this.props;
		socketIo.on('reaction_now', (mes) => {
			if (mes.user === token) {
				this.setState({ smile: true });

				// start snowing smile
				const snow_img = [
					"/img/reactions/1.png",
					"/img/reactions/2.png",
					"/img/reactions/3.png",
					"/img/reactions/4.png",
					"/img/reactions/5.png",
				];
			    let snow_browser_width;
			    let snow_browser_height;
			    const snow_no = 20;
			    let timeszimaon = 1;
			    if (typeof(window.pageYOffset) == "number") {
			        snow_browser_width = window.innerWidth;
			        snow_browser_height = window.innerHeight;
			    } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
			        snow_browser_width = document.body.offsetWidth;
			        snow_browser_height = document.body.offsetHeight;
			    } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
			        snow_browser_width = document.documentElement.offsetWidth;
			        snow_browser_height = document.documentElement.offsetHeight;
			    } else {
			        snow_browser_width = 500;
			        snow_browser_height = 500;
			    }
			    let snow_dx = [];
			    let snow_xp = [];
			    let snow_yp = [];
			    let snow_am = [];
			    let snow_stx = [];
			    let snow_sty = [];
			    if (timeszimaon === 1) {
					document.getElementById('snow').innerHTML='';
					const snowParent = document.getElementById('snow');
			        for (let i = 0; i < snow_no; i++) {
			            snow_dx[i] = 0;
			            snow_xp[i] = Math.random() * (snow_browser_width - 50);
			            snow_yp[i] = Math.random() * snow_browser_height;
			            snow_am[i] = Math.random() * 20;
			            snow_stx[i] = 0.02 + Math.random() / 10;
			            snow_sty[i] = 0.7 + Math.random();
			            if (i === 0) {
							const snowDiv = document.createElement('div');
							snowDiv.style.position = 'absolute';
							snowDiv.style.zIndex = '0';
							snowDiv.id = 'snow_flake0';

							const snowA = document.createElement('a');
							snowA.target = '_blank';

							const snowImg = document.createElement('img');
							snowImg.style.border = '0';
							snowImg.style.width = '30px';
							snowImg.style.height = 'auto';
							snowImg.src = snow_img[mes.reaction];

							snowA.appendChild(snowImg);
							snowDiv.appendChild(snowA);
							snowParent.appendChild(snowDiv);
						} else {
							const snowDiv = document.createElement('div');
							snowDiv.style.position = 'absolute';
							snowDiv.style.zIndex = `10000${i}`;
							snowDiv.id = `snow_flake${i}`;

							const snowImg = document.createElement('img');
							snowImg.style.border = '0';
							snowImg.style.width = '30px';
							snowImg.style.height = 'auto';
							snowImg.src = snow_img[mes.reaction];

							snowDiv.appendChild(snowImg);
							snowParent.appendChild(snowDiv);
						}
			        }
			    }

			    function SnowStart() {
						for (let i = 0; i < snow_no; i++) {
						   snow_yp[i] += snow_sty[i];
						   if (snow_yp[i] > snow_browser_height - 50) {
							   snow_xp[i] = Math.random() * (snow_browser_width - snow_am[i] - 30);
							   snow_yp[i] = 0;
							   snow_stx[i] = 0.02 + Math.random() / 10;
							   snow_sty[i] = 0.7 + Math.random();
						   }
						   snow_dx[i] += snow_stx[i];
						   document.getElementById("snow_flake" + i).style.top = snow_yp[i] + "px";
						   document.getElementById("snow_flake" + i).style.left = snow_xp[i] + snow_am[i] * Math.sin(snow_dx[i]) + "px";
					    }

				}

				const intervalStopSnow = setInterval(() => {
					const { smile } = this.state;
					if (smile) {
						SnowStart();
					} else {
						clearInterval(intervalStopSnow);
					}
				}, 10);

				setTimeout(() => {
					document.getElementById('snow').innerHTML='';
					this.setState({ smile: false });
				}, 2000);

			    if (timeszimaon === 1) {
			        SnowStart();
			    }
			}
		});
	}

	componentDidMount() {
		socketIo.on('story_add', (mes) => {
			const { token } = this.props;
			const { stories } = this.state;

			if (mes.user !== token) {
				mes['online'] = true;
				stories.unshift(mes);

				this.setState({ stories });
			}
		});
	 }

	onLike(_videoId, _reaction) {
		// send reaction
		socketIo.emit('reaction_now', {
			id: _videoId,
			reaction: _reaction,
		});
	}

	render() {
		const { stories, responce } = this.state;
		return (
			<div className="content">
				<div className="title title_group">
					<span>Hi, my friend</span>
					<Button
						typeBtn="link"
						linkTo="/create/story"
						style={{ padding: '0px 13px', marginRight: '0' }}
					>
						<i className="fas fa-plus" />
					</Button>
				</div>
				<div className="subtitle">Sunday, 17 November 2019</div>
				{stories.length !== 0 ? (
					<StoriesList
						stories={stories}
						onLike={this.onLike}
					/>
				) : (
					<>
						{responce ? (
							<div style={{ textAlign: 'center', marginTop: '20px', color: '#fff' }}>Not found</div>
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
