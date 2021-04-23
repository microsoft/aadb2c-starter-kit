import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Button, Menu } from 'semantic-ui-react'

import Note from './Note';
import NoteForm from './NoteForm';
import * as Msal from "msal";
import { config } from './Config';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import NotesApi from './NotesAPI';
import { gql } from '@apollo/client';

const NotesQuery=gql`
  query{
    notes:getNotesByUser{id text}
  }
  `;
const NewNoteMutation=gql`
  mutation($te:String){
    newNote(text:$te){id text}
  }
`;

class App extends Component {
  
  constructor(props) {
    super(props);
    let msalConfig = {
      auth: {
        clientId: config.clientId,
        authority: config.authority,
        id:"",
        validateAuthority: false
      }
    };
    
    let msalI = new Msal.UserAgentApplication(msalConfig);
    this.state = {
      msalInstance:msalI,
      loggedin:false,
      id:null,
      displayname:"",
      notes: [],
      api:null
    };
  }

  componentDidMount(){
    if (this.state.msalInstance.getAccount()) {

      let id = this.state.msalInstance.getAccount();
      this.setState({
        loggedin: true,
        id: id.accountIdentifier,
        displayname: id.name
      },()=>{
        this.fetchNotes();
      });
    }
  }

 
  signout = () => {
    this.state.msalInstance.logout().then(response => {
      this.setState({
        loggedin:false,
        displayname:"",
        token:""});
    });
  }
  signin = () => {
    let loginRequest = {
      scopes: ["openid"] // optional Array<string>
    };
    this.state.msalInstance.loginRedirect(loginRequest);
  }
  
  getAPIClient=()=>{
    return new ApolloClient({
      uri: config.apiurl + this.state.id,
      cache: new InMemoryCache()
    });
  }

  fetchNotes = (event) => {
    if (this.state.loggedin) {
      let NotesApi = this.getAPIClient();
      
      NotesApi.query({
        query:NotesQuery 
      })
      .then(response=>{
        this.setState({notes:response.data.notes});
      });

    }
  }

  newNote = ({text:noteText})=>{
    this.setState({submitting:true});
    let NotesApi = this.getAPIClient();
    NotesApi.mutate({
      mutation:NewNoteMutation,
      variables:{
        te:noteText
      }
    })
    .then((response)=>{
      this.setState({submitting:false});
      this.fetchNotes();
    });
  }

  render() {
    let sorted=[];
    if(this.state.notes.length>0){
      sorted = this.state.notes.map((note) => (
        <Note note={note} key={note.id}/>
      ));
      }

    return (
      <div >
         <Menu>
          <Menu.Item>
            Notes App!
          </Menu.Item>
          {this.state.loggedin? 
          <Menu.Item>
            Welcome, <a href="https://aadb2cstarterkit.b2clogin.com/aadb2cstarterkit.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_edit">
            {this.state.displayname}!
            </a>
            <Button onClick={this.signout}>SignOut</Button>
          </Menu.Item>
          :
            <Button onClick={this.signin}>Sign In</Button>
          }
          <Menu.Item>     
      </Menu.Item>
    </Menu>  
    {this.state.loggedin?   
    <div>
      <NoteForm submitCallback={this.newNote} submitting={this.state.submitting}></NoteForm>
      {sorted}
    </div>
    :
    <span>Please Sign In</span>
    }
  </div>
  );
}
}

export default App;
