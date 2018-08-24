import React, { Component } from 'react';
import {Jumbotron,ListGroup} from 'react-bootstrap';
import User from './user.js'
class Tweets extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Jumbotron className="jumbotron">
        <h2>Users </h2>
        <ListGroup>

          {this.props.users.map((listValue,index)=>{
            return <User value={listValue} key ={index}/>;
          })}
        </ListGroup>
        <style>{`

        `}</style>
        

      </Jumbotron>
    );
  }
}

export default Tweets;