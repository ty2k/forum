var _ = require('lodash/core');
var ControlBar = require('./app/ControlBar.jsx');
var Topics = require('./app/Topics.jsx');
var ShowTopic = require('./app/ShowTopic.jsx');
var NewPost = require('./app/NewPost.jsx');
var Settings = require('./app/Settings.jsx');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var IndexRoute = require('react-router').IndexRoute;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;
var withRouter = require('react-router').withRouter;
var useBasename = require('history/lib/useBasename');

function withBasename(history, dirname) {
  return useBasename(function() {
    return history;
  })({ basename: '/react' });
}

function createElement(originalProps) {
  return function(Component, props) {
    return <Component {...props} {...originalProps} />
  }
}

var Root = React.createClass({
  render: function() {
    if (this.props.params.id) {
      var threadTitle = _.find(this.props.value.topics, {
        id: parseInt(this.props.params.id, 10)
      }).title;
    }

    return (
      <div className="app">
        <ControlBar
          title={threadTitle || this.props.value.appName}
        />
        {this.props.children}
      </div>
    );
  }
});

module.exports = React.createClass({
  render: function() {
    return (
      <div className="app">
        <Router
          history={withBasename(browserHistory, '/react')}
          createElement={createElement(this.props)}
        >
          <Route path="/" component={Root}>
            <IndexRoute component={Topics} />
            <Route path="settings" component={Settings} />
            <Route path="topic/new" component={NewPost} />
            <Route path="topic/:id" component={ShowTopic} />
          </Route>
        </Router>
      </div>
    );
  }
});
