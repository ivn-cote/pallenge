/** @jsx React.DOM */
var bemMixin = require('./bem');

var AppComponent = React.createClass({
  mixins: [bemMixin],
  getDefaultProps: function() {
    return {
      menuItems: [
        {
          title: 'Full todo list',
          count: 3
        },
        {
          title: 'Need to be paid',
          count: 4
        },
        {
          title: 'Sent',
          count: 4
        },
        {
          title: 'Popular',
          count: 4
        },
        {
          title: 'Completed',
          count: 3
        }
      ]
    }
  },
  render: function() {
    var menuLines = this.props.menuItems.map(function(line) {
      return (
        <li className="active">
          <a href="#">
            <span className="badge pull-right">{line.count}</span>
            {line.title}
          </a>
        </li>
      );
    });

    return (
      <div className={this.b_()}>
        <div className="page-header">
          <h1>PALLENGE</h1>
        </div>
        <ul className="nav nav-pills nav-stacked">
          {menuLines}
        </ul>
      </div>
    );
  }
});

React.renderComponent(
  <AppComponent />,
  document.getElementById('app')
);
