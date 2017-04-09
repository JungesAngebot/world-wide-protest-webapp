import React, { Component } from 'react';

class EventMap extends Component {

	componentDidMount() {
		window.initMap = () => {
			console.log("test");
		}
		var location = { lat: parseFloat(this.props.event.lat), lng: parseFloat(this.props.event.lng) };
		var map = new google.maps.Map(document.getElementById("map"), {
			zoom: 12,
			center: location
		});
		var marker = new google.maps.Marker({
			position: location,
			map,
			title: "Test"
		});
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {

		return (
			<div>
				<div ref="map" id="map" style={{ width: "100%", height: "250px" }}></div>
			</div>
		);

	}

}

export default EventMap;