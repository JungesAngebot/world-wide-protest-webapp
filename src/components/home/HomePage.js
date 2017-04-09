import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';

import * as apiActions from 'actions/apiActions';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import EventItem from 'components/common/EventItem';
import Hero from 'components/common/Hero';
import Filter from 'components/common/Filter';

class HomePage extends Component {

	constructor(props) {
		super(props);
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	componentDidMount() {
		var fallbackLocation = { lat: 50.5468647, lng: 10.2753689 };
		var infoWindow;

			var map = new google.maps.Map(document.getElementById("overview-map"), {
				zoom: 6,
				center: fallbackLocation
			});

		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {

			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			map.setCenter(pos);

			infoWindow = new google.maps.InfoWindow;

			infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);

			}, () => {
				// handleLocationError(true, infoWindow, map.getCenter());
			});
		}
	}

	handleFieldChange(e) {
		e.preventDefault();
		// let field = event.target.name;
		// let kundeState = Object.assign({}, this.state.kunde);
		// kundeState[field] = event.target.value;
		// this.checkFields(kundeState);
		// return this.setState({ kunde: kundeState });
	}

	render() {
		return (
			<div>
				<Header />
				<Hero />
				<div className="col-6" style={{ padding: "17px 17px 0rem 17px" }}>
					<Filter />
				</div>
				<div id="overview-map"></div>

				<div className="grid-container">
					<div className="row no-margin" style={{ marginTop: "1rem" }}>

						{this.props.api.events.length > 0 && this.props.api.events.map(event => {
							return (
								<EventItem key={event.id} event={event} />
							)
						})}

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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
