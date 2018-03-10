import React, {Component} from 'react';
import Typicode from './Typicode.js';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {restData: []};
	}

	handleButtonClick(event) {
		let whichData = event.target.id;
		this.getRESTData(whichData);
	}

	getRESTData(whichData) {
		if(Meteor.isClient) {
			Meteor.call('getRestData', whichData, function(error, results) {
				try{
					if(error) {
						console.log('Error in retrieving data: ' + error);
					} else {
						if(results.error) {
							console.log('Error status code: ' + results.error.statusCode);
							console.log('Error: ' + results.error.error);
						} else {
							this.setState({restData: JSON.parse(results.content)});
						}
					}
				} catch (err) {
					console.log('Error in Meteor call: ' + err);
				}
			}.bind(this));
		}
	}

	renderRESTData() {
		if (this.state.restData) {
			return <Typicode data={this.state.restData} />
		}
	}

	render() {
		return (
			<div className='container'>
				<header>
					<div id='title'>REACT REST Class</div><br />
					<div id='credit'>Powered by <a href='https://jsonplaceholder.tpicode.com/'>JSONPlaceholder</a></div>
					<p>
						Return JSON data using REST call via HTTP package using Meteor and React.
					</p>
					<div>
						<button id='users' onClick={this.handleButtonClick.bind(this)}>Get User Data</button>
						<button id='posts' onClick={this.handleButtonClick.bind(this)}>Get Post Data</button>
					</div>
				</header>
				<main>
					{this.renderRESTData()}
				</main>
			</div>
		);
	}
}