import React, { Component } from 'react';
import '../App.css';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        };
    }

    handleSubmit() {
        
    }

    render() {
        return (
            <div className='container'>
                <h2> Welcome to Add Item </h2>
                <form onSubmit={this.handleSubmit}>
                    Upload A Photo:
                    <input id="uploadImage" type="file" name="photo"/>
                    <input type='submit' value='Upload Photos' className='btn btn-primary' />
                </form>
            </div>
        );
    }
}

export default User;