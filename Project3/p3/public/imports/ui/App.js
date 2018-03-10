import React, { Component } from 'react';
import { Image, Menu, Header, Segment, Embed, Table, Container, List } from 'semantic-ui-react';
import { Enum } from 'enumify';

import ErrorBoundary from './ErrorBoundary.js';
import Info from './Info.js';
import NumberGuess from './NumberGuess.js';
import CaesarCypher from './CaesarCypher.js';

class MenuItems extends Enum {}
MenuItems.initEnum(['info','numGuess','caesarCypher',]);


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {activeItem: ''};
  }

  //handle menu
  handleMenuItemClick(e, { name }){
    this.setState({activeItem: name});
  }
  
  //display component depending on menu
  menuDisplay(){
    switch(this.state.activeItem) {
      case MenuItems.info.name:
        return(
          <Info />
        )
        break;
      case MenuItems.numGuess.name:
        return(
          <NumberGuess />
        )
      case MenuItems.caesarCypher.name:
        return(
          <CaesarCypher />
        )
    }
  }

  render() {

    return (
      <ErrorBoundary>
        <Container>
          <Segment className="container" inverted color='grey'> 
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
                <Menu.Item
                  name='caesarCypher'
                  active={true}
                  active={this.state.activeItem==='caesarCypher'}
                  onClick={this.handleMenuItemClick.bind(this)}
                >
                  Caesar Cypher
                </Menu.Item>
              </Menu>
              {this.menuDisplay()}
          </Segment>
        </Container>
      </ErrorBoundary>
    );
  }
}