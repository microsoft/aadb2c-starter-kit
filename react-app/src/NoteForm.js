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
        this.props.submitCallback({text:this.state.content});
        this.setState({contents:""});
    }

    render() {


        return (
            <div>
                {!this.props.submitting ?
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
