import React, { Component } from 'react';




class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            title: '',
            content: ''
        };
    }
    formChangeHandler=(event)=>{
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }
   

   

    submitForm = (event) => {
        event.preventDefault();
        this.setState({ submitting: true });
        var headers = new Headers();
        var bearer = "Bearer " + this.props.token;
        headers.append("Authorization", bearer);
        
        let data = {
            title: this.state.title,
            content: this.state.content
        };
        
        var endpoint="https://ssdadb2cjsbackend.azurewebsites.net/api/NotesWrite";
       var options = {
        method: "POST",
        headers: headers,
        body:JSON.stringify(data)
        };
        fetch(endpoint,options)
        .then(response=>response.json())
        .then(data=>{
          console.log(data.text);
          this.setState({submitting:false});
        })

    }

    render() {


        return (
            <div>
                {!this.state.submitting ?
                    <form>
                        <label for="title">Title:</label>
                        <input onChange={this.formChangeHandler} name="title"></input>
                        <label for="content">Content</label>
                        <textarea onChange={this.formChangeHandler} name="content" rows="3" />
                        <button onClick={this.submitForm}>Submit</button>
                    </form>
                    :
                    <span>adding note please wait...</span>
                }
            </div>
        );
    }
}

export default NoteForm;
