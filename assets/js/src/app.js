/** @jsx React.DOM */
var bemMixin = require('./bem'),
  lib = {};

lib.App = React.createClass({
  mixins: [bemMixin],
  initApp: function() {
    $.get('/user/1/tasks/').then(this.onReceiveCards);
    $.get('user/1/tasks/count/').then(this.onReceiveCounts);
  },
  getInitialState: function() {
    this.initApp();

    return {
      initCards: [],
      menuItems: [
        {
          id: 'full_to_do_count',
          title: 'Full todo list',
          count: 0
        },
        {
          id: 'topay',
          title: 'Need to be paid',
          count: 0
        },
        {
          id: 'sent',
          title: 'Sent',
          count: 0
        },
        {
          id: 'Popular',
          title: 'Popular',
          count: 0
        },
        {
          id: 'completed',
          title: 'Completed',
          count: 0
        }
      ]
    }
  },
  onReceiveCounts: function(res) {
    if (!res['result'])
      return; // TODO SILENCE ERROR

    var newMenu = [];

    for (var key in res['result']) {
      var mItem = this.state.menuItems.filter(function(item) {
        return item.id === key;
      });
      if (!mItem) {
        return;
      } else {
        mItem = mItem[0];
      }
      mItem.count = res['result'][key];
      newMenu.push(mItem);
    }

    this.setState({ menuItems: newMenu });
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
    var menuLines = this.state.menuItems.map(function(line) {
      return (
        <lib.MenuLine line={line} />
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

lib.MenuLine = React.createClass({
  mixins: [bemMixin],
  render: function() {
    return (
      <li className={this.b_()}>
        <a href="#">
          <span className="badge pull-right">{this.props.line.count}</span>
          {this.props.line.title}
        </a>
      </li>
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
