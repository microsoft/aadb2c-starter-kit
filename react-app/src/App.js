import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Button, Menu } from 'semantic-ui-react'

import Note from './Note';
import NoteForm from './NoteForm';
import {Navbar, Nav, NavbarBrand} from 'react-bootstrap';
import * as Msal from "msal";
class App extends Component {

  constructor(props) {
    super(props);
    let msalConfig = {
      auth: {
        clientId: '7fa75408-cc61-44a5-8682-9f0c4362ca51',
        authority: 'https://ssdb2cdev.b2clogin.com/tfp/ssdb2cdev.onmicrosoft.com/B2C_1_signup_signin2/',
        id:"",
        validateAuthority: false
      }
    };
    let msalI = new Msal.UserAgentApplication(msalConfig);
    this.state = {
      msalInstance:msalI,
      loggedin:false,
      token:"",
      displayname:"",
      notes: [],
      token: ''
    };
  }

  componentDidMount(){
    if (this.state.msalInstance.getAccount()) {

      let id = this.state.msalInstance.getAccount();
      this.setState({
        loggedin: true,
        email: id.userName,
        username: id.name
      });
      var tokenRequest = {
        scopes: ["https://ssdb2cdev.onmicrosoft.com/functions/functions.read"] // optional Array<string>
      };
      this.state.msalInstance.acquireTokenSilent(tokenRequest)
      .then(response => {
        this.setState({
        loggedin:true,
          token:response.accessToken,
          displayname:response.idToken.claims.name,
          id:response.idToken.claims.sub
        });
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
  

  fetchNotes = (event) => {
    if(event){event.preventDefault();}
    
    if (this.state.loggedin) {
      var headers = new Headers();
        var bearer = "Bearer " + this.state.token;
        headers.append("Authorization", bearer);
        
      var endpoint = "https://ssdadb2cjsbackend.azurewebsites.net/api/notes/"+this.state.id;
      var options = {
        method: "GET",
        headers:headers
      };
      fetch(endpoint, options)
        .then(response => response.json())
        .then(data => {
          this.setState({ notes: data.text });

        })
    }
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
            
            Welcome, <a href="https://ssdb2cdev.b2clogin.com/ssdb2cdev.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_edit">
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
        
          
        
        <br/>
        <br/>
        
              
              
            
        {this.state.loggedin?   
        <div>
          {this.state.notes.length > 0 ?
                sorted
                :
                <span>You have no notes</span>
          }
        <NoteForm token={this.state.token}></NoteForm>
        </div>
        :
        <span></span>
  }
      </div>
    );
  }
}

export default App;
