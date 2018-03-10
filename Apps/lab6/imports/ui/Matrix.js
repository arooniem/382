import React, { Component } from 'react';
import { Image, Menu, Header, Segment, Embed, Table } from 'semantic-ui-react';


//component to build the matrix using a SemanticUI Table
export default class Matrix extends Component {
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
		//array to put jsx row elements in
		let rows = [];
		//loop x amount of rows, determined by state
		while(x <= this.state.totalRows){
			//push row element with unique key per iteration (row1, row2 etc); build columns(cells) for the row
			rows.push(<Table.Row key={'row'+x.toString()}>{this.buildColumns()}</Table.Row>);
			x++;
		}
		return rows;
	}

	//function to build columns; same as build rows
	buildColumns(){
		let y = 1;
		let columns = [];
		while(y <= this.state.totalColumns){
			//same as building rows; grabs a random number between 65 and 90 and gets matching ASCII character, which should be A-Z
			//we used this random integer Math function credited to David Reed in my 111 class:
			/*function randomInt(low, high)
			// Given : low <= high
			// Returns : a random integer in the range [low, high]
			{
			    return Math.floor(Math.random()*(high-low+1)) + low;
			}*/
			columns.push(<Table.Cell key={'columns'+y.toString()}>{String.fromCharCode(Math.random()*26+65)}</Table.Cell>);
			y++;
		}
		return columns;
	}

	render() {
		return (
			<div>
				<span>Rows: &nbsp;<input name='rows' type='range' min='1' max='50' value={this.state.totalRows} onChange={this.changeRC.bind(this)}/> &nbsp; {this.state.totalRows}</span><br />
				<span>Columns: &nbsp;<input name='columns' type='range' min='1' max='50' value={this.state.totalColumns} onChange={this.changeRC.bind(this)}/> &nbsp; {this.state.totalColumns}</span><br />
				<Table collapsing inverted compact='very'>
	    			<Table.Body>
		     			{this.buildRows()}
		    		</Table.Body>
	    		</Table>
	    	</div>
    	)
	}
}