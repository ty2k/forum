var React = require('react');
var ReactDOM = require('react-dom');
var TopicControls = require('./PostControls.jsx');
var moment = require('moment');
var Link = require('react-router').Link;

var Topic = React.createClass({
  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  getDefaultProps: function() {
    return {
      replycount: 0,
      lastreply: {
        created_at: {},
        user: {}
      }
    }
  },

  handleDelete: function() {
    window.socket.emit('destroy', {
      id: this.props.id,
      user: {
        id: forum.constants.user.id,
        name: forum.constants.user.name
      }
    });
  },

  handleShowEdit: function() {
    this.setState({
      isEditing: true
    });
  },

  handleFinishEdit: function() {
    this.setState({
      isEditing: false
    });
  },

  showControls: function() {
    if (this.state.isEditing) {
      return (
        <div className="inputGroupContainer">
          <div className="inputGroup">
            <button
              className="input"
              onClick={this.handleDelete}
            >
              Delete
            </button>
          </div>
          <button
            className="input"
            onClick={this.handleFinishEdit}
          >
            Done
          </button>
        </div>
      );

    }

    return (
      <TopicControls
        post={this.props}
        handleShowEdit={this.handleShowEdit}
      />
    );
  },

  isNew: function() {
    return this.props.lastreply &&
      this.props.lastreply.isNew;
  },

  markRead: function() {
    window.store.dispatch({
      type: 'MARKREAD',
      value: this.props
    });
  },

  render: function() {
    return (
      <Link
        to={`/topic/${this.props.id}`}
        className={`post ${this.isNew() ? 'isNew':null}`}
        onClick={this.markRead}
      >
        <div className="" style={{fontSize: "20px"}}>{this.props.title}</div>
        <div
          className="data"
        >
          {this.props.replycount} Replies,
          last by <span className="data-callout">
            {this.props.lastreply.user.name}
          </span> {moment(this.props.lastreply.created_at).fromNow()}.
        </div>
      </Link>
    )
  }
});

module.exports = function(topicData) {
  return (
    <Topic
      key={topicData && (topicData.id + topicData.title)}
      {...topicData}
    />
  );
}
