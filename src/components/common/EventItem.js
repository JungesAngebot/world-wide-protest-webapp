import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

const EventItem = ({ event }) => {
	console.log(event);
	return (
		<Link to={`/event/${event.id}`}>
			<div className="col-6 card-wrapper no-padding">

				<div className="col-2 card-image no-padding">
					<img src={require("../../styles/img/event-placeholder.jpg")} alt="" />
				</div>
				<div className="col-4 card-content-wrapper">
					<h2 className="card-title">{event.title}</h2>
					<p className="card-content">{event.description}</p>
					<p className="card-info"><i className="icon icon-date"></i> {moment(event.startTime).format("Do MMMM YYYY h:mm")}</p>
					<p className="card-info"><i className="icon icon-location"></i> Wiesbaden, Germany</p>
				</div>

			</div>
		</Link>
	);

}

export default EventItem;