import React, { Component } from 'react';
import PropTypes from 'prop-types';

//CaesarCypher component
export default class CaesarCypher extends Component {
	constructor(props){
		super(props);
		this.state = {totalShift: this.props.offsetNum, shiftL: this.props.shiftLeft};
	}

	//verifying input is a number or letter, then do encrypt
	verify(num) {
		//thanks to yellos on stackexchange for condensed range check https://codegolf.stackexchange.com/questions/8649/shortest-code-to-check-if-a-number-is-in-a-range-in-javascript
		if(num>47==num<58){
			return(this.shift(String.fromCharCode(num),['0','1','2','3','4','5','6','7','8','9']))
		}
		if(num>64==num<91){
			return(this.shift(String.fromCharCode(num),['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']))
		} 
		if(num==32){
			return(' ');
		} else {
			return String.fromCharCode(num)
		}
	}

	//function to shift through arrays
	shift(n,arr){
		let x = ''
		if (this.state.shiftL){
			x = arr.indexOf(n)-this.state.totalShift;
			if(x < 0){
				return(arr[arr.length+x])
			} else {
				return(arr[x]);
			}
		} else {
			x = arr.indexOf(n)+this.state.totalShift;
			if(x >= arr.length){
				return(arr[x-arr.length])
			} else {
				return(arr[x]);
			}
		}
	}

	//taking clearText from App and returning ciphered text
	encrypt(clearText) {
		clearText = clearText.toUpperCase();
		let encrypted = '';
		let x = 0;
		let y = '';
		while (x < clearText.length) {
			y = this.verify(clearText.charCodeAt(x));
			encrypted += y;
			x ++;
		}
		return encrypted;
	}

	//determine shift left or right
	directionChange(event) {
		this.setState({shiftL: event.target.checked});
	};

	//determine number of positions to shift to
	changeShifts(event) {
		let total = parseInt(event.target.value);
		//only allow 0 through 9
		if(total >= 0 && total <= 9){
			this.setState({totalShift: total});
		};
	}
	
	render() {
		return(
			<div>
				<span className='boldFont'>Cipher text: </span><span className='output'>{this.encrypt(this.props.clearText)}</span><br/>
				<input type='input' value={this.state.totalShift} onChange={this.changeShifts.bind(this)}/> &nbsp;
				<input type='range' max='9' value={this.state.totalShift} onChange={this.changeShifts.bind(this)}/> &nbsp;
				<span id='shifter'>Shift Left: </span><input type='checkbox' checked={this.state.shiftL} onChange={this.directionChange.bind(this)} />
			</div>
		);
	}

}



CaesarCypher.propTypes = {offsetNum: PropTypes.number, shiftLeft: PropTypes.bool, clearText: PropTypes.string.isRequired};