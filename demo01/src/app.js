// var p = require("./es6test/es6test1.js"); //(1,2)  --es6

/* var React = require('react');
 var ReactDOM = require('react-dom');

var HelloMessage = React.createClass({
   render: function() {
     return <h1>Hello {this.props.name}</h1>;
  }
});

ReactDOM.render( <HelloMessage name="John" />,
   document.getElementById('example')
);*/

import React from 'react';
import ReactDOM from 'react-dom';

import "./home/home.css";
import "./home/home.scss";

class HelloMessage extends React.Component {
    render() {
        return <h1> Hello { this.props.name } </h1>;
    }
}

ReactDOM.render( <HelloMessage name="zry123" />,
   document.getElementById('example')
);
