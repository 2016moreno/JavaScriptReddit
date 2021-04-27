import React from 'react';

class Post extends React.Component {
  constructor(props) {
    //boilerplate
    super(props);
    //hack to know about this
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
  }

  handleUpvote() {
    this.props.handleUpvote(this.props.id);
  }

  handleDownvote(){
    this.props.handleDownvote(this.props.id);
  }

  render() {
    //return JSX element
    return (
      <li>
        <button onClick={ this.handleUpvote }>Upvote</button>
        <button onClick={ this.handleDownvote }>Downvote</button>
        {this.props.points} {this.props.title} {this.props.url}
      </li>
    )
  }
}

export default Post;