import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Typicode extends Component {
  render() {
    if (Object.keys(this.props.data).length > 0) {
        // Why an array? Each element is an object, so make an array of objects
        // http://stackoverflow.com/questions/22876978/loop-inside-react-jsx
        let listItems = [];
        // You could use the standard for loop or ES6 arrow function with map
        /*
        for (let i = 0; i < this.props.data.length; i++) {
            let s = this.props.data[i].name;
            let id = this.props.data[i].id;
            // Try without key and see what error you get
            listItems.push(<li key={id}>{s}</li>);
        }
        */
        // ES6 arrow function uses less code
        this.props.data.map(row => listItems.push(<li key={row.id}>{row.name?row.name:row.title}</li>));
        return (
            <div>
                <ul>
                    { listItems }
                </ul>
            </div>
        );
    } else {
        return null;        
    }
  }
}

Typicode.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  data: PropTypes.array.isRequired,
};