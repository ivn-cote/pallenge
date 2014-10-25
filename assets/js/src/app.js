/** @jsx React.DOM */
var bemMixin = require('./bem'),
  lib = {};

lib.App = React.createClass({
  mixins: [bemMixin],
  getInitialState: function() {
    $.get('/user/1/tasks/').then(this.onReceiveCards);
    return {
      initCards: []
    }
  },
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
  onReceiveCards: function(res) {
    var cards = res.map(function(card) {
      return {
        from: card['src_user']['Name'],
        title: card['challenge']['Name'],
        description: 'TODO'
      }
    });
    this.setState({ initCards: cards });
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

    var initCardsNodes = this.state.initCards.map(function(card) {
      return (
        <lib.ChallengeCard data={card} />
      );
    });

    return (
      <div className={this.b_()}>
        <lib.Header />
        {initCardsNodes}
        <ul className={'nav nav-pills nav-stacked ' + this.b_('-menu')}>
          {menuLines}
        </ul>
      </div>
    );
  }
});

lib.Header = React.createClass({
  mixins: [bemMixin],
  render: function() {
    return (
      <div className={this.b_()}>
        <div className={this.b_('-logo')}/>
      </div>
    );
  }
});


lib.ChallengeCard = React.createClass({
  mixins: [bemMixin],
  getDefaultProps: function() {
    return {
      data: {
        from: 'Odin',
        description: 'Turn the world',
        title: 'Hard night'
      }
    }
  },
  render: function() {
    return (
      <div className={this.b_()}>
        <div className={this.b_('-img')}/>
        <div className={this.b_('-info')}>
          <div className={this.b_('-title')}>{this.props.data.title}</div>
          <div className={this.b_('-user')}>{this.props.data.from}</div>
          <div>{this.props.data.description}</div>
        </div>
      </div>
    );
  }
});

React.renderComponent(
  <lib.App />,
  document.getElementById('app')
);
