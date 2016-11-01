import React from 'react';
import ReactDOM from 'react-dom';

import "./home.css";
import "./home.scss";

class HelloMessage extends React.Component {
    render() {
        return <h1> Hello { this.props.name } </h1>;
    }
}

ReactDOM.render( <HelloMessage name="zry123" />,
   document.getElementById('example')
);