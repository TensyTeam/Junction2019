import React from 'react';

import Loader from '../Components/UI/Loader/Loader.jsx';


class Popup extends React.Component {
	render() {
		const {
			showPopup, onPopup,
		} = this.props;
		return (
			<>
				{showPopup.current === 'thank' && (
					<div className="popup">
						<div className="popup_close_panel" onClick={() => { onPopup(false, null); }} />
						<div className="popup_content">
							<div className="title">Thank you, for support :)</div>
						</div>
					</div>
				)}
				{showPopup.current === 'error' && (
					<div className="popup">
						<div className="popup_close_panel" onClick={() => { onPopup(false, null); }} />
						<div className="popup_content">
							<div className="title">Error</div>
						</div>
					</div>
				)}
				{showPopup.current === 'loader' && (
					<div className="popup">
						<div className="popup_close_panel" onClick={() => { onPopup(false, null); }} />
						<div className="popup_content">
							<Loader />
						</div>
					</div>
				)}
			</>
		);
	}
}

export default Popup;
