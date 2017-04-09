import React, { Component } from 'react';
import update from 'react-addons-update';
import { Motion, spring } from 'react-motion';

class Filter extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {
				city: "Mainz",
				cause: "all causes",
				search: "",
				date: "2 weeks"
			},
			toggled: false,
			disableOtherInputs: false
		};
		this.toggleFilters = this.toggleFilters.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	toggleFilters() {
		this.setState(prev => update(prev, {
			toggled: { $set: !this.state.toggled }
		}));
	}

	handleFieldChange(e) {
		let field = e.target.name;
		let value = e.target.value;

		/* if(field === "search") {
			if(field.length > 0) {
				this.setState(prev => update(prev, {
					disableOtherInputs: { $set: true }
				}));
			} else if(field.length <= 0) {
				this.setState(prev => update(prev, {
					disableOtherInputs: { $set: false }
				}));
			}
		} */

		this.setState(prev => update(prev, {
			data: {
				[field]: { $set: value }
			}
		}));
	}

	render() {
		return (
			<section id="filter">

				<div className="active-settings" onClick={this.toggleFilters}>
					<span className="icon icon-cause"></span>
					<span className="active-place">{this.state.data.city}</span>,
					<span className="active-causes"> {this.state.data.cause}</span>, 
					<span className="active-date"> {this.state.data.date}</span>
				</div>

				<Motion style={{ h: spring(this.state.toggled ? 308 : 0) }}>
					{ value => {
						return (
							<form style={{ height: value.h }} id="filter-settings">
								<span className="input-label-wrapper" style={{ marginTop: "10px" }}>
									<input id="input-place" className="filter-input" type="text" name="city" value={this.state.data.city} placeholder="where" onChange={this.handleFieldChange} disabled={this.state.disableOtherInputs} />
									<label className="filter-label" for="input-place">
										<span className="icon icon-location"></span>
									</label>
								</span>

								<span className="input-label-wrapper">
									<input id="input-cause" className="filter-input" type="text" name="cause" value={this.state.data.cause} placeholder="cause" onChange={this.handleFieldChange} disabled={this.state.disableOtherInputs} />
									<label className="filter-label" for="input-cause">
										<span className="icon icon-cause"></span>
									</label>
								</span>

								<span className="input-label-wrapper">
									<input id="input-search" className="filter-input" type="text" name="search" value={this.state.data.search} placeholder="search titles (optional)" onChange={this.handleFieldChange} />
									<label className="filter-label" for="input-search">
										<span className="icon icon-search"></span>
									</label>
								</span>

								<span className="input-label-wrapper">
									<input id="input-date" className="filter-input" type="text" name="date" value={this.state.data.date} placeholder="date" onChange={this.handleFieldChange} disabled={this.state.disableOtherInputs} />
									<label className="filter-label" for="input-date">
										<span className="icon icon-date"></span>
									</label>
								</span>

								<button className="btn btn-block full-width" type="submit" name="submit">Search</button>
							</form>
						);
					}}
				</Motion>

			</section>
		);

	}

}

export default Filter;