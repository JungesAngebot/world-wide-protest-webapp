import React from 'react';

const EventItem = ({ event }) => {
	console.log(event);
	return (
		<div className="col-6 card-wrapper no-padding">

			<div className="col-2 card-image no-padding">
				<img src={require("../../styles/img/event-placeholder.jpg")} alt="" />
			</div>
			<div className="col-4 card-content-wrapper">
				<h2 className="card-title">{event.title}</h2>
				<p className="card-content">{event.description}</p>
				<p className="card-info"><i className="icon icon-date"></i> 09.04.2017</p>
				<p className="card-info"><i className="icon icon-location"></i> Wiesbaden, Germany</p>
			</div>

		</div>
	);

}

export default EventItem;