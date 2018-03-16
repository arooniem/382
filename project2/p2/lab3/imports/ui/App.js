import React, { Component } from 'react';

//App component - represents the whole app
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			calcNum: 0,
		};
	}

	onAdd = () => { this.setState({calcNum: this.state.calcNum + 1});}

	onSubtract = () => { this.setState({calcNum: this.state.calcNum -1 });}

	render() {
		return (
			<div className='container'>
				<h1>Lab 3</h1>
				<h2>Adder</h2>
				<div>
					<span id ='calcNum'>{this.state.calcNum}</span>&nbsp;&nbsp;
					<button id = 'addButton' onClick = {this.onAdd.bind(this)}>Add</button>&nbsp;
					<button id = 'subButton' onClick = {this.onSubtract.bind(this)}>Subtract</button>
				</div>
				<h2>Word Letter Sort</h2>
				<LetterSort />
				<h2>Do Something Else</h2>
				<SomethingElse />
			</div>
		);
	}
}

class LetterSort extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sortedLetters: '',
		};
	}

	onTextEntered = (changeEvent) => {
		let sorted = changeEvent.target.value.split('').sort().join('');
		this.setState({sortedLetters: sorted});
	}
	render() {
		return (
			<div>
				<input type='input' onChange={this.onTextEntered.bind(this)} />&nbsp;=&gt;&nbsp;
				<span id='sortedLetters'>{this.state.sortedLetters}</span>
			</div>
		);
	}
}

class SomethingElse extends Component {
	constructor(props) {
		super(props)
		this.state = {
			something: '',
		};
	}

	copyInput = (changeEvent) => {
		let copied = changeEvent.target.value.toUpperCase();
		this.setState({something: copied});
		console.log(this);
	}

	render() {
		return (
			<div>
				<input type='input' onChange={this.copyInput.bind(this)} />&nbsp;=&gt;&nbsp;
				<span id='something'>{this.state.something}</span>
			</div>
		);
	}
}