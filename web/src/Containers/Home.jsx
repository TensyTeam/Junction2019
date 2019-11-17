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
		};
		this.onLike = this.onLike.bind(this);
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
			console.log('reaction_now', mes);
			if (mes.token === token) {
				alert('like');
				const snow_img = "snow.png";
			    let snow_browser_width;
			    let snow_browser_height;
			    const snow_no = 56;
			    var timeszimaon = 1;
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
			        for (let i = 0; i < snow_no; i++) {
			            snow_dx[i] = 0;
			            snow_xp[i] = Math.random() * (snow_browser_width - 50);
			            snow_yp[i] = Math.random() * snow_browser_height;
			            snow_am[i] = Math.random() * 20;
			            snow_stx[i] = 0.02 + Math.random() / 10;
			            snow_sty[i] = 0.7 + Math.random();
			            if (i === 0) document.write("<\div id=\"snow_flake0\" style=\"position:absolute;z-index:0\"><a href=\"#\" target=\"_blank\"><\img src=\"" + snow_img + "\" border=\"0\"></a><\/div>");
			            else document.write("<\div id=\"snow_flake" + i + "\" style=\"position:absolute;z-index:10000" + i + "\"><\img src=\"" + snow_img + "\" border=\"0\"><\/div>");
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
			        let snow_time = setTimeout("SnowStart()", 10);
			    }
			    if (timeszimaon === 1) {
			        SnowStart();
			    }
			}
		});
	}

	onLike(_videoId, _reaction) {
		// send reaction
		console.log('!');
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
					<span>Hi</span>
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
							<div style={{ textAlign: 'center', marginTop: '20px' }}>Not found</div>
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
