import React, { Component } from 'react';

//ErrorBoundary component
export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {hasError: false, error: '', info: ''};
	}

	componentDidCatch(error, info) {
		//Display error UI if errors present
		this.setState({hasError: true, error: error, info: info});
		console.log(error, info);
	}

	render() {
		if (this.state.hasError) {
			return(
				<div className='container'>
					<h1>Something went wrong.</h1>
					<p>Error: {this.state.error.toString()}</p>
					<p>Info: {this.state.info.componentStack}</p>
				</div>
			);
		}
		return this.props.children;
	}
}