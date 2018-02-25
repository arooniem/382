import React, { Component } from 'react';
import { Image, Menu, Header, Segment, Embed, Table, Container } from 'semantic-ui-react';

import ErrorBoundary from './ErrorBoundary.js';
import Info from './Info.js';
import NumberGuess from './NumberGuess.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {restData: ''};
  }
    
  handleMenuItemClick(e, { name }){
    this.setState({activeItem: name});
  }

  handleButtonClick(event) {
    
    // Prevent default submit event - only necessary if you are using forms
    // event.preventDefault();
    // console.log("Button: " + event.target.id);
    this.getRESTData(1,100);
    
  }
  
  render() {
    let component = null;
    switch(this.state.activeItem) {
      case 'info':
        component=<Info />
        break;
      case 'numGuess':
        component=<NumberGuess />
        break;
    }


    return (
      <ErrorBoundary>
      <Container>
        <Segment className="container" inverted color='grey'>
          <div id='mainDiv'>
            <Menu>
              <Image src='/images/s-l1600.jpg' avatar />
              <Menu.Item
                name='info'
                active={true}
                active={this.state.activeItem==='info'}
                onClick={this.handleMenuItemClick.bind(this)}
              >
                Info
              </Menu.Item>
              <Menu.Item
                name='numGuess'
                active={true}
                active={this.state.activeItem==='numGuess'}
                onClick={this.handleMenuItemClick.bind(this)}
              >
                Number Guess
              </Menu.Item>
            </Menu>
            {component}
          </div>
        </Segment>
        </Container>
      </ErrorBoundary>
    );
  }
}