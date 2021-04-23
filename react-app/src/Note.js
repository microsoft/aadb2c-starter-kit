import React, { Component } from 'react';

class Note extends Component {
  
  
  render(){
  
  
  return (
    <div>
    <span>{this.props.note.id}</span>
    <p>Text:{this.props.note.text}</p>
    </div>    
  );
}
}

export default Note;
