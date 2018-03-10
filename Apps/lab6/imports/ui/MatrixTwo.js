import React, { Component } from 'react';
import { Image, Menu, Header, Segment, Embed, Table } from 'semantic-ui-react';


//component using a list and arrays with letters; seems to be smoother than table
export default class MatrixTwo extends Component {
	constructor(props){
		super(props);
		this.state={totalColumns:10, totalRows:10};
	}

	//function to change state of rows and columns
	changeRC(event) {
		let total = event.target.value;
		//determine if changing rows or columns
		event.target.name=='rows'?this.setState({totalRows: total}):this.setState({totalColumns: total});
	}

	//function to build rows
	buildRows(){
		//variable to track loop
		let x = 1;
		//array to put jsx li elements in
		let rows = [];
		//loop x amount of rows, determined by state
		while(x <= this.state.totalRows){
			//push row element with unique key per iteration (row1, row2 etc); build 'columns'(just a string from an array) for the row
			rows.push(<li key={'row'+x.toString()}>{this.buildColumns()}</li>);
			x++;
		}
		//returns an array full of <li> element(s)
		return rows;
	}

	//function to build columns; similar to build rows
	buildColumns(){
		let y = 1;
		let columns = [];
		while(y <= this.state.totalColumns){
			//grabs a random number between 65 and 90 and gets matching ASCII character, which should be A-Z, pushes into array
			//we used this random integer Math function credited to David Reed in my 111 class:
			/*function randomInt(low, high)
			// Given : low <= high
			// Returns : a random integer in the range [low, high]
			{
			    return Math.floor(Math.random()*(high-low+1)) + low;
			}*/
			columns.push(String.fromCharCode(Math.random()*26+65));
			y++;
		}
		//returns an array of random letters
		return columns;
	}

	render() {
		return (
			<div>
				<span>Rows: &nbsp;<input name='rows' type='range' min='1' max='50' value={this.state.totalRows} onChange={this.changeRC.bind(this)}/> &nbsp; {this.state.totalRows}</span><br />
				<span>Columns: &nbsp;<input name='columns' type='range' min='1' max='50' value={this.state.totalColumns} onChange={this.changeRC.bind(this)}/> &nbsp; {this.state.totalColumns}</span><br />
				<ul>
		     		{this.buildRows()}
		     		{console.log(this.buildRows())}
	    		</ul>
	    	</div>
    	)
	}
}


