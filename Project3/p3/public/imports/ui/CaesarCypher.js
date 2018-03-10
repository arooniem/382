import React, { Component } from 'react';
import {Segment, Input, Menu, Header, Container, List, Icon, Checkbox} from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';

//CaesarCypher component
export default class CaesarCypher extends Component {
	constructor(props){
		super(props);
		this.state = {totalShift: 2, shiftL: true, clearText:''};
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

	//taking clearText and returning ciphered text
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
		let total = event;
		//only allow 0 through 9
		if(total >= 0 && total <= 9){
			this.setState({totalShift: total});
		};
	}

	handleClearText(event) {
		this.setState({clearText:event.target.value})
	}
	
	render() {
		return(
			<Segment inverted color='grey'>
				<Header inverted color='grey'>Caesar Cypher</Header>
				<Segment.Group >
					<Segment inverted color='grey'><Icon name='unlock' />Plain Text: &nbsp; <Input size='mini' onChange={this.handleClearText.bind(this)} /></Segment>

					<Segment inverted color='grey'><Icon name='lock' />Cipher text: &nbsp; {this.encrypt(this.state.clearText)}</Segment>
					<Segment inverted color='grey'>
					<NumericInput 
						strict
						name='shifts' 
						min={1} 
						max={9} 
						onChange={this.changeShifts.bind(this)}
						value={this.state.totalShift}
						size = {4}
						mobile={false} 
					/> &nbsp;
					<Checkbox checked={this.state.shiftL} onChange={this.directionChange.bind(this)} label='Shift Left'/>
					</Segment>
				</Segment.Group>
			</Segment>
		);
	}

}