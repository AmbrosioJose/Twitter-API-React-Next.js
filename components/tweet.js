import React, { Component } from 'react';
import {ListGroupItem, Media, Image, Badge} from 'react-bootstrap';


class Tweet extends Component {
  render() {
    const linkedimages = this.props.value.entities.media
    let pic =''
    if(linkedimages)
      pic = <Image src={this.props.value.entities.media[0].media_url}  width={128} height={128}  />
    else{}
    return (
      <ListGroupItem>
        <Media>
          <Media.Left align="top"><Image width={64} height={64} src={this.props.value.user.profile_image_url}  rounded /></Media.Left>
            <Media.Body>
              <Media.Heading>{this.props.value.user.screen_name} <Badge className="badge">Retweets {this.props.value.retweet_count}</Badge></Media.Heading>
              <p>{this.props.value.text}</p>
              
          </Media.Body>
          <Media.Right align="middle">{pic}</Media.Right>
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