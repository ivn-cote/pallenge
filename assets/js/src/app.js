/** @jsx React.DOM */
var bemMixin = require('./bem'),
  lib = {};

var Router = ReactRouter,
  Route = ReactRouter.Route,
  DefaultRoute = ReactRouter.DefaultRoute,
  Link = ReactRouter.Link,
  Routes = ReactRouter.Routes;


lib.cardsProc = { /* mixin */
  onReceiveCards: function(res) {
    var cards = res.map(function(card) {
      return {
        from: card['src_user']['Name'],
        title: card['challenge']['Name'],
        description: 'TODO'
      }
    });
    this.setState({ initCards: cards });
  }
};

lib.App = React.createClass({
  mixins: [bemMixin],
  render: function() {
    return (
      <div className={this.b_()}>
        <lib.Header />
        <this.props.activeRouteHandler/>
      </div>
    );
  }
});

lib.Main = React.createClass({
  mixins: [bemMixin, lib.cardsProc],
  initMain: function() {
    $.get('/user/1/tasks/').then(this.onReceiveCards);
    $.get('user/1/tasks/count/').then(this.onReceiveCounts);
  },
  getInitialState: function() {
    this.initMain();

    return {
      initCards: [],
      menuItems: [
        {
          id: 'full_to_do_count',
          route: 'todo',
          title: 'Full todo list',
          count: 0
        },
        {
          id: 'topay',
          route: 'pay',
          title: 'Need to be paid',
          count: 0
        },
        {
          id: 'sent',
          route: 'sent',
          title: 'Sent',
          count: 0
        },
        {
          id: 'Popular',
          route: 'popular',
          title: 'Popular',
          count: 0
        },
        {
          id: 'completed',
          route: 'completed',
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
        {initCardsNodes}
        <ul className={'nav nav-pills nav-stacked ' + this.b_('-menu')}>
          {menuLines}
        </ul>
      </div>
    );
  }
});

lib.Pay = React.createClass({
  mixins: [bemMixin, lib.cardsProc],
  initPay: function() {
    $.get('/user/1/tasks/topay').then(this.onReceiveCards)
  },
  getInitialState: function() {
    this.initPay();

    return {
      initCards: []
    }
  },
  render: function() {
    var initCardsNodes = this.state.initCards.map(function(card) {
      return (
        <lib.ChallengeCard data={card} />
      );
    });

    return (
      <div className={this.b_()}>
        {initCardsNodes}
      </div>
    );
  }
});

lib.New = React.createClass({
  mixins: [bemMixin, lib.cardsProc],
  render: function() {
    return (
      <div className={this.b_()}>
        NEW ONE
      </div>
    );
  }
});

lib.MenuLine = React.createClass({
  mixins: [bemMixin],
  render: function() {
    return (
      <li className={this.b_()}>
        <Link to={this.props.line.route}>
          <span className="badge pull-right">{this.props.line.count}</span>
          {this.props.line.title}
        </Link>
      </li>
    );
  }
});

lib.Header = React.createClass({
  mixins: [bemMixin],
  render: function() {
    return (
      <div className={this.b_()}>
        <Link to="app">
          <div className={this.b_('-logo')} />
        </Link>
        <Link to="new">
          <div className={this.b_('-newButton')}>
            <span className="glyphicon glyphicon-send" />
          </div>
        </Link>
        <div className={this.b_('-user')}>
          <div className={this.b_('-userPic')}></div>
          <div className={this.b_('-userName')}>Cool Rita</div>
        </div>
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
          <div className={this.b_('-user')}>from {this.props.data.from}</div>
          <div>{this.props.data.description}</div>
        </div>
      </div>
    );
  }
});


var routes = (
  <Routes location="history">
    <Route name="app" path="/" handler={lib.App}>
      <DefaultRoute handler={lib.Main}/>
      <Route name="new" path="new" handler={lib.New} />
      <Route name="pay" path="pay" handler={lib.Pay} />
      <Route name="todo" path="todo" handler={lib.Pay} />
      <Route name="sent" path="sent" handler={lib.Pay} />
      <Route name="popular" path="popular" handler={lib.Pay} />
      <Route name="completed" path="completed" handler={lib.Pay} />
    </Route>
  </Routes>
);

React.renderComponent(
  routes,
  document.getElementById('app')
);
