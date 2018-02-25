import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Image, Menu, Header, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import App from '../imports/ui/App.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});