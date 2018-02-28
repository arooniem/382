import React, { Component } from 'react';
import { Image, Menu, Header, Segment, Embed, Table, Button, Input, List } from 'semantic-ui-react';
import {Enum} from 'enumify';
import NumericInput from 'react-numeric-input';

class GameMode extends Enum {}
GameMode.initEnum(['setup','play','win','error']);

export default class NumberGuess extends Component {
	constructor(props){
		super(props);
		this.state = {
			restData: '', 
			gameTracker:'setup', 
			lowRange:1, 
			highRange:100, 
			lowGuesses: [], 
			highGuesses: [], 
			currentGuess:'', 
			totalGuesses: 0, 
			loading: false, 
			error: ''
		};
	}

	//function for testing without calling out
	getRandomInteger(min, max){
		return(Math.floor(Math.random()*(max-min+1)+min))
	}

	getRESTData(min, max) {
	    // Call server-side method to return data
		if (Meteor.isClient) {
	      Meteor.call("getRestData", min, max, function(error, results) {
	        try{
	          if (error) {
	            // Note: We will not be using Meteor error parameter, so it will always be undefined
	            // See http://docs.meteor.com/api/methods.html#Meteor-Error if you want to use Meteor errors
	            this.setState({gameTracker: 'error', error: error})
	            console.log("Error in retrieving data: " + error);
	          } else {
	            //let parsedResults = JSON.parse(results);
	            if (results.error) {
	              this.setState({gameTracker: 'error', error: results.error});
	              console.log("Error status code: " + results.error.statusCode);
	              console.log("Error: " + results.error.error);
	            } else {
	              this.setState({restData: JSON.parse(results.content)});
	            }
	          }
	        } catch (err) {
	          console.log("Error in Meteor call: " + err);
	        }
	      }.bind(this));
	    }
	    console.log(this.state.restData);
	    return(this.state.restData);
  	}

  	handlePlayButton(event){
  		this.setState({loading: true});
  		//get random integer between the range
  		let rando = this.getRandomInteger(this.state.lowRange, this.state.highRange);
  		//let rando = this.getRESTData(this.state.lowRange, this.state.highRange);
  		this.setState({restData:rando});
  		//cheat
  		console.log(rando);
  		this.setState({gameTracker: 'play'})
  	}

  	handleRef(c){
  		//refocus the guess input after guessing
  		this.inputRef = c
  	}

  	handleGuessButton(event){
  		//determine if guess is low or high, put in appropriate side
  		if(this.state.currentGuess < this.state.restData){
	  		let arr = this.state.lowGuesses;
	  		arr.push(this.state.currentGuess);
	  		this.setState((prevState, props) => ({
	  			lowGuesses: arr, 
	  			//track guesses
	  			totalGuesses: prevState.totalGuesses + 1, 
	  		}))
	  		this.inputRef.focus();
	  	} else if(this.state.currentGuess > this.state.restData) {
	  		let arr = this.state.highGuesses;
	  		arr.push(this.state.currentGuess);
	  		this.setState((prevState, props) => ({
	  			highGuesses: arr, 
	  			totalGuesses: prevState.totalGuesses + 1, 
	  		}))
	  		this.inputRef.focus();
	  	} else {
	  		//if not high or low then win
	  		this.setState((prevState, props) => ({
	  			gameTracker: 'win', 
	  			totalGuesses: prevState.totalGuesses + 1
	  		}))
	  	}
  	}

  	handleGuessInput(event){
  		//track input number for guess
  		this.setState({currentGuess: event.target.value});
  	}

  	inputChange(value, string, event) {
  		//track range for random number
  		event.name=='lowRange'?this.setState({lowRange:value}):this.setState({highRange:value});
  	}

  	handleReplay(){
  		//reset all state
  		this.setState({
  			restData: '', 
  			gameTracker:'setup', 
  			lowRange:1, 
  			highRange:100, 
  			lowGuesses: [], 
  			highGuesses: [], 
  			currentGuess:'', 
  			totalGuesses: 0, 
  			loading: false, 
  			error:''
  		})
  	}

  	gameModeSwitch(){
  		//determine which gamemode to display
		switch(this.state.gameTracker) {
			case GameMode.setup.name :
				return( 
					<Segment inverted color='grey'>
						<span>Select the number range, click Play, and start guessing!</span><br />
						<span>Between <NumericInput 
							strict
							name='lowRange' 
							min={1} 
							max={100} 
							onChange={this.inputChange.bind(this)}
							value={this.state.lowRange} 
							size={4}
							mobile={false}
							/> 
						and 
						<NumericInput 
							strict
							name='highRange' 
							min={1} 
							max={100} 
							onChange={this.inputChange.bind(this)}
							value={this.state.highRange}
							size = {4}
							mobile={false}
						/></span><br />
						<Button primary loading={this.state.loading} onClick={this.handlePlayButton.bind(this)}>Play</Button>
					</Segment>
				)
			case GameMode.play.name :
				return( 
					<Segment inverted color='grey'>
						<Segment inverted color='grey' raised>
							<span>Guess a number between &nbsp; {this.state.lowRange} &nbsp; and &nbsp; {this.state.highRange}</span><br />
							<span>
								<Input onChange={this.handleGuessInput.bind(this)} ref={this.handleRef.bind(this)} action={{content:'Guess', onClick:this.handleGuessButton.bind(this), primary:true }} />
								&nbsp;Total Guesses: {this.state.totalGuesses}
							</span>
						</Segment>
						<Segment.Group raised horizontal>
							<Segment inverted color='grey'>
								<p>{this.state.totalGuesses>0?'Low':' '}</p>
								<List inverted color='grey' items={this.state.lowGuesses} />
							</Segment>
							<Segment inverted color='grey'>
								<p>{this.state.totalGuesses>0?'High Guesses':' '}</p>
								<List inverted color='grey' items={this.state.highGuesses} />
							</Segment>
						</Segment.Group>
					</Segment>
				)
			case GameMode.win.name :
				return( 
					<Segment inverted color='grey'>
						<Segment inverted color='grey' raised>
						<span>You correctly guessed {this.state.restData} in {this.state.totalGuesses} guesses!!</span><br />
						<span><Button primary onClick={this.handleReplay.bind(this)}>Replay?</Button></span>
						</Segment>
						<Segment.Group raised horizontal>
							<Segment inverted color='grey'>
								<p>Low Guesses</p>
								<List inverted color='grey' items={this.state.lowGuesses} />
							</Segment>
							<Segment inverted color='grey'>
								<p>High Guesses</p>	
								<List inverted color='grey' items={this.state.highGuesses} />
							</Segment>
						</Segment.Group>
					</Segment>
				)
			case GameMode.error.name :
				return(
						<Segment inverted color='grey' raised>
							<p>Oops, you've found an error</p>
							<p>Error: {this.state.error}</p>
							<span><Button primary onClick={this.handleReplay.bind(this)}>Replay?</Button></span>
						</Segment>
				)
		}
  	}

	render() {
		return(
			<Segment.Group>
			<Segment inverted color='grey'>
				<Header inverted color='grey'>Let's play Number Guess!</Header>
				</Segment>
				{this.gameModeSwitch()}
			</Segment.Group>
		)
	}
}