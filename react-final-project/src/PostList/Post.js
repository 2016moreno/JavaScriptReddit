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
        <button id="triangleup" onClick={ this.handleUpvote }></button>
       <button id="triangledown" onClick={ this.handleDownvote }></button>
         {this.props.title} {this.props.url} <br/> <div id="pointsclass">{this.props.points} points</div>
      </li>
    )
  }
}

export default Post;