import React from 'react';
import Post from './Post';

class PostList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        titleTextboxValue: "",
        urlTextboxValue: "",
        isLoaded: false,
        error: null,
        data: [],
      };
  
      this.handleAddButtonPress = this.handleAddButtonPress.bind(this);
      this.handleTitleTextboxChange = this.handleTitleTextboxChange.bind(this);
      this.handleUrlTextboxChange = this.handleUrlTextboxChange.bind(this);
      this.handleUpvote = this.handleUpvote.bind(this);
      this.handleDownvote = this.handleDownvote.bind(this);
    }

    componentDidMount(){
      //Part 1: Remove this hardcoded stuff and retrieve the data
      //from your Post API
      //- if loading succeeds make sure you set isLoaded to true in the state
      //- if loading fails set isLoaded to true AND error to true in the state

      let newData = [
        { id: 1, title: "Apple releases new M1 based Macbooks and Mac Mini", url: "https://www.apple.com/mac/m1/", points: 98 },
        { id: 2, title: "C++ for Dummies", url: "https://www.dummies.com/programming/cpp/", points: 0 },
        { id: 3, title: "Automate the Boring Stuff with Python", url: "https://automatetheboringstuff.com/", points: 90 },
        { id: 4, title: "New version of TailwindCSS released", url: "https://tailwindcss.com/", points: 90 }
      ];

      this.setState(function(state){
        return { data: newData, isLoaded: true };
      })
    }
  
    handleAddButtonPress() {
      //Part 2:
      //- Add the post to the API via AJAX call
      // -- if the call succeeds, add the copy of the post you receive from the API
      // to your local copy of the data
      // -- if an error occurs set error to true in the state
    }
  
    handleTitleTextboxChange(event){
      this.setState(
        function(state){
          return { titleTextboxValue: event.target.value };
        }
      )
    }

    handleUrlTextboxChange(event){
      this.setState(
        function(state){
          return { urlTextboxValue: event.target.value };
        }
      )
    }

    handleUpvote(id){
        //Part 3: 
        //- Modify the local copy of the data
        //- Upvote the post on the server via API call
        //- if an error occurs set error to true in the state
    }

    handleDownvote(id){
        //Part 4:
        //- Modify the local copy of the data
        //- Downvote the post on the server via API call
        //- if an error occurs set error to true in the state
    }
  
    render() {
      let error = this.state.error;
      let isLoaded = this.state.isLoaded;

      if(error){
        return <div>Sorry, an error occurred.</div>
      }else if(!isLoaded){
        return <div>Loading...</div>
      }else{
        let handleUpvote = this.handleUpvote;
        let handleDownvote = this.handleDownvote;
        let todoList = this.state.data.map(function (post) {
          return <Post key={post.id} id={post.id} title={post.title} url={post.url} points={post.points} handleUpvote={ handleUpvote } handleDownvote={ handleDownvote }></Post>
        });
    
        return (
          <div>
            <h3>Tech News</h3>
            { todoList}
            <div>
              New Submission<br/>
              <input type="text" value={ this.state.titleTextboxValue } onChange={ this.handleTitleTextboxChange }></input><br/>
              <input type="text" value={ this.state.urlTextboxValue } onChange={ this.handleUrlTextboxChange }></input><br/>

              <button onClick={this.handleAddButtonPress}>Submit</button>
            </div>
          </div>
        );
      }
    }
  }

export default PostList;