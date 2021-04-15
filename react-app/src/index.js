import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Msal from "msal";
import { Button } from 'react-bootstrap';





var apiTokenRequest = {
  scopes: ["https://ssdadb2cdevbackend.azurewebsites.net/api/echo"] // optional Array<string>
};
let token;
let apiresponse;
let givenname;
let email;
let displayname;
let id;



let fetchFromAPI = function () {
  var headers = new Headers();
  var bearer = "Bearer " + token;
  headers.append("Authorization", bearer);
  var options = {
    method: "GET",
    headers: headers
  };
  var graphEndpoint = "https://ssdadb2cdevbackend.azurewebsites.net/api/echo?name=hihihi";//"https://graph.microsoft.com/v1.0/me";

  fetch(graphEndpoint, options)
    .then(response => response.json())
    .then(data => {
      console.log("hey");

      apiresponse = data.text;

      render();
    });

}

let render = function () {
  ReactDOM.render(
    <React.StrictMode>
          <App></App>
    </React.StrictMode>,
    document.getElementById('root')
  );
};
render();
