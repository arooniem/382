import React, { Component } from 'react';
import { Image, Menu, Header, Segment, Embed, Table } from 'semantic-ui-react';


import ErrorBoundary from './ErrorBoundary.js';

export default class Info extends Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	render() {
		return(
			<div>
	          <h1>Welcome!</h1>
	          <p>Please choose a game from the menu above</p>
	        </div>
		)
	}
}