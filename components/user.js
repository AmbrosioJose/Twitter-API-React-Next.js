import React, { Component } from 'react';
import {ListGroupItem, Media, Image, Badge} from 'react-bootstrap';


class Tweet extends Component {
  render() {


    return (
      <ListGroupItem>
        <Media>
          <Media.Left align="top"><Image width={64} height={64} src={this.props.value.profile_image_url}  rounded /></Media.Left>
            <Media.Body>
              <Media.Heading>{this.props.value.name} <Badge className="badge">followers {this.props.value.followers_count}</Badge></Media.Heading>
              <p>{this.props.value.description}</p>    
          </Media.Body>
        </Media>
        <style>{`
          .badge{
            background-color: deepskyblue;
          }
        `}</style>
      </ListGroupItem>
    );
  }
}


export default Tweet;