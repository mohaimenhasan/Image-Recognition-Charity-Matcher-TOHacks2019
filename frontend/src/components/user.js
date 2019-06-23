import React, { Component } from 'react';
import '../App.css';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photo: {},
            file: '',
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

    loadFile(event) {

        console.log('photo received-1: ', event.target.files[0].name);
        this.setState({
            photo: event.target.files[0]
        });
        let apiUrl = "http://localhost:8888/location/return_image_tag";
        fetch(apiUrl,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": '*'
                },
                body: JSON.stringify({
                    image_name: event.target.files[0].name
                }
                )
            }).then(my_resp => my_resp.json())
            .then(response => {
                console.log(response);
                if (response["code"] === 200) {
                    alert("User created successfully");
                    window.location.href = ('http://localhost:3000/user')
                }
                else {
                    console.log("Some error occurred: ", response.data.code);
                }
            }).catch(function (error) {
                console.log(error);
            });
    };


    render() {
        return (
            <div className='container'>
                <h2> Welcome to Add Item </h2>
                <form onSubmit={this.handleSubmit}>
                    Upload A Photo:
                    <input type="file" accept="image/*" name="image" id="file" onChange={this.loadFile} style={{ "display": "none" }}></input>
                    <br /><label className='btn btn-primary' for="file" style={{ "cursor": "pointer" }}>Choose File</label>
                    {/* <p><img id="output" width="200" alt='upload' /></p> */}
                </form>
            </div>
        );
    }
}

export default User;