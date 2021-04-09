import React, { Component } from 'react';
import {Card} from 'react-bootstrap';



class Note extends Component {
  

  
  render(){
  
  
  return (
    <Card >
  <Card.Body>
    <Card.Title>{this.props.note.title} Title</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
    {this.props.note.content}
    </Card.Text>
    <Card.Link href="#">Edit</Card.Link>
    <Card.Link href="#">Delete</Card.Link>
    <Card.Link href="#">Share</Card.Link>
  </Card.Body>
</Card>

  );
}
}

export default Note;
