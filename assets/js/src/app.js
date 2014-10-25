/** @jsx React.DOM */
var bemMixin = require('./bem');

var AppComponent = React.createClass({
  mixins: [bemMixin],
  render: function() {
    return (
      <div className={this.b_('-aa')}>
        Hello, world! I am an APP
      </div>
    );
  }
});

React.renderComponent(
  <AppComponent />,
  document.getElementById('app')
);
