import React, { Component } from 'react';
import update from 'react-addons-update';
import { DatePicker, message } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as apiActions from 'actions/apiActions';
import * as firebase from 'firebase';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

import moment from 'moment';

const { RangePicker } = DatePicker;

class MakeAChange extends Component {

	constructor(props) {
		super(props);
		this.state = {
			event: {
				title: "",
				description: "",
				city: "",
				street: "",
				streetNr: "",
				country: "",
				tags: "",
				topic: "",
				startTime: moment(new Date()),
				endTime: moment(new Date())
			}
		};
		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.submitEvent = this.submitEvent.bind(this);
		this.onDatePickerChange = this.onDatePickerChange.bind(this);
	}

	handleFieldChange(e) {
		let field = e.target.name;
		let value = e.target.value;
		this.setState(prev => update(prev, {
			event: {
				[field]: { $set: value }
			}
		}));
	}

	submitEvent() {
		let that = this;
		let eventObj = Object.assign({}, this.state.event);
		eventObj.startTime = eventObj.startTime._d.getTime();
		eventObj.endTime = eventObj.endTime._d.getTime();

		eventObj.city = eventObj.city.replace(" ", "+");
		eventObj.street = eventObj.street.replace(" ", "+");
		eventObj.streetNr = eventObj.streetNr.replace(" ", "");
		
		axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${eventObj.street}+${eventObj.streetNr},${eventObj.city}&key=AIzaSyDeISVPkFJGpM_nI4Mlznlb2lgtK-B_440&language=en`)
		.then(response => {
			if(response.data.status === "OK") {
				// yeah

				// Geopositionen
				eventObj.lat = response.data.results[0].geometry.location.lat;
				eventObj.lng = response.data.results[0].geometry.location.lng;

				// Allg. Informationen
				eventObj.city = response.data.results[0].address_components[2].long_name;
				eventObj.street = response.data.results[0].address_components[1].long_name;
				eventObj.streetNr = response.data.results[0].address_components[0].long_name;
				eventObj.country = response.data.results[0].address_components[4].long_name;

				eventObj.creatorId = firebase.auth().currentUser.uid;

				that.props.apiActions.addEvent(eventObj)
				.then(response => {
					message.success("Ihre Veranstaltung wurde erfolgreich hinzugefügt!");

					axios.post('https://fcm.googleapis.com/fcm/send',{

  to : "cIQ70_oZBLY:APA91bHHpSk477H3qHPkrD1aeh2hoFT50zyz8Si5bSPvzhXAlxJ-wpSXM8UxUKMSWCl7PKA7a14DDdtXJ8iP6qN-koWHwa4Cyw2pUofs_rxmzTYAr1V4fw_SBeXTJhcJQOFStURmzCpB",
  priority : "high",
  notification : {
    body : eventObj.description.substring(0,150),
    title : eventObj.title
  }
					},{
						headers: {
							"Authorization": "key=AAAAfWI-abM:APA91bEF6__iMl8bE0kPQtk79T1Tr9zyLDcrfxxdfdW30s1A-1clXJpEYrlEuFHHcGUu9zYROWOprkIBoLRxhRUUxXQ3Ga9VERQ7WIYfkGd-ElVZuUboORPDs94xzxlaSRcq78QyFHaZ"
						}
					})

					this.setState({ event: {} });
				});
			} else if(response.data.status === "ZERO_RESULTS") {
				message.error("Bitte überprüfen Sie ihre Eingaben.")
			} else {
				// :(
				console.error(response);
			}

		});
	}

	onDatePickerChange(value, dateString, field) {
		console.log(value, dateString);
		this.setState(prev => update(prev, {
			event: {
				[field]: { $set: value }
			}
		}));
	}

	render() {

		return (
			<div>
				<Header />
				<div className="grid-container" style={{ marginTop: "95px" }}>

					<h1 style={{ color: "#444", textAlign: "center", fontSize: "2.25rem", textTransform: "uppercase" }}>Make A Change</h1>

					<div className="row">

						<span className="input-label-wrapper">
							<input className="filter-input" type="text" name="title" placeholder="Title" value={this.state.event.title} onChange={this.handleFieldChange} />
							<label className="filter-label" for="input-user-mail">
								<span className="icon icon-user"></span>
							</label>
						</span>

						<span className="input-label-wrapper">
							<textarea className="filter-input" rows="3" name="description" value={this.state.event.description} onChange={this.handleFieldChange} placeholder="Description"></textarea>
							<label className="filter-label" for="input-user-mail">
								<span className="icon icon-user"></span>
							</label>
						</span>

						<span className="input-label-wrapper">
							<input className="filter-input" type="text" name="city" placeholder="City" value={this.state.event.city} onChange={this.handleFieldChange} />
							<label className="filter-label" for="input-user-mail">
								<span className="icon icon-user"></span>
							</label>
						</span>

						<span className="input-label-wrapper">
							<input className="filter-input" type="text" name="street" placeholder="Street" value={this.state.event.street} onChange={this.handleFieldChange} />
							<label className="filter-label" for="input-user-mail">
								<span className="icon icon-user"></span>
							</label>
						</span>

						<span className="input-label-wrapper">
							<input className="filter-input" type="text" name="streetNr" placeholder="Street Number" value={this.state.event.streetNr} onChange={this.handleFieldChange} />
							<label className="filter-label" for="input-user-mail">
								<span className="icon icon-user"></span>
							</label>
						</span>

						<span className="input-label-wrapper">
							<input className="filter-input" type="text" name="country" placeholder="Country" value={this.state.event.country} onChange={this.handleFieldChange} />
							<label className="filter-label" for="input-user-mail">
								<span className="icon icon-user"></span>
							</label>
						</span>

						<DatePicker
							showTime
							onChange={(value, dateString) => this.onDatePickerChange(value, dateString, "startTime")}
							format="YYYY-MM-DD HH:mm"
      						placeholder="Select Time"
							value={this.state.event.startTime}
						/>

						<DatePicker
							showTime
							onChange={(value, dateString) => this.onDatePickerChange(value, dateString, "endTime")}
							format="YYYY-MM-DD HH:mm"
      						placeholder="Select Time"
							name="endTime"
							value={this.state.event.endTime}
							style={{ marginBottom: "0.75rem" }}
						/>

						<span className="input-label-wrapper">
							<input className="filter-input" type="text" name="topic" placeholder="Topic" value={this.state.event.topic} onChange={this.handleFieldChange} />
							<label className="filter-label" for="input-user-mail">
								<span className="icon icon-user"></span>
							</label>
						</span>

						<span className="input-label-wrapper">
							<input className="filter-input" type="text" name="tags" placeholder="Tags" value={this.state.event.tags} onChange={this.handleFieldChange} />
							<label className="filter-label" for="input-user-mail">
								<span className="icon icon-user"></span>
							</label>
						</span>

						<button className="submit-button" onClick={this.submitEvent}>Abschicken</button>

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

export default connect(mapStateToProps, mapDispatchToProps)(MakeAChange);
