import React, { Component } from 'react';

//ErrorBoundary component
export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {hasError: false, error: '', info: ''};
	}

	componentDidCatch(error, info) {
		//Display error UI if errors present
		this.setState({hasError: true, error: error.toString(), info: info});
		console.log(error, info);
	}

	render() {
		if (this.state.hasError) {
			return(
				<div>
					<h1>Oops! Looks like you ran into an error!</h1>
					<h1>{this.state.error}</h1>
					<h1>Info: {this.state.info.componentStack}</h1>
				</div>
			);
		}
		return this.props.children;
	}
}