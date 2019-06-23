import React, { Component } from 'react';
import '../App.css';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: {}
        };

        this.loadFile = this.loadFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        console.log('photo received: ', event.target.files[0].name);
        this.setState({
            photo: event.target.files[0]
        });
    }

    loadFile(event){
        // var image = document.getElementById('output');
        // image.src = URL.createObjectURL(event.target.files[0]);
        //handleSubmit(event);
        console.log('photo received: ', event.target.files[0].name);
        this.setState({
            photo: event.target.files[0]
        });    
        //event.target.files[0] accesses first file that was uploaded
    }

    render() {
        return (
            <div className='container'>
                <h2> Welcome to Add Item </h2>
                <form onSubmit={this.handleSubmit}>
                    Upload A Photo:
                    <input type="file" accept="image/*" name="image" id="file" onChange={this.loadFile} style={{ "display": "none" }}></input>
                    <br/><label className='btn btn-primary' for="file" style={{ "cursor": "pointer" }}>Choose File</label>
                    {/* <p><img id="output" width="200" alt='upload' /></p> */}
                </form>
            </div>
        );
    }
}

export default User;