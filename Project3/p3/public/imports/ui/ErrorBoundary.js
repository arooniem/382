import React from 'react';

//ErrorBoundary component
export default class ErrorBoundary extends React.Component {
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
				<div className='container'>
					<h1>Oops! Looks like you ran into an error!</h1>
					<p>{this.state.error}</p>
					<p>Info: {this.state.info.componentStack}</p>
				</div>
			);
		}
		return this.props.children;
	}
}