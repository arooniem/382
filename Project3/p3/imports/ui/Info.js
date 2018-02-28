import React, { Component } from 'react';
import { Image, Menu, Header, Segment, Embed, Accordion } from 'semantic-ui-react';

export default class Info extends Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	render() {
		const panels = [
			{
			    title: 'Compilers',
			    content: [
			      'A JavaScript compiler takes JavaScript code, transforms it and returns JavaScript code in a different format. The most common use case is to take ES6 syntax and transform it into syntax that older browsers are capable of interpreting. Babel is the compiler most commonly used with React.',
				],
				key: 'Compilers',
			},
			{
			    title: 'Bundlers',
			    content: [
			      'Bundlers take JavaScript and CSS code written as separate modules (often hundreds of them), and combine them together into a few files better optimized for the browsers. Some bundlers commonly used in React applications include Webpack and Browserify.',
				],
				key: 'Bundlers',
			},
			{
			    title: 'Package Managers',
			    content: [
			      'Package managers are tools that allow you to manage dependencies in your project. npm and Yarn are two package managers commonly used in React applications. Both of them are clients for the same npm package registry.',
				],
				key: 'Package Managers',
			},
			{
			    title: 'JSX',
			    content: [
			      'JSX is a syntax extension to JavaScript. It is similar to a template language, but it has full power of JavaScript. JSX gets compiled to React.createElement() calls which return plain JavaScript objects called “React elements”.',
				],
				key: 'JSX',
			},
			{
			    title: 'props',
			    content: [
			      'props are inputs to a React component. They are data passed down from a parent component to a child component.',
				],
				key: 'props',
			},
		]
		return(
			<Segment inverted color='grey'>
	        	<Header inverted color='grey'>Welcome!</Header>
	        	<Segment inverted color='grey'>Please choose a game from the menu above</Segment>
	        	<Segment inverted color='grey'>
	        		<Accordion inverted color='grey' defaultActiveIndex={-1} panels={panels} />
	        	</Segment>
	        </Segment>
		)
	}
}