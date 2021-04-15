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
        clientId: '0da90f62-a335-4338-a70a-3d73ea275926',
        authority: 'https://aadb2cstarterkit.b2clogin.com/tfp/aadb2cstarterkit.onmicrosoft.com/B2C_1_signup_signin/',
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
        id: id.userName,
        displayname: id.name
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
        
          
        
        <br/>
        <br/>
        
              
              
            
        {this.state.loggedin?   
        <div>Hello
        </div>
        :
        <span></span>
  }
      </div>
    );
  }
}

export default App;
