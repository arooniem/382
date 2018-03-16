import React, { Component } from 'react';

import ErrorBoundary from './ErrorBoundary.js';
import CaesarCypher from './CaesarCypher.js';
import CryptoAES from './CryptoAES';


//App component - represents the whole app
export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {toEncrypt: '', secret: ''};
	} 

	//handle input of clean text
	handleOnClean(changeEvent) {
		this.setState({toEncrypt: changeEvent.target.value});
	}

	//handle key input
	handleKey(changeEvent) {
		this.setState({secret: changeEvent.target.value});

	}

	render() {
		return (
			<ErrorBoundary>
				<div className='container'>
					<h1>Cyphers</h1>
					<input type='input' onChange = {this.handleOnClean.bind(this)} /><br/>
					<input type='input' onChange={this.handleKey.bind(this)}/><br/>
					<h2>Caesar</h2>
					<span id='cipherText'></span>
					<CaesarCypher
						clearText = {this.state.toEncrypt}
						offsetNum = {2}
						shiftLeft = {true}
					/>
					<h2>Crypto AES</h2>
					<CryptoAES 
						clearText = {this.state.toEncrypt}
						secretKey = {this.state.secret}
						/>
				</div>
			</ErrorBoundary>	
		);
	}
}