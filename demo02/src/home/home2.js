 var React = require('react');
 var ReactDOM = require('react-dom');

var HelloMessage = React.createClass({
   render: function() {
     return <h1>Hello {this.props.name}</h1>;
  }
});

ReactDOM.render( <HelloMessage name="John" />,
   document.getElementById('example2')
);