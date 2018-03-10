import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Typicode extends Component {
	render() {
		if(Object.keys(this.props.data).length > 0) {
			let listItems = [];
			this.props.data.map(row => listItems.push(<li key={row.id}>{row.name?row.name:row.title}</li>));
			return (
				<div>
					<ul>
					{listItems}
					</ul>
				</div>
			);
		} else {
			return null;
		}
	}
}

Typicode.propTypes = {
	data: PropTypes.array.isRequired,
};