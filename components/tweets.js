import React, { Component } from 'react';
import {Jumbotron,ListGroup} from 'react-bootstrap';
import Tweet from './tweet.js'
class Tweets extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Jumbotron className="jumbotron">
        <h2>Tweets</h2>
        <ListGroup>

          {this.props.tweets.map((listValue,index)=>{
            return <Tweet value={listValue} key ={index}/>;
          })}
        </ListGroup>
        <style>{`

        `}</style>
        

      </Jumbotron>
    );
  }
}

export default Tweets;