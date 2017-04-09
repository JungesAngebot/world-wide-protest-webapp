import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import * as apiActions from 'actions/apiActions';
import Footer from 'components/common/Footer';

class HomePage extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {

	}

	render() {
		let event = this.props.api.currentEvent;
		let startTime = new Date(event.startTime);
		let endTime = new Date(event.endTime);
		return (
			<div class="details-page">
				<div id="detail-header" style={{ backgroundImage: `url(${require("../../styles/img/event-placeholder.jpg")})` }}>
					<div className="text-gradient">
						<h1>{event.title}</h1>
					</div>
				</div>
				<div className="grid-container meta-container">

					<div className="col-2 meta-wrapper">
						<div class="meta">
							<p className="card-info"><i className="icon icon-date"></i>{moment(startTime).format("Do MMMM YYYY h:mm")} Uhr - {moment(endTime).format("h:mm")} Uhr</p>
							<p className="card-info info-location"><i className="icon icon-location"></i> Dernsches Gelände, 65185 Wiesbaden, Germany</p>
							<p className="card-info info-cause"><i className="icon icon-cause"></i> Pulse of Europe Wiesbaden</p>
						</div>
					</div>

					<div className="col-4">
						{event.description}
					</div>

				</div>
				<Footer />
			</div>
		);

	}

}

function mapStateToProps(state, ownProps) {
	return {
		api: state.api
	};
}

function mapDispatchToProps(dispatch) {
    return {
        apiActions: bindActionCreators(apiActions, dispatch)
    };
}

export function loadDetailPage(nextState, store, next) {
	// store.dispatch(apiActions.setPageLoad(false));
	store.dispatch(apiActions.getEventById(nextState.params.id))
	.then(response => {
		store.dispatch(apiActions.setEvent(response.data));
		// store.dispatch(apiActions.setPageLoad(true));
		next();
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);