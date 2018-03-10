import React, { Component } from 'react';
import { Image, Menu, Header, Segment, Embed, Table } from 'semantic-ui-react';

import Matrix from './Matrix.js';
import MatrixTwo from './MatrixTwo.js';
import ErrorBoundary from './ErrorBoundary.js';

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = {activeItem: ''};
	}

	handleMenuItemClick(e, { name }) {
		this.setState({activeItem: name });
	}

	render() {
		let component = null;
		switch(this.state.activeItem) {
			case 'menu1':
				component=<MenuOne />
				break;
			case 'menu2':
				component=<MenuTwo />
				break;
			case 'menu3':
				component=<MenuThree />
				break;
		}

		return(
			<ErrorBoundary>
			<div id='mainDiv'>
				<Menu>
					<Menu.Item 
						name='menu1'
						active={true}
						active={this.state.activeItem === 'menu1'}
						onClick={this.handleMenuItemClick.bind(this)}
					>
						Menu 1 - Table Matrix
					</Menu.Item>
					<Menu.Item
						name='menu2'
						active={true}
						active={this.state.activeItem === 'menu2'}
						onClick={this.handleMenuItemClick.bind(this)}
					>
						Menu 2 - List Matrix
					</Menu.Item>
					<Menu.Item
						name='menu3'
						active={true}
						active={this.state.activeItem === 'menu3'}
						onClick={this.handleMenuItemClick.bind(this)}
					>
						Menu 3 - Pic
					</Menu.Item>					
				</Menu>
				{component}
			</div>
			</ErrorBoundary>
		)
	}

}

class MenuOne extends Component {
	render() {
		return (
			<Segment>
				<Header as='h1'>Menu One</Header>
				<p>Started out using a table. This was laggy when dealing with large numbers.</p>
				<Matrix />
			</Segment>
		)
	}
}

class MenuTwo extends Component {
	render() {
		return (
			<Segment>
				<Header as='h1'>Menu Two</Header>
				<p>Created this matrix with lists to compare. Much less laggy.</p>
				<MatrixTwo />
			</Segment>
		)
	}
}

class MenuThree extends Component {
	render() {
		return (
			<Segment>
				<Header as='h1'>Menu Three</Header>
				<Image
				src='/images/s-l1600.jpg'
				size='medium'
				rounded
				/>
			</Segment>
		)
	}
}